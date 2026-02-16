# Placement Readiness Platform  
A Structured, Deterministic Interview Preparation System

Live Deployment:  
https://akshay-shastri.github.io/placement-readiness-platform/

GitHub Repository:  
https://github.com/akshay-shastri/placement-readiness-platform

---

## Overview

Placement Readiness Platform is a fully structured, deterministic interview preparation system designed as a serious SaaS-grade product — not a student demo.

It transforms a Job Description (JD) into:

- Extracted skill clusters
- Round-wise preparation strategy
- A structured 7-day execution plan
- Likely interview questions
- Interactive readiness scoring
- Persistent preparation history
- Company-specific hiring intelligence
- Shipping validation and proof system

Everything works offline.  
No external APIs.  
No scraping.  
No randomness.

---

## Design System

This product is built on the **KodNest Premium Build System**.

Design Philosophy:
- Calm
- Intentional
- Coherent
- Confident

No gradients.  
No neon.  
No glassmorphism.  
No animation noise.

Color System:
- Background: `#F7F6F3`
- Primary Text: `#111111`
- Accent: `#8B0000`
- Muted success & warning states

Typography:
- Serif headings (confident, spaced)
- Sans-serif body (16–18px, line-height 1.6–1.8)
- Strict spacing scale: 8px / 16px / 24px / 40px / 64px

Layout Structure:
Top Bar → Context Header → Primary Workspace → Secondary Panel → Proof Footer

Everything feels like one mind designed it.

---

## Tech Stack

- React 18
- Vite
- React Router (HashRouter with environment-aware basename)
- Tailwind CSS
- Recharts
- lucide-react
- localStorage for persistence
- gh-pages for deployment

Deployment: GitHub Pages  
Routing: HashRouter with production basename handling  

---

## Core Features

### 1. Landing + App Shell
- Premium landing page
- Dashboard shell with sidebar navigation
- Responsive layout (2-column desktop, 1-column mobile)
- Clean component system using consistent spacing & typography

---

### 2. Readiness Dashboard

Includes:

- Circular SVG readiness indicator (animated stroke-dasharray)
- Radar chart (DSA, System Design, Communication, Resume, Aptitude)
- Weekly goals tracker
- Continue Practice card
- Upcoming Assessments list

All UI built using consistent design system principles.

---

### 3. JD Analysis Engine (Deterministic)

Heuristic skill extraction across:

Core CS  
Languages  
Web  
Data  
Cloud/DevOps  
Testing  

If no skills detected → defaults to structured fresher stack.

Outputs:

- Key Skills Extracted (grouped)
- Round-wise Preparation Checklist
- Adaptive 7-Day Plan
- 10 Likely Interview Questions
- Deterministic Readiness Score (0–100)

Scoring Logic:
- Base 35
- +5 per detected category (max 30)
- +10 company provided
- +10 role provided
- +10 JD length > 800 chars
- Cap at 100

---

### 4. Interactive Readiness

Each skill can be toggled:

- “I know this”
- “Need practice”

Live scoring updates:
- +2 per known skill
- -2 per practice skill
- Bound 0–100

Changes persist per history entry.

---

### 5. Company Intel + Round Mapping

Heuristic company classification:
- Enterprise
- Mid-size
- Startup

Enterprise example:
Online Test → DSA → Projects → HR

Startup example:
Practical Coding → System Discussion → Culture Fit

Includes:
- Industry inference
- Hiring focus template
- “Why this round matters” explanation
- Vertical timeline view

Stored inside history entry.

---

### 6. Strict Data Model

Every history entry follows:

```json
{
  id,
  createdAt,
  company,
  role,
  jdText,
  extractedSkills,
  roundMapping,
  checklist,
  plan7Days,
  questions,
  baseScore,
  skillConfidenceMap,
  finalScore,
  updatedAt
}
```

Corrupted entries handled gracefully:
"One saved entry couldn't be loaded. Create a new analysis."

---

### 7. Validation & Edge Case Handling

- JD required
- JD < 200 chars shows calm warning
- Score stability (baseScore immutable)
- Final score only affected by skill toggles
- History persists across refresh

---

### 8. Built-in Test Checklist

10 deterministic validation tests:

- JD validation
- Skill extraction correctness
- Round mapping logic
- Score determinism
- Persistence validation
- Export correctness
- No console errors

Shipping locked until:
All 10 tests are passed.

Checklist stored in localStorage.

---

### 9. Proof + Submission System

Proof Page includes:

- Step completion overview
- Required artifact links:
  - GitHub
  - Live deployment
  - Project source
- URL validation required
- Final submission export

Shipping status becomes “Shipped” only if:

- All steps complete
- All tests passed
- All links provided

Completion message:

"You built a real product.  
Not a tutorial. Not a clone.  
A structured tool that solves a real problem."

---

## Deployment

Production:
https://akshay-shastri.github.io/placement-readiness-platform/

Local:
```
npm install
npm run dev
```

Deploy:
```
npm run deploy
```

---

## What Makes This Different

- Deterministic logic (no black-box AI)
- Full offline persistence
- Structured data model
- Interactive scoring
- Shipping lock enforcement
- Real proof-of-work system
- Environment-aware routing configuration

This is not a clone.
This is not a tutorial follow-along.

This is a structured product build.

---

## Status

Shipped 🚀

