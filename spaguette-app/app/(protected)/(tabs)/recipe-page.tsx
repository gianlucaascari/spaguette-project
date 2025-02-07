import { ScrollView, StyleSheet } from 'react-native';
import { useContext, useEffect, useState } from 'react';

import { Text, View } from '@/components/Themed';
import { DataContext } from '@/services/data/DataContext';
import { useDataService } from '@/services/data/data-service';
import AddRecipeInput from '@/components/catalogue/modify-recipes/AddRecipeInput';
import RecipesListElement from '@/components/catalogue/show-recipes/RecipeListElement';
import Button from '@/components/general/Button';
import { useStyles } from '../../../styles/app/(tabs)/recipe-page.style';
import { useAuthService } from '@/services/auth/auth-service';

export default function TabOneScreen() {

  // utilities
  const styles = useStyles()
  const { state } = useContext(DataContext);
  const { getRecipes } = useDataService();

  const [isAddingRecipe, setAddingRecipe] = useState(false)

  useEffect(() => {
    getRecipes();
  }, []);
  
  return (
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollViewContent}>

          {isAddingRecipe ?  
            <AddRecipeInput onCancel={() => setAddingRecipe(false)} afterSubmit={() => setAddingRecipe(false)}/> 
            : 
            <Button text='Add New Recipe' onPress={() => setAddingRecipe(true)} style='primary'/>
          }

          {state.recipes ? (
            <View>
              {state.recipes.map((recipe: Recipe, index: number) => <RecipesListElement key={index} recipe={recipe} />)}
            </View>
          ) : (
            <Text>Loading...</Text>
          )}      
      </ScrollView>
  );
}
