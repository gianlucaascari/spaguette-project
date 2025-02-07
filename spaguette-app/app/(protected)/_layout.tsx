import { View, Text } from 'react-native'
import React, { ReactNode } from 'react'
import { useAuthService } from '@/services/auth/auth-service'
import { Slot } from 'expo-router'

const ProtectedLayout = ({children} : {children:ReactNode}) => {
    const authService = useAuthService()
    const auth = authService.verifyAuth()
    if (auth) return auth
    
    // return children
    return <Slot/>
}

export default ProtectedLayout