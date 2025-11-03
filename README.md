ChemE Research Companion

Shivanee Shrivas, IIT Kanpur, Chemical Department

ChemE Research Companion is an AI-powered assistant designed to help Chemical Engineering students and researchers organize experimental notes, generate professional reports, and interact with an intelligent chatbot (ChemBot) for guidance.

The core function is Automated Report Generation, where the AI Agent converts raw experimental notes directly into structured scientific reports. Enhancing the research workflow, the Chatbot (ChemBot) provides instant Q&A, literature review, and research assistance, offering intelligent suggestions and guidance. Crucially, the Sustainability Advisor feature ensures rigorous standards by automatically adding safety and sustainability analysis notes to procedures. For data handling, the system includes Data Visualization support, auto-generating simple plots from tabular data. Finally, user experience is prioritized with Dark Mode for an accessible UI, and robust Export Options allowing reports to be saved as PDF or Google Docs.

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
index.html -	User interface layout, 
style.css -	UI/UX styling with modern design principles, 
script.js	- Handles user interaction, chatbot UI, and backend API calls, 
server.js -	Node.js backend server handling API requests, 
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
