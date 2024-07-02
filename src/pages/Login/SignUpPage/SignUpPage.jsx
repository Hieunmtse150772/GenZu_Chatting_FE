import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { setCookie } from '../../../services/Cookies'

const SignUpComponent = () => {
  const [fullName, setFullName] = useState('')
  const [address, setAddress] = useState('')
  const [gender, setGender] = useState('male')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [picture, setPicture] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const handleSignUp = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await axios.post(
        'https://genzu-chatting-be.onrender.com/auth/sign-up',
        {
          fullName,
          address,
          gender,
          email,
          password,
          picture,
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      )
      const user = {
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
        user: response.data.user,
      }
      setCookie('userLogin', JSON.stringify(user), 7)
      navigate('/')
      // Handle successful sign up (e.g., redirect, show success message)
    } catch (err) {
      console.error('Sign up failed:', err)
      setError('Sign up failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex items-center justify-center bg-gray-100 px-4 py-12 sm:px-6 lg:px-8'>
      <div className='w-full max-w-md space-y-8'>
        <div>
          <img className='mx-auto h-12 w-auto' src='/your-logo.svg' alt='Logo' />
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
            Create your account
          </h2>
        </div>
        <form className='mt-8 space-y-6' onSubmit={handleSignUp}>
          <input type='hidden' name='remember' value='true' />
          <div className='-space-y-px rounded-md shadow-sm'>
            <div>
              <label htmlFor='fullName' className='sr-only'>
                Full Name
              </label>
              <input
                id='fullName'
                name='fullName'
                type='text'
                autoComplete='name'
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className='relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                placeholder='Full Name'
              />
            </div>
            <div>
              <label htmlFor='address' className='sr-only'>
                Address
              </label>
              <input
                id='address'
                name='address'
                type='text'
                autoComplete='address'
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className='relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                placeholder='Address'
              />
            </div>
            <div>
              <label htmlFor='gender' className='sr-only'>
                Gender
              </label>
              <select
                id='gender'
                name='gender'
                required
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className='relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
              >
                <option value='male'>Male</option>
                <option value='female'>Female</option>
              </select>
            </div>
            <div>
              <label htmlFor='email-address' className='sr-only'>
                Email address
              </label>
              <input
                id='email-address'
                name='email'
                type='email'
                autoComplete='email'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                placeholder='Email address'
              />
            </div>
            <div>
              <label htmlFor='password' className='sr-only'>
                Password
              </label>
              <input
                id='password'
                name='password'
                type='password'
                autoComplete='new-password'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                placeholder='Password'
              />
            </div>
            <div>
              <label htmlFor='picture' className='sr-only'>
                Profile Picture URL
              </label>
              <input
                id='picture'
                name='picture'
                type='text'
                autoComplete='url'
                value={picture}
                onChange={(e) => setPicture(e.target.value)}
                className='relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                placeholder='Profile Picture URL'
              />
            </div>
          </div>

          {error && <p className='text-sm text-red-500'>{error}</p>}

          <div>
            <button
              type='submit'
              className={`group relative flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white ${loading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
              disabled={loading}
            >
              {loading ? 'Signing up...' : 'Sign up'}
            </button>
            <p className='mt-2 text-center text-sm text-gray-600'>
              Or
              <a
                onClick={() => {
                  navigate('/login')
                }}
                href='#'
                className='font-medium text-indigo-600 hover:text-indigo-500'
              >
                Sign in your account
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUpComponent
