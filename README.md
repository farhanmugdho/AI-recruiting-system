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

Open the HTML file in any browser. The system includes a local mock AI that functions without claude.ai, or open in [claude.ai](https://claude.ai) for the full AI-powered experience with live screening and interviews.

## License

Prototype for AI Recruiter System proposal.