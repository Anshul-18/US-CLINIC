# US-CLINIC - Healthcare Management System

A comprehensive MERN stack application for managing clinic operations, appointments, doctors, and patients with integrated payment processing.

---

## 🚀 Features

- **Single Doctor System**
  - Designed specifically for clinics with one primary doctor
  - Admin can register only one doctor in the system
  - All appointments are automatically routed to the primary doctor

- **User Authentication**
  - Secure signup and login for patients and admin
  - Role-based access control (Patient/Doctor/Admin)

- **Appointment Management**
  - Online appointment booking with integrated payment
  - Real-time availability checking
  - Appointment status tracking (pending/confirmed/cancelled/completed)
  - Real-time notifications for status changes

- **Payment Integration**
  - Secure payment processing using Stripe
  - Instant payment confirmation
  - Payment status tracking
  - Configurable appointment fees

- **Role-Based Dashboards**
  - **Patient Dashboard:** Book appointments, make payments, view history
  - **Doctor Dashboard:** Manage appointments, update statuses
  - **Admin Dashboard:** Manage doctor profile and system settings

---

## 🛠️ Tech Stack

### Frontend
- React 19.1.0
- React Router DOM 7.6.1
- Axios 1.9.0
- Stripe.js

### Backend
- Node.js
- Express.js 4.18.2
- MongoDB with Mongoose 8.0.3
- Stripe API 20.3.0
- CORS

---

## 📋 Prerequisites

- Node.js (v16+ recommended)
- MongoDB (local or MongoDB Atlas)
- Stripe account and API keys
- npm or yarn package manager

---

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Archit026/US-CLINIC.git
cd US-CLINIC
```

### 2. Install All Dependencies

Quick install (recommended):
```bash
npm run install-all
```

Or install manually:
```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 3. Backend Setup

#### Environment Variables

Create a `.env` file in the `backend` directory:

```bash
cd backend
cp .env.example .env
```

Edit the `.env` file with your configuration:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://127.0.0.1:27017/dentistApp
# For production use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname

# CORS Configuration
CORS_ORIGIN=http://localhost:3000

# Stripe Configuration
STRIPE_SECRET_KEY=your_stripe_secret_key_here

# JWT Configuration (if using authentication)
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d

# WhatsApp Configuration (optional)
WHATSAPP_API_KEY=your_whatsapp_api_key_here
```

#### Start MongoDB

Make sure MongoDB is running:
```bash
# If using local MongoDB
mongod
```

Or use MongoDB Atlas by updating `MONGODB_URI` in your `.env` file with your Atlas connection string.

#### Start Backend Server

Development mode (with auto-reload):
```bash
cd backend
npm run dev
```

Production mode:
```bash
cd backend
npm start
```

The backend will run on [http://localhost:5000](http://localhost:5000).

### 4. Frontend Setup

#### Environment Variables

Create a `.env` file in the `frontend` directory:

```bash
cd frontend
cp .env.example .env
```

Edit the `.env` file:

```env
# API Configuration
REACT_APP_API_URL=http://localhost:5000

# Stripe Configuration
REACT_APP_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key_here
```

#### Start Frontend

```bash
cd frontend
npm start
```

The frontend will run on [http://localhost:3000](http://localhost:3000).

---

## 🚀 Running the Application

### Development Mode

#### Option 1: Run both servers separately

Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

Terminal 2 - Frontend:
```bash
cd frontend
npm start
```

#### Option 2: Use root scripts

Backend:
```bash
npm run dev
```

Frontend:
```bash
npm run client
```

### Production Build

Build the frontend:
```bash
npm run build
```

Start the backend:
```bash
npm start
```

---

## 💳 Payment Integration

### Stripe Setup

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Get your API keys from the dashboard (Developers → API keys)
3. Add both secret key (backend .env) and publishable key (frontend .env)

### Payment Flow

1. Patient selects appointment time
2. Stripe payment form appears
3. Upon successful payment:
   - Payment is verified
   - Appointment is created
   - Confirmation notifications are sent

---

## 📁 Project Structure

```
US-CLINIC/
├── backend/
│   ├── config/
│   │   ├── db.js              # MongoDB connection
│   │   └── temp.js            # Temporary configurations
│   ├── controllers/
│   │   ├── appointmentController.js
│   │   ├── doctorController.js
│   │   ├── patientController.js
│   │   └── paymentController.js
│   ├── helpers/
│   │   └── sendWhatsAppMessage.js
│   ├── models/
│   │   ├── Appointment.js     # Appointment schema
│   │   └── User.js            # User schema
│   ├── routes/
│   │   ├── appointmentRoutes.js
│   │   ├── authRoutes.js
│   │   └── paymentRoutes.js
│   ├── server.js              # Express server entry point
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   └── Sidebar.js
│   │   ├── config/
│   │   │   └── api.js         # API configuration
│   │   ├── pages/
│   │   │   ├── AdminDashboard.js
│   │   │   ├── AppointmentsPage.js
│   │   │   ├── ComingSoon.js
│   │   │   ├── DoctorDashboard.js
│   │   │   ├── DoctorsPage.js
│   │   │   ├── Login.js
│   │   │   ├── MainPage.js
│   │   │   ├── PatientDashboard.js
│   │   │   ├── Signup.js
│   │   │   └── UserLandingPage.js
│   │   ├── styles/            # Component styles
│   │   ├── utils/
│   │   │   └── auth.js        # Authentication utilities
│   │   ├── App.js
│   │   └── index.js
│   ├── .env.example
│   └── package.json
├── .gitignore
├── package.json               # Root package with scripts
├── README.md
└── render.yaml               # Deployment configuration

