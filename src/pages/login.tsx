import LoginForm from '@/component/loginForm'
import { withAuth } from '@/hoc/withAuth'
import React from 'react'

const Login = () => {
  return (
    <div className='flex justify-center mb-4'>
      <LoginForm />
    </div>
  )
}

export default withAuth(Login)