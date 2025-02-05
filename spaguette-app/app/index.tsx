import { View, Text } from 'react-native'
import React from 'react'
import { Redirect, Stack } from 'expo-router'

export default function SplashPage() {

  return (
      <Redirect href='/sign-in' />
  )
}