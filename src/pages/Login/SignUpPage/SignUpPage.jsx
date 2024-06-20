import { SignUp } from "@clerk/clerk-react";

const SignUpComponent = () => {
  return (
    <div className="flex items-center justify-center">
      <SignUp signInUrl="/login" />
    </div>
  );
};

export default SignUpComponent;
