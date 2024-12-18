import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'

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

const styles = StyleSheet.create({
    container: {
      padding: 10,
    },
    rowContainer: {
        flexDirection: 'row',
        padding: 10,
    },
    button: {
        padding: 10,
        margin: 5,
        borderWidth: 1,
        backgroundColor: 'orange',
    },
    title: {
      fontSize: 14,
      fontWeight: 'bold',
    },
  });