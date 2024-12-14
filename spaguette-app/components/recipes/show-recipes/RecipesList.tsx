import { View, Text } from 'react-native'
import React from 'react'
import RecipesListElement from './RecipesListElement'

interface RecipesListProps {
  recipes: Recipe[];
}

const RecipesList: React.FC<RecipesListProps> = ({ recipes }) => {
  return (
    <View>
      {recipes.map((recipe: Recipe, index: number) => <RecipesListElement key={index} recipe={recipe} />)}
    </View>
  )
}

export default RecipesList