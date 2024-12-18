import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { styles } from '@/styles/style'

interface IngredientListElementShowProps {
    ingredient: Ingredient,
    setIsModifying: (b: boolean) => void,
}

const IngredientListElementShow: React.FC<IngredientListElementShowProps> = ({ ingredient, setIsModifying }) => {
  return (
    <View>
        <Text>{ingredient.name + " " + ingredient.unityOfMeasure}</Text>

        <Pressable style={styles.button} onPress={() => setIsModifying(true)}>
            <Text>Modify</Text>
        </Pressable>
    </View>
  )
}

export default IngredientListElementShow