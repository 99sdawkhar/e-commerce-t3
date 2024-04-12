import LoginForm from '@/component/LoginForm'
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