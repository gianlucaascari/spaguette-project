import React, { useState } from 'react'
import IngredientListElementShow from './IngredientListElementShow'
import UpdateIngredientInput from '../modify-ingredients/UpdateIngredientInput'
import { Ingredient } from '@/types/Catalogue'
import { Box } from '@/components/ui/box'
import { Divider } from '@/components/ui/divider'
import { VStack } from '@/components/ui/vstack'

interface IngredientListElementProps {
    ingredient: Ingredient
}

const IngredientListElement: React.FC<IngredientListElementProps> = ({ ingredient }) => {

    const [isModiying, setIsModifying] = useState<boolean>(false)

  return (
    <VStack className='w-full'>
      <Box className='py-1'>
      {
        isModiying ?
        <UpdateIngredientInput initialIngredient={ingredient} afterSubmit={() => setIsModifying(false)} />
        :
        <IngredientListElementShow ingredient={ingredient} setIsModifying={setIsModifying} />
      }
      </Box>
      <Divider />
    </VStack>
  )
}

export default IngredientListElement