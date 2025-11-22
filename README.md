Project created using Google Antigravity.

# 📅 Calendar Expense Tracker

A modern, mobile-first expense tracking application built with Next.js to help you manage your daily finances, meals (tiffins), and monthly rent.

## ✨ Features

*   **📱 Mobile-First Design**: Optimized for phones with bottom navigation
*   **📅 Calendar View**: Visualize daily spending with an interactive calendar
*   **🍱 Tiffin Tracker**: Log daily meals with customizable pricing and confirmation
*   **🏠 Rent Management**: Track monthly rent payments
*   **💰 Expense Categories**: Organize expenses into Meals, Rent, and Others
*   **☁️ Cloud Sync**: Data stored securely in Neon PostgreSQL
*   **📊 Monthly Overview**: Track monthly totals and category breakdowns

## 🛠️ Tech Stack

*   **Framework**: Next.js 16 (App Router)
*   **Database**: PostgreSQL (Neon DB)
*   **Styling**: Tailwind CSS
*   **Icons**: Lucide React
*   **Date Handling**: date-fns

## 📁 Project Structure

```
Expense Tracker/
├── app/
│   ├── api/                      # API Routes (Serverless Functions)
│   │   ├── expenses/
│   │   │   ├── [id]/
│   │   │   │   └── route.js      # DELETE /api/expenses/:id
│   │   │   └── route.js          # GET, POST /api/expenses
│   │   ├── settings/
│   │   │   └── route.js          # GET, POST /api/settings
│   │   └── test-db/
│   │       └── route.js          # GET /api/test-db (DB test)
│   ├── components/               # React Components
│   │   ├── views/
│   │   │   ├── MealView.jsx      # Meals tab content
│   │   │   ├── OtherView.jsx     # Others tab content
│   │   │   ├── OverviewView.jsx  # Overview tab content
│   │   │   └── RentView.jsx      # Rent tab content
│   │   ├── BottomNav.jsx         # Bottom navigation bar
│   │   ├── CalendarView.jsx      # Calendar grid display
│   │   ├── ConfirmationModal.jsx # Reusable confirmation dialog
│   │   ├── ExpenseSummary.jsx    # Monthly expense summary cards
│   │   ├── SettingsPanel.jsx     # Settings modal
│   │   └── TiffinTracker.jsx     # Tiffin counter and add button
│   ├── context/
│   │   └── ExpenseContext.jsx    # Global state management
│   ├── favicon.ico               # App icon
│   ├── globals.css               # Global styles
│   ├── layout.js                 # Root layout
│   └── page.js                   # Main app page
├── lib/
│   └── _db.js                    # Shared database connection pool
├── public/                       # Static assets
├── .gitignore                    # Git ignore rules
├── eslint.config.mjs             # ESLint configuration
├── jsconfig.json                 # JavaScript config
├── next.config.mjs               # Next.js configuration
├── package.json                  # Dependencies
├── postcss.config.mjs            # PostCSS configuration
├── README.md                     # This file
└── tailwind.config.js            # Tailwind CSS configuration
```

## 🚀 Getting Started

### Prerequisites

*   Node.js 18+ installed
*   A [Neon](https://neon.tech) database account

### Installation

1.  Clone the repository:
    ```bash
    git clone <your-repo-url>
    cd "Expense Tracker"
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Create `.env.local` file in the root directory:
    ```env
    DATABASE_URL=postgresql://user:password@host/database?sslmode=require
    ```

### Running Locally

**Development mode:**
```bash
npm run dev
```
Visit `http://localhost:3000`

**Production mode:**
```bash
npm run build
npm start
```

### Testing Database Connection

Visit `http://localhost:3000/api/test-db` to verify your database connection and see table information.

## 🌐 Deployment on Vercel

1.  **Push to GitHub**: Commit and push your code
2.  **Import to Vercel**: Connect your GitHub repository
3.  **Environment Variables**: 
    - Go to Vercel Project Settings → Environment Variables
    - Add `DATABASE_URL` with your Neon connection string
4.  **Deploy**: Vercel auto-deploys on push

Your app will be live at `https://your-project.vercel.app`

## 📱 Usage

### Setting Up
1.  Click the **Settings** icon (⚙️) in the top right
2.  Set your **Price per Tiffin** (e.g., 100)
3.  Set your **Monthly Rent Amount** (e.g., 12000)
4.  Click **Save Changes**

### Adding Expenses
- **Meals**: Tap `+` button, confirm to add a tiffin
- **Rent**: Tap **Mark Paid**, confirm to record rent
- **Others**: Enter amount and note, then **Add Expense**

### Viewing Data
- **Overview**: See monthly totals and category breakdowns
- **Calendar**: View daily expenses, tap dates to add entries
- **Individual Tabs**: Manage specific expense categories

### Deleting Entries
- Tap the **trash icon** (🗑️) next to any entry
- Confirm deletion in the popup

## 🔧 Configuration

### Tailwind CSS
Custom configuration in `tailwind.config.js` with extended color palette.

### Database Schema
Two tables:
- `expenses`: Stores all expense entries
- `settings`: Stores app settings (tiffin price, rent amount)