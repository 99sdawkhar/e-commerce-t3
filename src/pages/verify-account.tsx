import VerifyUser from '@/component/verifyUser'
import { withAuth } from '@/hoc/withAuth'
import React from 'react'

const VerifyAccount = () => {
  return (
    <VerifyUser />
  )
}

export default withAuth(VerifyAccount)