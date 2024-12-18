import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native'
import React from 'react'
import RecipeIngredientsInput from './RecipeIngredientsInput'
import { styles } from '@/styles/style'

interface RecipeInputProps {
    recipe: Recipe,
    setRecipe: (recipe: Recipe) => void,
}

const RecipeInput: React.FC<RecipeInputProps> = ({ recipe, setRecipe }) => {
  return (
    <View style={styles.rowContainer}>
        <TextInput 
            style={styles.textInput} 
            placeholder="Name" 
            value={recipe.name} 
            onChangeText={(text) => setRecipe({ ...recipe, name: text })} 
            />

        <TextInput 
            style={styles.textInput} 
            placeholder="Description" 
            value={recipe.description || ''} 
            onChangeText={(text) => setRecipe({ ...recipe, description: text })} 
            />

        <TextInput 
            style={styles.textInput} 
            placeholder="Steps Link" 
            value={recipe.stepsLink || ''} 
            onChangeText={(text) => setRecipe({ ...recipe, stepsLink: text })} 
            />

        <RecipeIngredientsInput ingredients={recipe.ingredients} setIngredients={(ingredients) => setRecipe({ ...recipe, ingredients: ingredients})} />
    </View>
  )
}

export default RecipeInput