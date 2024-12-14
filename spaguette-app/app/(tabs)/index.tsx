import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import { apiService } from '@/services/api/api-service';
import { useEffect, useState } from 'react';
import { dataService } from '@/services/data/data-service';

export default function TabOneScreen() {
  const [ingredients, setIngredients] = useState<Ingredient[] | null>(null);
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);

  useEffect(() => {
    dataService.getIngredients().then(setIngredients);
    dataService.getRecipes().then(setRecipes);
  }, []);
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ingredients</Text>

      {ingredients ? (
        ingredients.map((ingredient: Ingredient, index: number) => (
          <Text key={index}>{ingredient.name}</Text>
        ))
      ) : (
        <Text>Loading...</Text>
      )}

      <Text style={styles.title}>Recipes</Text>

      {recipes ? (
        recipes.map((recipe: Recipe, index: number) => (
          <Text key={index}>{recipe.name}</Text>
        ))
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
