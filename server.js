const express = require('express');
const OpenAI = require('openai');
require('dotenv').config();

const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const DIMS = ['programming', 'dsa', 'backend', 'database', 'projects', 'github', 'linkedin', 'communication'];

function callOpenAI(systemPrompt, userPrompt, options = {}) {
  return openai.chat.completions.create({
    model: 'gpt-4o-mini',
    response_format: { type: 'json_object' },
    temperature: 0,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ],
    ...options
  });
}

function parseScore(res) {
  const scores = {};
  DIMS.forEach(d => { scores[d] = Number(res[d]) || 0; });
  const sum = Object.values(scores).reduce((a, b) => a + b, 0);
  const overall = Math.round((sum / DIMS.length) * 10) / 10;
  return { scores, overall };
}

// 1. Screen candidate endpoint
app.post('/api/screen-candidate', async (req, res) => {
  try {
    const { role, name, github, linkedin, resumeText, hasImage } = req.body;

    const roleInfo = {
      sde: { title: 'Junior Software Engineer', reqs: 'Java or Python, data structures & algorithms, SQL, REST APIs, OOP' },
      uiux: { title: 'UI/UX Designer', reqs: 'Figma or Sketch, user research, wireframing & prototyping, interaction design, usability testing' },
      cyber: { title: 'Cybersecurity Engineer', reqs: 'network security, threat & vulnerability analysis, SIEM tools, incident response, Linux/scripting' }
    }[role];

    let resumePart;
    if (hasImage) {
      resumePart = 'The attached image is the candidate\'s resume — read it directly.';
    } else {
      resumePart = 'Candidate resume: ' + (resumeText || '');
    }

    const prompt = 'You are an ATS screening a candidate for a ' + roleInfo.title + ' role. Required skills/qualities: ' + roleInfo.reqs + '.\n' +
      'Candidate name: ' + name + '\nGitHub: ' + github + '\nLinkedIn: ' + linkedin + '\n' + resumePart +
      '\nCheck: (1) whether the name and the GitHub/LinkedIn URLs plausibly belong to the same person (e.g. matching name in the URL slug); (2) whether the resume clearly lists specific skills, not just a job title; (3) whether the resume describes projects with enough concrete detail (tech stack, what was built, outcome) to be checked against GitHub, versus vague unverifiable claims.\n' +
      'Score each 0-10 based on everything given: programming, dsa, backend, database, projects, github, linkedin, communication.\n' +
      'Return ONLY JSON: {"programming":n,"dsa":n,"backend":n,"database":n,"projects":n,"github":n,"linkedin":n,"communication":n,"identityConsistent":true|false,"identityNote":"one sentence","skillsListed":true|false,"projectsVerifiable":true|false,"projectsNote":"one sentence","reason":"one sentence overall"}';

    const completion = await callOpenAI(
      'You are an AI recruiter screening candidates. Be thorough but concise. Return valid JSON only.',
      prompt
    );

    const resJson = completion.choices[0].message.content;
    if (!resJson) throw new Error('No response from OpenAI');

    const result = JSON.parse(resJson);
    const { scores, overall } = parseScore(result);

    const identityConsistent = result.identityConsistent !== false;
    const skillsListed = result.skillsListed !== false;
    const qualifies = overall >= 7 && skillsListed;

    const candidate = {
      name, github, linkedin, title: roleInfo.title, reqs: roleInfo.reqs,
      overall, identityConsistent, identityNote: result.identityNote || '',
      skillsListed, projectsVerifiable: result.projectsVerifiable !== false,
      projectsNote: result.projectsNote || '', reason: result.reason || '',
      qualifies
    };

    res.json(candidate);
  } catch (err) {
    console.error('/api/screen-candidate error:', err.message);
    res.status(500).json({ error: err.text || 'Could not screen that resume' });
  }
});

// 2. Interview turn endpoint
app.post('/api/interview-turn', async (req, res) => {
  try {
    const { role, name, github, linkedin, resume, transcript, question } = req.body;

    const prompt = 'You are interviewing a candidate for ' + role + '. Required skills: ' + resume +
      '. Interview so far:\n' + transcript +
      '\nQuestion: ' + question +
      '\nReturn ONLY JSON: {"evaluation": "one short sentence on the last answer", "nextQuestion": "the next interview question, going deeper if the answer was strong or simpler if it was weak"}';

    const completion = await callOpenAI(
      'You are an AI interviewer conducting a technical interview. Be concise. Return valid JSON only.',
      prompt
    );

    const resJson = completion.choices[0].message.content;
    if (!resJson) throw new Error('No response from OpenAI');

    const result = JSON.parse(resJson);
    res.json(result);
  } catch (err) {
    console.error('/api/interview-turn error:', err.message);
    res.status(500).json({ error: err.text || 'Could not evaluate interview turn' });
  }
});

// 3. Interview report endpoint
app.post('/api/interview-report', async (req, res) => {
  try {
    const { name, title, overall, transcript } = req.body;

    const prompt = 'Summarize this technical interview for a recruiter. Role: ' + title +
      '. Candidate: ' + name +
      '. Screening score: ' + overall + '/10. Transcript:\n' + transcript +
      '\nReturn ONLY JSON: {"technicalScore": number 0-100, "communicationScore": number 0-100, "summary": "1-2 sentences", "strengths": ["", ""], "weaknesses": ["", ""]}';

    const completion = await callOpenAI(
      'You are an AI recruiter generating a final interview report. Be concise. Return valid JSON only.',
      prompt
    );

    const resJson = completion.choices[0].message.content;
    if (!resJson) throw new Error('No response from OpenAI');

    const result = JSON.parse(resJson);
    res.json(result);
  } catch (err) {
    console.error('/api/interview-report error:', err.message);
    res.status(500).json({ error: err.text || 'Could not generate the report' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

app.use(express.static('.'));

app.listen(port, '0.0.0.0', () => {
  console.log('AI Recruiter Server running at http://0.0.0.0:' + port);
});