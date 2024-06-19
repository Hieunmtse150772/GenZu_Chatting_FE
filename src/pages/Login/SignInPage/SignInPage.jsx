import { SignIn } from "@clerk/clerk-react";

const SignInPage = () => (
  <div>
    <SignIn signUpUrl="/register" />
  </div>
);

export default SignInPage;
