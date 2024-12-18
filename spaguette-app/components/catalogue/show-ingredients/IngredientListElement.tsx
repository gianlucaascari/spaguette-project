import { View, Text } from 'react-native'
import React, { useState } from 'react'
import IngredientListElementShow from './IngredientListElementShow'

interface IngredientListElementProps {
    ingredient: Ingredient
}

const IngredientListElement: React.FC<IngredientListElementProps> = ({ ingredient }) => {

    const [isModiying, setIsModifying] = useState<boolean>(false)

  return (
    <View>
      {
        isModiying ?
        <Text> TODO </Text>
        :
        <IngredientListElementShow ingredient={ingredient} setIsModifying={setIsModifying} />
      }
    </View>
  )
}

export default IngredientListElement