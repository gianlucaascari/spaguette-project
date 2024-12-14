import { StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';

import { Text, View } from '@/components/Themed';
import { dataService } from '@/services/data/data-service';
import RecipesList from '@/components/recipes/showRecipes/RecipesList';
import RecipeAddButton from '@/components/recipes/addRecipe/RecipeAddButton';

export default function TabOneScreen() {
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);

  useEffect(() => {
    dataService.getRecipes().then(setRecipes);
  }, []);
  
  return (
    <View style={styles.container}>

      <Text style={styles.title}>Recipes</Text>

      {recipes ? (
        <RecipesList recipes={recipes} />
      ) : (
        <Text>Loading...</Text>
      )}

      <RecipeAddButton onPress={() => {
        alert('Add Recipe button pressed');
      }} />
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
