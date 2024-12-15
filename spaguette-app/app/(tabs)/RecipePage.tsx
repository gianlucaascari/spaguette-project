import { StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';

import { Text, View } from '@/components/Themed';
import { dataService } from '@/services/data/data-service';
import RecipesList from '@/components/recipes/show-recipes/RecipesList';
import AddRecipeInput from '@/components/recipes/add-recipes/AddRecipeInput';

export default function TabOneScreen() {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);

  useEffect(() => {
    dataService.getRecipes().then(setRecipes);
  }, []);
  
  return (
    <View style={styles.container}>

      <Text style={styles.title}>Recipes</Text>

      <AddRecipeInput />

      {recipes ? (
        <RecipesList recipes={recipes} />
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
});
