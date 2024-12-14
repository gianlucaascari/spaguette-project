import { StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';

import { Text, View } from '@/components/Themed';
import { dataService } from '@/services/data/data-service';
import RecipesList from '@/components/recipes/showRecipes/RecipesList';
import AddRecipeButton from '@/components/recipes/addRecipe/AddRecipeButton';
import AddRecipeModal from '../../components/recipes/addRecipe/AddRecipeModal';

export default function TabOneScreen() {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
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

      <AddRecipeButton onPress={() => setIsModalVisible(true)} />
      <AddRecipeModal  onClose={() => setIsModalVisible(false)} visible={isModalVisible} />
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
