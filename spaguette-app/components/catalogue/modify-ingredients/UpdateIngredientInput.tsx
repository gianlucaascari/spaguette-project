import React, { useState } from 'react'
import IngredientInput from './IngredientInput'
import { useDataService } from '@/services/data/data-service'
import { Ingredient, IngredientInput as IngredientInputType } from '@/types/Catalogue'
import { HStack } from '@/components/ui/hstack'
import { Box } from '@/components/ui/box'
import { Button, ButtonText } from '@/components/ui/button'

interface UpdateIngredientInputProps {
    initialIngredient: Ingredient,
    afterSubmit: () => void,
}

const UpdateIngredientInput: React.FC<UpdateIngredientInputProps> = ({ initialIngredient, afterSubmit }) => {

    const [ingredient, setIngredient] = useState<Ingredient>(initialIngredient)
    const { updateIngredient, deleteIngredient } = useDataService()

    const onUpdateIngredientPress = () => {
        // check if the ingredient is empty
        if (ingredient.name === '') {
            alert('please insert a name for the ingredient')
            return
        }

        // create ingredientInput
        const ingredientInput: IngredientInputType = {
            name: ingredient.name,
            unityOfMeasure: ingredient.unityOfMeasure,
        }

        // call data service
        try {
            updateIngredient(ingredient.id, ingredientInput)
        } catch (e: any) {
            alert('AddIngredientInput> Error adding ingredient\n' + e?.message)
            return
        }

        // call afterSubmit
        afterSubmit()
    }

    const onDeleteIngredientPress = () => {
        // call data service
        try {
            deleteIngredient(ingredient.id)
        } catch (e: any) {
            alert('AddIngredientInput> Error adding ingredient\n' + e?.message)
            return
        }

        // call afterSubmit
        afterSubmit()
    }

  return (
    <Box className='md:flex-row w-full justify-between'>
        <IngredientInput ingredient={ingredient} setIngredient={setIngredient} />

        <HStack className='self-end md:justify-between my-1 md:my-0'>
            <Button className='mx-2' variant='solid' action='negative' onPress={onDeleteIngredientPress} >
                <ButtonText>Delete</ButtonText>
            </Button>
            <Button className='' variant='solid' onPress={onUpdateIngredientPress} >
                <ButtonText>Save</ButtonText>
            </Button>
        </HStack>
    </Box>
  )
}

export default UpdateIngredientInput