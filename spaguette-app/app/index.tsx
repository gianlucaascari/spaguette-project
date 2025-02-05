import { View, Text } from 'react-native'
import React from 'react'
import { Redirect, Stack } from 'expo-router'

export default function SplashPage() {

  if (1 == 1) {
    return <Redirect href='/sign-in' />
  }
  else {
    return <Redirect href='/sign-up' />
  }
}