import React, { useState } from 'react'
import IngredientInput from './IngredientInput'
import { useDataService } from '@/services/data/data-service'
import { Ingredient, UnityOfMeasure } from '@/types/Catalogue'
import { Box } from '@/components/ui/box'
import { HStack } from '@/components/ui/hstack'
import { Button, ButtonText } from '@/components/ui/button'

interface AddIngredientInputProps {
    onCancel: () => void,
    afterSubmit: () => void,
}

const AddIngredientInput: React.FC<AddIngredientInputProps> = ({onCancel, afterSubmit}) => {

    const emptyIngredient = {
        id: '',
        name: '',
        unityOfMeasure: UnityOfMeasure.GR,
    }

    const [ingredient, setIngredient] = useState<Ingredient>(emptyIngredient)
    const { addIngredient } = useDataService()

    const onAddIngredientPress = () => {
        // check if the ingredient is empty
        if (ingredient.name === '') {
            alert('Please insert a name for the ingredient')
            return
        }

        // create ingredient input
        const ingredientInput = {
            name: ingredient.name,
            unityOfMeasure: ingredient.unityOfMeasure
        }

        // call data service
        try {
            addIngredient(ingredientInput)
        } catch (e: any) {
            alert('AddIngredientInput> Error adding ingredient\n' + e?.message)
            return
        }

        // reset fields
        setIngredient(emptyIngredient)

        // after submit
        afterSubmit()
    }

  return (
    <Box className='md:flex-row w-full justify-between'>
        <IngredientInput ingredient={ingredient} setIngredient={setIngredient} />

        <HStack className='self-end md:justify-between my-1 md:my-0'>
            <Button className='px-4 mx-4' variant='link' onPress={onCancel} >
                <ButtonText>Cancel</ButtonText>
            </Button>
            <Button className='' variant='solid' onPress={onAddIngredientPress} >
                <ButtonText>Add</ButtonText>
            </Button>
        </HStack>
    </Box>
  )
}

export default AddIngredientInput