import { View, Text } from 'react-native'
import React, { useState } from 'react'

interface IngredientListElementProps {
    ingredient: Ingredient
}

const IngredientListElement: React.FC<IngredientListElementProps> = ({ ingredient }) => {

    const [isModiying, setIsModifying] = useState<boolean>(false)

  return (
    <View>
      <Text>IngredientListElement</Text>
    </View>
  )
}

export default IngredientListElement