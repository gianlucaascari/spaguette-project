import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import Button from '@/components/general/Button'
import { useStyles } from './IngredientListElementShow.style'

interface IngredientListElementShowProps {
    ingredient: Ingredient,
    setIsModifying: (b: boolean) => void,
}

const IngredientListElementShow: React.FC<IngredientListElementShowProps> = ({ ingredient, setIsModifying }) => {

  const styles = useStyles()

  return (
    <View style={styles.shadowContainer}>
      <View style={styles.container}>
          <Text style={styles.ingredientName}>{ingredient.name}</Text>
          <Text style={styles.UdM}>{ingredient.unityOfMeasure}</Text>
          <Button text='Modify' style='tertiary' onButtonPress={() => setIsModifying(true)} />
      </View>
    </View>
  )
}

export default IngredientListElementShow