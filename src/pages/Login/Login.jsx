import { useUser, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import SignInPage from "./SignInPage/SignInPage";
import { Routes, Route } from "react-router-dom";
import SignUpComponent from "./SignUpPage/SignUpPage";
// import  { useEffect } from 'react';
// import { useClerk } from '@clerk/clerk-react';

export default function Login() {
  const { user } = useUser();

  return (
    <div className="flex bg-mainBlue my-auto mx-auto w-2/4 justify-between items-center p-8">
      <div>
        <img src="/src/assets/Lovepik_com-401526386-galaxy.png" alt="load image error" />
      </div>
      <div>
        <SignedOut>
          <Routes>
            <Route path="/" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpComponent />} />
          </Routes>
          {/* <SignInPage /> */}
        </SignedOut>
        <SignedIn>
          <p>Welcome, {user?.fullName}!</p>
          <p>Email: {user?.primaryEmailAddress?.emailAddress}</p>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}
