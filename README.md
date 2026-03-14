# PingMe  Real-Time MERN Chat Application

PingMe is a real-time one-to-one messaging application built using the
MERN stack with Socket.IO for live communication. It provides instant
messaging, online user presence, and persistent chat history stored in
MongoDB.

The frontend UI is inspired by WhatsApp-style messaging interfaces,
while the backend architecture is fully custom-built with Node.js,
Express, and WebSockets.

---

## 🚀 Features

- ⚡ Real-time messaging using Socket.IO
- 👤 JWT Authentication with secure cookies
- 🟢 Online user presence detection
- 💬 1-to-1 private chat system
- 🗂 Persistent message history stored in MongoDB
- 🔐 Password hashing with bcrypt
- 🌐 Redux global state management
- ⚡ Fast frontend with React + Vite
- 🎨 Clean chat interface

---

## 🏗 Tech Stack

### Frontend

- React
- Vite
- Redux Toolkit
- Socket.IO Client
- Axios
- Plain CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Socket.IO
- JSON Web Tokens (JWT)
- bcrypt (password hashing)
- cookie-parser

---

## 📂 Project Structure

└── 📁client
    └── 📁src
        └── 📁assets
        └── 📁components
            ├── ChatWindow.jsx
            ├── ContactItem.jsx
            ├── ContactList.jsx
            ├── EditProfile.jsx
            ├── Message.jsx
            ├── MessageInput.jsx
            ├── MessageList.jsx
            ├── Sidebar.jsx
        └── 📁hooks
            ├── useGetChatUsers.jsx
            ├── useGetMessages.jsx
            ├── useGetOtherUsers.jsx
            ├── useGetRealTimeMessages.jsx
        └── 📁pages
            ├── Dashboard.jsx
            ├── Login.jsx
            ├── Register.jsx
        └── 📁redux
            ├── messageSlice.js
            ├── socketSlice.js
            ├── store.js
            ├── userSlice.js
        ├── App.jsx
        ├── index.css
        ├── main.jsx
    ├── .gitignore
    ├── .env
    ├── eslint.config.js
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── README.md
    └── vite.config.js
└── 📁server
    └── 📁config
        ├── generateToken.js
        ├── mongoose-connect.js
        ├── multer.js
    └── 📁controllers
        ├── chatController.js
        ├── userController.js
    └── 📁middleware
        ├── isLoggedIn.js
        ├── multer.js
    └── 📁models
        ├── Chat.js
        ├── Message.js
        ├── User.js
    └── 📁public
    └── 📁routes
        ├── chatRoutes.js
        ├── userRoutes.js
    └── 📁socket
        ├── socket.js
    ├── .env
    ├── package-lock.json
    ├── package.json
    └── server.js


---

## ⚙️ How It Works

PingMe uses two communication systems:

### 1️⃣ HTTP API (Express)

Used for: - Authentication - Fetching chat history - User management

### 2️⃣ WebSockets (Socket.IO)

Used for: - Real-time message delivery - Online user tracking

Workflow:

    User sends message
            ↓
    Socket.IO emits message
            ↓
    Server receives event
            ↓
    Message saved to MongoDB
            ↓
    Message emitted to receiver
            ↓
    Receiver UI updates instantly

---

## 🔐 Authentication Flow

PingMe uses JWT stored in cookies.

    User Login
         ↓
    Server generates JWT
         ↓
    JWT stored in HTTP cookie
         ↓
    Protected routes verify token
         ↓
    User authenticated

---

## 🗄 Message Persistence

All messages are stored in MongoDB.

When a user opens a conversation:

    Frontend requests chat history
            ↓
    Backend fetches messages from MongoDB
            ↓
    Messages loaded into Redux state
            ↓
    Displayed in chat window

---

## 📸 Screenshots

Add screenshots here once the app is deployed or running locally.

### Login Page

![Login Screenshot](./screenshots/login.png)

### Register Page

![Register Screenshot](./screenshots/register.png)

### Chat Dashboard

![Dashboard Screenshot](./screenshots/dashboard.png)

### Chat Conversation

![Chat Screenshot](./screenshots/chat.png)

### Online Users

![Online Users Screenshot](./screenshots/online-users.png)

Create a `/screenshots` folder in the repository and add these images
later.

---

## 🛠 Installation

### 1️⃣ Clone the repository

    git clone https://github.com/pbhutka/MERN-SOCKET.git
    cd MERN-SOCKET

### 2️⃣ Install dependencies

Client:

    cd client
    npm install

Server:

    cd ../server
    npm install

---

### 3️⃣ Environment Variables

Create a `.env` file inside the **server** folder.

Example:

    PORT=5000
    MONGO_URI=your_mongodb_connection
    JWT_SECRET=your_secret_key
    CLIENT_URL=http://localhost:5173

---

### 4️⃣ Run the application

Start backend:

    cd server
    npm run dev

Start frontend:

    cd client
    npm run dev

---

## 🌐 Deployment

Deployment links will be added here later.

    Frontend: (coming soon)
    Backend: (coming soon)

Recommended setup:

    Frontend → Vercel
    Backend → Render
    Database → MongoDB Atlas

---

## 📈 Future Improvements

Planned features for PingMe:

- 👥 Group chats
- 📎 File sharing (images, videos, documents)
- 🔔 Message notifications
- ✍️ Typing indicators
- 📱 Mobile responsive improvements
- ☁️ Cloud deployment
- 🔍 Search conversations
- 🗑 Message delete/edit

---

## 👨‍💻 Author

Built by **Parth Valabhai Bhutka**

GitHub: https://github.com/pbhutka

---

## ⭐ Support

If you like this project, consider giving it a star ⭐ on GitHub.
