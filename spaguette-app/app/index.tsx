import React, { useContext, useEffect } from 'react'
import { Redirect } from 'expo-router'
import { Text } from 'react-native'
import { useAuthService } from '@/services/auth/auth-service'
import { AuthContext } from '@/services/auth/AuthContext'

const index = () => {
  // check authentication
  const authService = useAuthService()
  const { authState } = useContext(AuthContext)

  useEffect(() => {
    authService.isAuthenticated()
  }, [])

  if (!authState.loading && authState.user) return <Redirect href='/(tabs)/plan-page' />
  if (!authState.loading && !authState.user) return <Redirect href='/(auth)/sign-in' />

  return <Redirect href='/(auth)/sign-in' />
}

export default index