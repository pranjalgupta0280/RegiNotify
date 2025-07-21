# RegiNotify 📬

RegiNotify is a backend notification API built with **Node.js**, **Express.js**, and **MongoDB**.  
It supports user management, JWT-based authentication, and email/SMS notifications using **Gmail** and **Twilio**.

---

## 🚀 Features

- ✅ User Registration & Login  
- 🔐 JWT Authentication  
- 📧 Email Notifications (Gmail SMTP)  
- 📱 SMS Alerts (Twilio API)  
- 🧪 RESTful API with CRUD support  

---

## 📁 Project Structure

RegiNotify/
│
├── config/ # Configuration files (DB, Gmail, Twilio)
├── controllers/ # Business logic
├── models/ # Mongoose schemas
├── routes/ # Express routes
├── middleware/ # Auth middlewares
├── .env.example # Environment variable template
├── .gitignore
├── app.js # Entry point
└── README.md

yaml
Copy
Edit

---

## 🔧 Setup Instructions

### 1. Clone the repository

git clone https://github.com/pranjalgupta0280/RegiNotify.git
cd RegiNotify
2. Install dependencies
bash
Copy
Edit
npm install
3. Configure environment variables
Create a .env file by copying the template:

bash
Copy
Edit
cp .env.example .env
Then, fill in your real credentials (MongoDB URI, Gmail, Twilio, etc.) in the .env file.

🧪 Run the Server
bash
Copy
Edit
npm run dev
This uses nodemon for hot reload.

API is available at: http://localhost:3000

🧱 Technologies Used
Node.js

Express.js

MongoDB & Mongoose

JWT (jsonwebtoken)

Nodemailer

Twilio

dotenv

bcrypt

📬 API Endpoints
Method	Route	Description
POST	/api/register	Register a new user
POST	/api/login	Login and get token
POST	/api/notify/email	Send email notification
POST	/api/notify/sms	Send SMS notification

🔐 Security
Never commit real secrets.

Use .env to store credentials.

.env is excluded via .gitignore.

🤝 Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

📄 License
MIT

👤 Author
Made with ❤️ by Pranjal Gupta

yaml
Copy
Edit

---

Let me know if you'd like to add badges (like build status, license, etc.) or deployment instructions.
