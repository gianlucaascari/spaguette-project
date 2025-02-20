import { View, Text } from 'react-native'
import React, { useState } from 'react'
import IngredientListElementShow from './IngredientListElementShow'
import UpdateIngredientInput from '../modify-ingredients/UpdateIngredientInput'
import { Ingredient } from '@/types/application/Catalogue'

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