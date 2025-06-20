# Meeting Room Booking Frontend

A modern web application for booking and managing meeting rooms, built with Vue 3, TypeScript, Vite, and Element Plus. This frontend interfaces with a backend API to provide authentication, booking management, and subscription plan features for users and organizations.

## Features
- **User Authentication**: Register and log in securely.
- **Booking Management**: Create, view, edit, and cancel meeting room bookings.
- **Subscription Plans**: View and subscribe to different booking plans.
- **Dashboard**: Overview of bookings and user info.
- **Responsive UI**: Clean, modern interface using Element Plus and custom styles.

## Tech Stack
- [Vue 3](https://vuejs.org/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) for fast development
- [Element Plus](https://element-plus.org/) UI library
- [Pinia](https://pinia.vuejs.org/) for state management
- [Vue Router](https://router.vuejs.org/) for routing
- [Axios](https://axios-http.com/) for API requests

## Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Steps
1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd meeting-room-frontend
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
3. **Configure API URL (optional):**
   - By default, the app connects to `http://127.0.0.1:8000/api`.
   - To use a different backend, create a `.env` file and set:
     ```env
     VITE_API_URL=http://your-backend-url/api
     ```
4. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
5. **Open your browser:**
   - Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

## Usage
- Register a new account or log in.
- Book meeting rooms, manage your bookings, and subscribe to plans.
- Access all features from the dashboard and navigation bar.

## Project Structure
- `src/components/` — UI components (Auth, Booking, Layout, Subscription)
- `src/api/` — Axios API setup
- `src/store/` — Pinia stores
- `src/router/` — Vue Router setup
- `src/assets/` — Static assets

## License
This project is for demonstration and internal use. Please contact the author for licensing details.
