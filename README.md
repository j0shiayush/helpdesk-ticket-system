# Mini Helpdesk & Support Ticket System

## Project Overview
A full-stack web application built for managing support tickets. This system allows standard users to create, view, and delete their own support tickets while providing an administrative dashboard for elevated users to view all system tickets, filter by status/priority, and update ticket progress.

## Tech Stack
* **Frontend:** React.js (Vite), React Router, Context API, Axios, React Hook Form
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose ODM)
* **Authentication:** JSON Web Tokens (JWT), Bcrypt for password hashing

## Setup Instructions

### 1. Clone the repository
\`\`\`bash
git clone <your-github-repo-url>
cd helpdesk-ticket-system
\`\`\`

### 2. Backend Setup
\`\`\`bash
cd server
npm install
npm run dev # (or node server.js)
\`\`\`

### 3. Frontend Setup
Open a new terminal window:
\`\`\`bash
cd client
npm install
npm run dev
\`\`\`
The application will be available at `http://localhost:5173`.

## Environment Variables Required
Create a `.env` file in the `server` directory with the following variables:
\`\`\`env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d
\`\`\`

## Database Setup Instructions
1. Create a MongoDB cluster (e.g., using MongoDB Atlas).
2. Retrieve your connection string and add it to the `MONGO_URI` in the `.env` file.
3. The application will automatically create the `users` and `tickets` collections upon first data entry.
4. **To create an Admin User:** 
   * Register a new user via the frontend UI.
   * Access your MongoDB database collections.
   * Locate the user document in the `users` collection.
   * Change the `role` field from `"user"` to `"admin"`.
   * Log out and log back in on the frontend to access the Admin Dashboard.

## API Documentation

### Authentication Endpoints
* `POST /api/auth/register` - Register a new user
* `POST /api/auth/login` - Authenticate user & get token
* `POST /api/auth/logout` - Logout user
* `GET /api/auth/me` - Get current authenticated user profile (Protected)

### User Ticket Endpoints
* `POST /api/tickets` - Create a support ticket (Protected)
* `GET /api/tickets` - Get logged-in user's tickets (Protected)
* `GET /api/tickets/:id` - Get a single ticket (Protected)
* `PUT /api/tickets/:id` - Update a ticket (Protected)
* `DELETE /api/tickets/:id` - Delete a ticket (Protected)

### Admin Endpoints
* `GET /api/admin/tickets` - Get all tickets with filters/search (Protected, Admin only)
* `PUT /api/admin/tickets/:id` - Update any ticket status (Protected, Admin only)
* `GET /api/admin/stats` - Get ticket statistics (Protected, Admin only)

## Screenshots
*(Remember to add screenshots of your Login, User Dashboard, Ticket Creation Form, and Admin Dashboard here before submitting)*
