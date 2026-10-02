# AI Recruiter System

A prototype of an AI-powered recruiter system that:
- Posts job roles and screens candidates
- Parses resumes (PDF, DOCX, images)
- Ranks candidates on 8 dimensions (programming, DSA, backend, database, projects, GitHub, LinkedIn, communication)
- Runs timed, adaptive AI interviews
- Generates final interview reports

## 📋 Prerequisites (First-Time Setup)

Before running the project, your friend needs to install:

1. **Node.js** (download from [nodejs.org](https://nodejs.org) - includes npm)
2. **Git** (or use [GitHub Desktop](https://desktop.github.com))

## 🚀 Step-by-Step: From Zero to Running

### Step 1: Get the Project

Open Command Prompt (cmd) or PowerShell and run:

```cmd
git clone https://github.com/farhanmugdho/AI-recruiting-system.git
cd AI-recruiting-system
```

This downloads everything: the HTML file, server code, and all dependencies.

### Step 2: Install Packages

```cmd
npm install
```

This installs `express`, `openai`, and `dotenv` (about 70 packages total). Wait for it to finish - you'll see output lines adding packages.

### Step 3: Set Up Your OpenAI Key

The project needs an OpenAI API key to work (screening and interview answers go through OpenAI's `gpt-4o-mini` model).

```cmd
copy .env.example .env
```

Then edit the key:

```cmd
notepad .env
```

Replace the line:
```
OPENAI_API_KEY=sk-your-openai-api-key-here
```

with their actual key from [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys).

**Save and close notepad.**

### Step 4: Start the Server

```cmd
node server.js
```

You should see:
```
AI Recruiter Server running at http://0.0.0.0:5000
```

If you get an error about a missing key, double-check the `.env` file.

### Step 5: Open in Chrome

```cmd
start http://localhost:5000
```

Or simply open Chrome and go to:
```
http://localhost:5000
```

**You should now see the AI Recruiter System frontend.**

## 🌐 Sharing on a Local Network (LAN)

If you want to share with friends on the same Wi-Fi:

1. Find your IP address: `ipconfig` (look for "IPv4 Address")
2. Share that URL: `http://192.168.1.x:5000` (replace with your actual IP)
3. Friends open that URL in their Chrome browsers

**No code changes needed** - `server.js` already binds to `0.0.0.0` so it works on any network.

## 🛠 How It Works

### 1. Screen a Candidate
- Select a role (SDE, UI/UX Designer, or Cybersecurity Engineer)
- Enter candidate name, GitHub URL, LinkedIn URL
- Upload a resume (PDF, DOCX, or photo of resume)
- Click "Screen & add to shortlist"
- The backend calls OpenAI to score on 8 dimensions
- Candidates with **7/10+ score + skills listed** auto-qualify for interview

### 2. Start Interview
- Click "Start interview" on any qualified candidate
- A timed 5-question adaptive interview begins
- Questions get harder or easier based on answers
- Each answer is evaluated by OpenAI

### 3. View Report
- After 5 questions, a final report generates
- Shows technical score (0-100%), communication score, summary, strengths, weaknesses

## ⚠️ Important Notes

- **Cost**: Every screening and interview turn makes a real OpenAI API call using your key - this will use your API credits
- **Key security**: The `.env` file is gitignored - your API key never reaches the browser or anyone else
- **Offline parsing**: Resume text extraction (PDF/DOCX) happens in the browser - your server only receives the extracted text + OpenAI scores
- **No claude.ai needed**: This version works entirely with your OpenAI account - no Claude dependency

## 🔄 Commands Summary (Copy-Paste)

```cmd
:: Step 1: Clone
git clone https://github.com/farhanmugdho/AI-recruiting-system.git
cd AI-recruiting-system

:: Step 2: Install
npm install

:: Step 3: Key
copy .env.example .env
:: (edit .env with your OpenAI key)

:: Step 4: Start
node server.js

:: Step 5: Open Chrome
start http://localhost:5000
```

---

**License**: Prototype for AI Recruiter System proposal.