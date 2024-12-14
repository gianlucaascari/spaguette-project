import { View, Text, Button } from 'react-native'
import React from 'react'

interface RecipeAddButtonProps {
    onPress: () => void
}

const RecipeAddButton: React.FC<RecipeAddButtonProps> = ({ onPress }) => {
  return (
    <Button title="Add Recipe" onPress={onPress}/>
  )
}

export default RecipeAddButton