import ChatBody from "../components/View/ChatBody/ChatBody";
import Sidebar from "../components/Sidebar/Sidebar";
import { useUser, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import "./Home.css";
import SignInPage from "./Login/SignInPage/SignInPage";
import React from "react";

export default function Home() {
  return (
    <div className="Login">
      <SignedOut>
        <SignInPage />
      </SignedOut>
      <SignedIn>
        {/* <p>Welcome, {user?.fullName}!</p>
        <p>Email: {user?.primaryEmailAddress?.emailAddress}</p>
        <UserButton /> */}
        <main className="flex">
          <Sidebar />
          <ChatBody />
        </main>
      </SignedIn>
    </div>
  );
}
