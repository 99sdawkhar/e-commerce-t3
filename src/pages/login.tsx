import LoginForm from '@/component/loginForm'
import { withAuth } from '@/hoc/withAuth'
import React from 'react'

const Login = () => {
  return (
    <LoginForm />
  )
}

export default withAuth(Login)