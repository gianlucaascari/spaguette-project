import React, { useContext, useEffect } from 'react'
import { Redirect } from 'expo-router'
import { ActivityIndicator, Text } from 'react-native'
import { useAuthService } from '@/services/auth/auth-service'
import { AuthContext } from '@/services/auth/AuthContext'
import { View } from '@/components/Themed'

const index = () => {
  const authService = useAuthService()
  const auth = authService.verifyAuth()
  if (auth) return auth

  return <Redirect href='/(protected)/(tabs)/plan-page' />
}

export default index