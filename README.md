# SmartCollab – Real-Time Collaborative Code Editor

SmartCollab is a real-time collaborative coding platform that allows multiple developers to write, edit, and run code together in shared rooms. It supports multi-language editing,Docker-based code execution and real-time synchronization powered by WebSockets.

---

  

## 🌐 Tech Stack

  

-  **Frontend:** React.js, Tailwind CSS

  

-  **Backend:** Node.js, Express.js (API)

  

-  **Real-Time Communication:** Socket.IO

  

-  **Database:** Redis (For Room Data Persistance)

  

-  **Code Editor:** CodeMirror 6

---

## ✨ Features

  

- 🧑‍💻 **Real-Time Code Collaboration** – Multiple developers can edit the same code simultaneously.

  

- 🌍 **Multi-Language Support** – JavaScript, Python, Java, C++ with syntax highlighting via CodeMirror 6.

- ▶️ **Secure Docker-Based Code Execution** – Execute Python, Java, and C++ inside isolated Docker containers with execution timeout, CPU limits, memory limits, and network isolation.

- 📋 **Copy & Download Code** – Easily copy code to clipboard or download in multiple languages.

  

- 🔐 **Room-Based Collaboration** – Create unique rooms to work with specific participants.

  

- 👥 **Participant Presence** – Track active users with live join/leave notifications.

  
  

---

## 📦 Installation (For Development)

  

```bash
# Clone the repository
git  clone [https://github.com/nikhilughade562-dev/Smart-Collab--Real-Time-Collaborative-Code-Editor.git]
```

### Install Frontend
```bash
cd Frontend
npm install
```
### Install Backend
```bash
cd  ../Backend
npm  install
```
## ⚙️ Environment Variables
```bash
# Backend environment Variable
PORT=5000
REDIS_URL=your_redis_url
```
```bash
# Frontend environment Variable
VITE_BACKEND_URL=http://localhost:5000
```

  

## 🐳 Docker Setup

Docker Desktop must be installed and running before using the code execution feature.
Verify Docker installation:
```bash
docker  --version
```
## 👨‍💻 Author

### Nikhil Ughade

## 📜 License

This project is licensed under the **MIT License**.