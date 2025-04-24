Tiny Decisions – A Personal Decision Log

Tiny Decisions is a simple web app designed to help users log their everyday decisions, reflect on their outcomes, and build clarity over time. Whether it's deciding on a job offer, taking up a course, or making lifestyle changes — this tool allows users to weigh pros and cons, finalize choices, and track reflections.


 Features

Log New Decisions: Title, optional pros/cons, and toggle to mark if a decision is made or still under consideration.

Review and Reflect: Once a decision is finalized, users can input their final choice, explain why, and optionally reflect on whether it was a good decision.

Decision History: Displays a chronological list of decisions, highlighting their current state (Thinking / Decided / Reflected).

Visual Cues: Color-coded badges and icons to indicate reflection outcomes — No Regrets, Still Unsure, Had Regrets.



🧠 Thought Process

The goal of this project was to build a minimal yet functional decision-tracking app, focusing on clarity, usability, and state management without relying on a backend. I started by breaking down the features into clear components such as DecisionForm, DecisionList, and DecisionDetails.

I used React with functional components and hooks to maintain local state, and stored data in localStorage to persist decisions across sessions. I prioritized conditional rendering based on whether a decision is still being considered or has been made, ensuring the user sees only relevant fields during each stage.

Design-wise, I kept things clean and intuitive using Tailwind CSS for fast and responsive styling, and structured the UI to guide the user through creating, reviewing, and reflecting on decisions.



⚖️ Decisions & Tradeoffs

LocalStorage vs JSON Server: I chose localStorage to keep setup minimal and avoid adding server dependencies, since the scope was frontend-focused. For larger apps, I’d opt for a more scalable storage solution.

Minimal validation: To keep the experience smooth and fast, I added only basic input validation (e.g., title required). If this were a production app, I'd add stronger error handling and field-level validation.

Single-page layout: To reduce complexity, I kept the app mostly single-page with conditional views rather than routing, as the core experience was quite linear.






🔮 What I’d Build Next

If I had more time, I’d love to add:

some functionality like Search Filter Edition and Deleting entries for better control (I already added this functionality it in the app)

Charts or analytics to visualize types of decisions, regret rates, etc.

Reminders or nudges for decisions still marked as “Thinking.”

Theming/dark mode to improve visual comfort.

Animations/transitions for better user feedback and polish.



🛠️ Tech Stack

React (Functional Components + Hooks)

Tailwind CSS

localStorage for data persistence



📦 Getting Started

git clone https://github.com/Hitesh025/Tiny-Desicion-App
cd tiny-decisions
npm install
npm run dev


