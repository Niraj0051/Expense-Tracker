import "./globals.css";

export const metadata = {
  title: "Expense Tracker",
  description: "Track your expenses with ease",
  icons: {
    icon: "/expense.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
