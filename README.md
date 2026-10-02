# AI Recruiter System

A prototype of an AI-powered recruiter system that:
- Posts job roles and screens candidates
- Parses resumes (PDF, DOCX, images)
- Ranks candidates on 8 dimensions (programming, DSA, backend, database, projects, GitHub, LinkedIn, communication)
- Runs timed, adaptive AI interviews
- Generates final interview reports

## Features

- **Role Selection**: SDE, UI/UX Designer, Cybersecurity Engineer
- **Resume Parsing**: PDF.js and Mammoth for text extraction
- **8-Dimensional Scoring**: programming, dsa, backend, database, projects, github, linkedin, communication
- **Automatic Qualification**: 7/10+ score with skills listed auto-starts interview
- **Adaptive Interview**: 5 questions that adjust difficulty based on answers
- **Light/Dark Themes**: Full CSS variables support for prefers-color-scheme

## Tech Stack

- HTML5, CSS3, vanilla JavaScript
- pdf.js for PDF parsing
- mammoth for DOCX parsing
- **Express + OpenAI backend** - screening and interview run through your own server and OpenAI key
- **No claude.ai dependency** - works entirely with your OpenAI account

## Prerequisites

- [OpenAI API key](https://platform.openai.com/account/api-keys) (get it from your OpenAI dashboard)
- Node.js installed (v14+ recommended)

## Step-by-Step Setup

### 1. Install dependencies

```bash
cd AI-recruiting-system
npm install
```

### 2. Set up your OpenAI key

```bash
cp .env.example .env
# Edit .env and replace the placeholder with your actual key:
# Notion: OPENAI_API_KEY=sk-your-actual-openai-key-here
```

### 3. Start the server

```bash
node server.js
```

You should see: `AI Recruiter Server running at http://0.0.0.0:5000`

### 4. Open in Chrome

Open your browser and go to:

```
http://localhost:5000
```

Or on your local network, find your IP with `ipconfig` and share:
```
http://192.168.1.x:5000
```

## How It Works

1. **Screen candidates**: Fill in the role, candidate name, GitHub/LinkedIn, and upload a resume (PDF, DOCX, or photo). The backend calls OpenAI to score them on 8 dimensions. Candidates scoring 7/10+ with skills listed auto-qualify for interview.

2. **Start interview**: Click "Start interview" on any qualified candidate. The backend conducts a timed 5-question adaptive interview via OpenAI.

3. **View report**: After the interview, a final technical + communication score report is generated.

## Running on LAN

To share with friends on the same network:

1. Find your IP: `ipconfig` (look for IPv4 Address)
2. Share: `http://YOUR_IP:5000`
3. No code changes needed - `server.js` already binds to `0.0.0.0`

## Important Notes

- Every screening and interview turn makes a real OpenAI API call using your `OPENAI_API_KEY` - this will use your API credits
- The `.env` file is gitignored - your API key never reaches the browser
- Resume text/PDF extraction happens entirely in the browser - your server only receives the extracted text + scores from OpenAI

## License

Prototype for AI Recruiter System proposal.