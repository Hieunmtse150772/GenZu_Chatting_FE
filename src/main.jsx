<<<<<<< HEAD
<<<<<<< HEAD
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ClerkProvider } from '@clerk/clerk-react'

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}
=======
=======
>>>>>>> 066c79b7c9a58d7c25b810fae01e57853faa46f0
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ClerkProvider } from "@clerk/clerk-react";
<<<<<<< HEAD
>>>>>>> 9abea9ddd81d4335657a4bdebfa5310c602564cf
=======
>>>>>>> 066c79b7c9a58d7c25b810fae01e57853faa46f0

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env
  .VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <App />
    </ClerkProvider>
<<<<<<< HEAD
<<<<<<< HEAD
  </React.StrictMode>,
)
=======
  </React.StrictMode>
);
>>>>>>> 9abea9ddd81d4335657a4bdebfa5310c602564cf
=======
  </React.StrictMode>
);
>>>>>>> 066c79b7c9a58d7c25b810fae01e57853faa46f0
