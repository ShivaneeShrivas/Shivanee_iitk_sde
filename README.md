ChemE Research Companion

Shivanee Shrivas, IIT Kanpur, Chemical Department

Overview
ChemE Research Companion is an AI-powered assistant designed to help Chemical Engineering students and researchers organize experimental notes, generate professional reports, and interact with an intelligent chatbot (ChemBot) for guidance.

The system provides:
Automated report generation from lab notes
Literature review and procedure formatting
Safety and sustainability analysis
Data visualization support
Chat-based Q&A and research assistance

Features:
Category - Description
AI Agent - Converts raw experimental notes into structured scientific reports
Chatbot (ChemBot) -	Provides intelligent suggestions, answers queries, and research guidance
Sustainability - Advisor	Adds sustainability and safety notes automatically
Data Visualization -	Auto-generates simple plots from tabular data
Export Options	- Export reports as PDF or Google Docs
Dark Mode	Smooth and accessible UI for all users

## System Architecture

| Component | Description |
| :--- | :--- |
| **Frontend** | HTML/CSS/JS |
| **Backend** | Node.js + Express |
| **AI Model** | Gemini API |

---
## Technologies Used

| Stack | Technology | Reason for Choice |
| :--- | :--- | :--- |
| **Frontend** | HTML5, CSS3, JavaScript | Simplicity and responsiveness |
| **Backend** | Node.js (Express) | Lightweight, fast, and ideal for APIs |
| **AI Model** | Gemini API | Contextual and reliable responses |
| **Version Control** | Git & GitHub | Collaboration and submission |

Component Breakdown:
Component	- Description
index.html -	User interface layout
style.css -	UI/UX styling with modern design principles
script.js	- Handles user interaction, chatbot UI, and backend API calls
server.js -	Node.js backend server handling API requests
interaction logs

### System Design Flow

The system processes requests through the following sequence:

1.  **User Interface (UI):** User initiates an action (e.g., submits notes, asks a question).
2.  **Frontend JavaScript:** Handles the interaction and prepares the API request.
3.  **Express Backend:** Receives the request and acts as the secure intermediary.
4.  **Gemini AI API:** Processes the request (e.g., report generation, Q&A) using the AI model.
5.  **Express Backend:** Receives the structured AI response.
6.  **Structured Output:** Data is sent back to the frontend for display as a final report or insight.

Setup Instructions:
1. Clone the repository
git clone https://github.com/ShivaneeShrivas/Shivanee_iitk_sde.git
cd Shivanee_iitk_sde

2. Install dependencies
npm install

3. Add your API key
echo API_KEY=your_gemini_api_key > .env

4. Start backend server
node server.js

5. Open index.html in browser
