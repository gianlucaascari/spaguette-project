import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native'
import React from 'react'
import RecipeIngredientsInput from './RecipeIngredientsInput'
import { useStyles } from '../../../styles/components/catalogue/modify-recipes/RecipeInput.style'
import { COLORS } from '@/styles/const/colors'
import { Recipe } from '@/types/Catalogue'

interface RecipeInputProps {
    recipe: Recipe,
    setRecipe: (recipe: Recipe) => void,
}

const RecipeInput: React.FC<RecipeInputProps> = ({ recipe, setRecipe }) => {

    const styles = useStyles();

  return (
    <View style={styles.container}>
        <TextInput 
            style={styles.titleInput} 
            placeholder="Name"
            placeholderTextColor={COLORS.placeholder}
            value={recipe.name} 
            onChangeText={(text) => setRecipe({ ...recipe, name: text })} 
            selectionColor="transparent"
            />

        <TextInput 
            style={styles.textInput} 
            placeholder="Steps Link" 
            placeholderTextColor={COLORS.placeholder}
            value={recipe.stepsLink || ''} 
            onChangeText={(text) => setRecipe({ ...recipe, stepsLink: text })} 
            selectionColor="transparent"
            />

        <TextInput 
            style={styles.textAreaInput} 
            placeholder="Description" 
            placeholderTextColor={COLORS.placeholder}
            value={recipe.description || ''} 
            onChangeText={(text) => setRecipe({ ...recipe, description: text })} 
            multiline
            selectionColor="transparent"
            />

        <RecipeIngredientsInput ingredients={recipe.ingredients} setIngredients={(ingredients) => setRecipe({ ...recipe, ingredients: ingredients})} />
    </View>
  )
}

export default RecipeInput