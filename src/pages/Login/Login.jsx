import { useUser, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import SignInPage from "./SignInPage/SignInPage";
// import  { useEffect } from 'react';
// import { useClerk } from '@clerk/clerk-react';

export default function Login() {
  const { user } = useUser();

  return (
    <div className="flex bg-mainBlue my-auto mx-auto w-2/4 justify-between items-center p-8">
      <div>sad</div>
      <div>
        <SignedOut>
          <SignInPage />
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
