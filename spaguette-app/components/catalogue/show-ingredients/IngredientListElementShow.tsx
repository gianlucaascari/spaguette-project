import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import Button from '@/components/general/Button'
import { useStyles } from '../../../styles/components/catalogue/show-ingredients/IngredientListElementShow.style'
import { Ingredient } from '@/types/Catalogue'

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
          <Text style={styles.UdM}>{ingredient.unityOfMeasure.toLowerCase()}</Text>
          <Button text='Modify' style='tertiary' onPress={() => setIsModifying(true)} />
      </View>
    </View>
  )
}

export default IngredientListElementShow