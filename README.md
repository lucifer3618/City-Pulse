# City Pulse

![City Pulse Banner](path/to/banner.png)

City Pulse is a comprehensive web application designed to provide real-time insights and data about cities. It features a modern dashboard for monitoring various environmental and urban metrics, powered by AI-driven analysis.

## Features

- **User Authentication**: Secure login and signup using Google OAuth2 and JWT.
- **City Monitoring**: Real-time data on weather, UV index, and other city-specific metrics.
- **AI Insights**: Leverages Google Gemini to provide intelligent analysis of city data.
- **Interactive Maps**: Visualizes data using interactive maps (Leaflet).
- **Modern UI**: Built with React, Tailwind CSS, and Radix UI for a responsive and accessible experience.
- **Rate Limiting & Security**: Protected by Arcjet and standard security practices.

## Tech Stack

### Frontend
- **Framework**: React (Vite)
- **Styling**: Tailwind CSS, Radix UI
- **State Management**: React Hooks / Context
- **Routing**: React Router
- **Maps**: React Leaflet
- **Icons**: Lucide React, React Icons

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: Passport.js (Google OAuth2), JWT
- **Security**: Arcjet, Helmet (implied), CORS
- **Workflow**: Upstash Workflow

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas)

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd "City Pulse"
```

### 2. Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

Create a `.env.development.local` file in the `backend` directory with the following variables:

```env
PORT=5500
NODE_ENV=development
DB_URI=mongodb://localhost:27017/city-pulse
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=1d
ARCJET_ENV=development
ARCJET_KEY=your_arcjet_key
QSTASH_URL=your_qstash_url
QSTASH_TOKEN=your_qstash_token
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
MONGO_SECRET=your_mongo_session_secret
FRONTEND_BASE_URL=http://localhost:5173
APP_API_KEY=your_internal_api_key
GEMINI_API_KEY=your_gemini_api_key
GEO_API_KEY=your_geo_api_key
GEOAPIFY_API_KEY=your_geoapify_key
OPENWEATHER_API_KEY=your_openweather_key
OPENUV_API_KEY=your_openuv_key
```

Start the backend server:

```bash
npm run dev
```
The server should start on `http://localhost:5500`.

### 3. Frontend Setup

Open a new terminal, navigate to the frontend directory, and install dependencies:

```bash
cd frontend
npm install
```

Create a `.env.local` file in the `frontend` directory:

```env
VITE_APP_API_KEY=your_internal_api_key
```
*Note: Ensure `VITE_APP_API_KEY` matches `APP_API_KEY` in the backend configuration.*

Start the frontend development server:

```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

## Usage

1.  Open your browser and navigate to `http://localhost:5173`.
2.  Log in or sign up to access the dashboard.
3.  Explore city data and insights.

## License

[MIT](LICENSE)
