# Complete Backend

A complete Node.js backend project built with **Express**, **MongoDB (Mongoose)**, and **JWT authentication**.  
This project provides a ready-to-use authentication and user management system with middleware for role-based access, token generation, and email utilities.

---

## Features

- User registration and login (with JWT authentication)
- Password hashing using **bcrypt**
- Role-based access control (middleware)
- MongoDB integration with **Mongoose**
- Environment variable support with **dotenv**
- Email sending via **Nodemailer**
- Google authentication (via `google-auth-library`)
- CORS enabled for cross-origin requests

---

## Project Structure

```
complete-backend/
│── config/           # Database connection
│── controllers/      # Route controllers (business logic)
│── middleware/       # Authentication & role-based access
│── models/           # Mongoose models (User schema)
│── routes/           # API routes
│── utils/            # Token generation & email helper
│── server.js         # Entry point
│── package.json
```

---

## Tech Stack

- **Node.js** (Express.js)
- **MongoDB** (Mongoose ODM)
- **JWT** for authentication
- **Nodemailer** for emails
- **Google Auth Library** for Google login
- **dotenv** for environment variables

---

## Installation

Clone the repository:

```bash
git clone https://github.com/IsraelIyke/complete-backend.git
cd complete-backend
```

Install dependencies:

```bash
npm install
```

---

## Environment Variables

Create a `.env` file in the root and add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

---

## Running the App

For development (with **nodemon**):

```bash
npm run dev
```

For production:

```bash
npm start
```

The server will run at:  
`http://localhost:5000`

---

## 📡 API Routes

| Method | Endpoint             | Description       | Auth |
| ------ | -------------------- | ----------------- | ---- |
| POST   | `/api/users`         | Register new user | No   |
| POST   | `/api/users/login`   | User login        | No   |
| GET    | `/api/users/profile` | Get user profile  | Yes  |
| PUT    | `/api/users/profile` | Update profile    | Yes  |

_(More routes available inside `routes/userRoutes.js`)_

---

## Testing

You can test the API using **Postman** or **cURL**. Example:

```bash
curl -X POST http://localhost:5000/api/users/login   -H "Content-Type: application/json"   -d '{"email":"test@example.com","password":"123456"}'
```

---

## Contact

For inquiries or contributions, reach out at: **nwangwuisrael@gmail.com**

---

## 📄 License

This project is licensed under the **MIT License**.
