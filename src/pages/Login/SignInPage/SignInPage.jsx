import { SignIn } from '@clerk/clerk-react'

const SignInPage = () => (
  <div>
    <SignIn signUpUrl='/login/signup' />
  </div>
)

export default SignInPage
