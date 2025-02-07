import React from 'react'
import { Redirect } from 'expo-router'
import { useAuthService } from '@/services/auth/auth-service'

const index = () => {
  const authService = useAuthService()
  const auth = authService.verifyAuth()
  if (auth) return auth

  return <Redirect href='/(protected)/(tabs)/plan-page' />
}

export default index