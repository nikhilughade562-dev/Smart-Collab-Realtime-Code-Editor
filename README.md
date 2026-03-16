
SmartCollab – Real-Time Collaborative Code Editor

SmartCollab is a real-time collaborative coding platform that allows multiple developers to write, edit, and run code together in shared rooms. The platform supports multi-language editing, AI coding assistance, live chat, collaborative whiteboard, and real-time synchronization powered by WebSockets.

It is designed to simulate modern collaborative development environments similar to Google Docs for code.

🌐 Live Features

SmartCollab provides a complete collaborative coding experience with multiple integrated tools:

Real-time collaborative code editing

Multi-language support

AI-powered coding assistant

Code execution

Collaborative whiteboard

Live chat

Room-based collaboration

Copy & download code

Real-time participant tracking

🧠 Core Features
🧑‍💻 Real-Time Code Collaboration

Multiple users can join a shared room and edit code simultaneously with instant synchronization using Socket.IO.

🌍 Multi-Language Code Editor

Supports multiple programming languages including:

JavaScript

Python

Java

C++

with syntax highlighting using CodeMirror 6.

🤖 AI Coding Assistant

Integrated AI assistance helps users:

Understand code

Generate suggestions

Debug problems

Improve logic

▶️ Run Code Instantly

Execute code directly inside the platform and view output without leaving the editor.

💬 Live Chat

Users inside a room can communicate through real-time messaging.

🎨 Collaborative Whiteboard

A shared Excalidraw canvas allows participants to draw diagrams, system designs, or algorithm explanations together.

📋 Copy & Download Code

Copy code directly to clipboard

Download code files in the selected language format

🔐 Room-Based Collaboration

Users collaborate in isolated rooms using a unique Room ID.

👥 Participant Tracking

Tracks users inside a room and updates when someone joins or leaves.

⚙️ Tech Stack
Frontend

React.js

CodeMirror 6

Tailwind CSS

Excalidraw

React Hot Toast

Backend

Node.js

Express.js

Socket.IO

Data & State Management

Redis (Room state & real-time session data)

MongoDB (Optional persistence)

🏗️ System Architecture
Client (React)
      │
      │ WebSockets
      ▼
Socket.IO Server (Node.js + Express)
      │
      ├── Redis
      │     ├── Room State
      │     ├── Participants
      │     ├── Code Snapshot
      │     └── Chat Messages
      │
      └── MongoDB (Optional Persistence)

Redis is used for ultra-fast in-memory storage of room data such as:

Current code

Active participants

Chat messages

Whiteboard state

📁 Project Structure
SmartCollab
│
├── client
│   ├── components
│   │   ├── CodeEditor.jsx
│   │   ├── Chat.jsx
│   │   ├── Whiteboard.jsx
│   │   └── Participants.jsx
│   │
│   ├── pages
│   │   ├── Home.jsx
│   │   └── EditorPage.jsx
│   │
│   ├── assets
│   └── utils
│
├── server
│   ├── socket
│   │   └── socketHandler.js
│   │
│   ├── redis
│   │   └── redisClient.js
│   │
│   ├── routes
│   └── server.js
│
└── README.md
🚀 Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/yourusername/smartcollab.git
cd smartcollab
2️⃣ Install Dependencies
Client
cd client
npm install
Server
cd server
npm install
3️⃣ Setup Environment Variables

Create a .env file in the server directory.

Example:

PORT=5000
REDIS_URL=your_redis_url
MONGO_URI=your_mongodb_uri
4️⃣ Start Redis

If running locally:

redis-server
5️⃣ Start the Server
cd server
npm start
6️⃣ Start the Client
cd client
npm run dev
🧪 How It Works
1️⃣ User Creates or Joins a Room

A unique Room ID is generated.

2️⃣ WebSocket Connection

Client connects to the server using Socket.IO.

3️⃣ Real-Time Synchronization

All updates are broadcast to users in the same room:

Code changes

Chat messages

Whiteboard updates

4️⃣ Redis Stores Live State

Room-related data is stored temporarily in Redis.

5️⃣ Automatic Cleanup

When the last user leaves:

Room state is cleared

Redis data is removed

🔥 Key Engineering Concepts Used

Real-time communication

WebSocket architecture

State synchronization

Collaborative editing systems

Redis in-memory data structures

Room-based session management

Event-driven backend architecture

📈 Future Improvements

Possible enhancements:

Cursor presence indicators

Code execution sandbox

File system support

Version history

GitHub integration

OAuth authentication

AI pair programming

🎯 Use Cases

Pair programming

Technical interviews

Coding workshops

Teaching programming

System design collaboration

👨‍💻 Author

Nikhil Ughade

Final Year Computer Science Student
Passionate about Full Stack Development, Real-Time Systems, and Distributed Applications

⭐ Contributing

Contributions are welcome!

Steps:

Fork the repository

Create a new branch

Make changes

Submit a pull request

📜 License

This project is licensed under the MIT License.

💡 Inspiration

Inspired by collaborative platforms like:

Google Docs

CodeSandbox Live

Replit Multiplayer