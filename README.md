Project created using Google Antigravity.

# 📅 Calendar Expense Tracker

A modern, mobile-first expense tracking application built to help you manage your daily finances, specifically focused on meal tracking (tiffins) and monthly rent.

## ✨ Features

*   **Calendar View**: Visualize your daily spending with a clean, interactive calendar.
*   **Tiffin Tracker**: Log your daily meals with a single tap. Customizable price per tiffin.
*   **Rent Management**: Track your monthly rent payments with custom reminders.
*   **Cloud Sync**: All data is securely stored in a Neon PostgreSQL database, allowing access from multiple devices.
*   **Mobile First**: Designed to look and feel great on your phone.
*   **Smart Insights**: View monthly breakdowns and daily totals.

## 🛠️ Tech Stack

*   **Frontend**: React, Vite, Tailwind CSS
*   **Backend**: Node.js, Express
*   **Database**: PostgreSQL (Neon DB)
*   **Icons**: Lucide React

## 🚀 Getting Started

### Prerequisites

*   Node.js installed
*   A [Neon](https://neon.tech) database account

### Installation

1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    cd server && npm install && cd ..
    ```
3.  Create a `.env` file in the root directory with your Neon connection string:
    ```env
    DATABASE_URL=postgresql://user:password@host/dbname?sslmode=require
    PORT=5000
    ```

### Running the App

Start both the backend server and the frontend client with a single command:

```bash
npm start
```

*   **Frontend**: http://localhost:5173
*   **Backend**: http://localhost:5000