```

---

## 🌐 API Endpoints

### Authentication (`/auth`)

- `POST /auth/signup` — Register new user
- `POST /auth/login` — User login
- `GET /auth/doctors` — List all doctors

### Appointments (`/appointments`)

- `GET /appointments` — Get all appointments
- `POST /appointments/create` — Create new appointment
- `PATCH /appointments/status/:appointmentId` — Update appointment status
- `PUT /appointments/:id` — Update appointment
- `DELETE /appointments/:id` — Delete appointment

### Payments (`/api/payment`)

- `POST /api/payment/create-payment-intent` — Create Stripe payment intent

### Health Check

- `GET /health` — Check server status

---

## 🔑 Environment Variables Reference

### Backend Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `PORT` | Server port | No | 5000 |
| `NODE_ENV` | Environment (development/production) | No | development |
| `MONGODB_URI` | MongoDB connection string | Yes | - |
| `CORS_ORIGIN` | Allowed CORS origin | No | http://localhost:3000 |
| `STRIPE_SECRET_KEY` | Stripe secret key | Yes | - |
| `JWT_SECRET` | JWT signing secret | Yes* | - |
| `JWT_EXPIRE` | JWT expiration time | No | 7d |

*Required if using JWT authentication

### Frontend Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `REACT_APP_API_URL` | Backend API URL | No (defaults to http://localhost:5000) |
| `REACT_APP_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | Yes |

---

## 🚢 Deployment

### Deploy to Render.com

The project includes `render.yaml` for easy deployment:

1. Push your code to GitHub
2. Create a new Web Service on Render
3. Connect your repository
4. Render will automatically detect the configuration
5. Set environment variables in Render dashboard
6. Deploy!

### Environment Variables for Production

Make sure to set these in your Render dashboard:
- `MONGODB_URI` (use MongoDB Atlas)
- `STRIPE_SECRET_KEY`
- `JWT_SECRET`
- `NODE_ENV=production`
- `CORS_ORIGIN` (your frontend URL)

---

## 🛡️ Security Notes

- Always use environment variables for sensitive data
- Never commit `.env` files to version control
- Use HTTPS in production
- Implement rate limiting for API endpoints
- Keep dependencies updated
- Use strong JWT secrets
- Validate and sanitize all user inputs

---

## ⚙️ Customization

- **Email/SMS Notifications:** Implement notification service in `helpers/`
- **Roles:** Extend user roles in [backend/models/User.js](backend/models/User.js)
- **UI Themes:** Update styles in [frontend/src/styles/](frontend/src/styles/)
- **Appointment Rules:** Modify logic in [backend/controllers/appointmentController.js](backend/controllers/appointmentController.js)

---

## 📊 System Limitations

- **Single Doctor:** Designed for clinics with one doctor
- **Payment Required:** All appointments require upfront payment
- **Fixed Fees:** Appointment fees set via environment or database

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the ISC License.

---

## 👥 Authors

- Archit Shrivas - [@Archit026](https://github.com/Archit026)

---

## 🙏 Acknowledgements

- [Create React App](https://create-react-app.dev/)
- [MongoDB](https://www.mongodb.com/)
- [Express.js](https://expressjs.com/)
- [Stripe](https://stripe.com/)
- [Render](https://render.com/)

---

## Contact

For questions or contributions, please open an issue or contact the maintainer.
