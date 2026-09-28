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
- **Local Mock AI**: Works without claude.ai - uses keyword-based scoring and evaluation
- Claude AI integration (optional) for enhanced screening and interview experience

## Usage

Run a local web server to open the HTML file:

```bash
# Python
python -m http.server 8000

# Or Node.js
npx serve -l 8000
```

Then open: `http://localhost:8000/AI%20Recruiter%20System.html`

Or simply double-click the HTML file in any browser (local mock AI works offline, or open in [claude.ai](https://claude.ai) for full AI experience).

## License

Prototype for AI Recruiter System proposal.