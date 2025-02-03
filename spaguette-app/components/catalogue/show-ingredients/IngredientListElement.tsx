import { View, Text } from 'react-native'
import React, { useState } from 'react'
import IngredientListElementShow from './ingredient-list-element-show/IngredientListElementShow'
import UpdateIngredientInput from '../modify-ingredients/update-ingredient-input/UpdateIngredientInput'

interface IngredientListElementProps {
    ingredient: Ingredient
}

const IngredientListElement: React.FC<IngredientListElementProps> = ({ ingredient }) => {

    const [isModiying, setIsModifying] = useState<boolean>(false)

  return (
    <View>
      {
        isModiying ?
        <UpdateIngredientInput initialIngredient={ingredient} afterSubmit={() => setIsModifying(false)} />
        :
        <IngredientListElementShow ingredient={ingredient} setIsModifying={setIsModifying} />
      }
    </View>
  )
}

export default IngredientListElement