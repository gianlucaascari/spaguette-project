import { ScrollView, StyleSheet } from 'react-native';
import { useContext, useEffect, useState } from 'react';

import { Text, View } from '@/components/Themed';
import RecipesList from '@/components/recipes/show-recipes/RecipesList';
import { DataContext } from '@/services/data/DataContext';
import { useDataService } from '@/services/data/useDataService';
import AddRecipeInput from '@/components/recipes/modify-recipes/AddRecipeInput';

export default function TabOneScreen() {

  const { state } = useContext(DataContext);
  const { getRecipes } = useDataService();

  useEffect(() => {
    getRecipes();
  }, []);
  
  return (
    <ScrollView>
    <View style={styles.container}>

      <Text style={styles.title}>Recipes</Text>

      <AddRecipeInput />

      {state.recipes ? (
        <RecipesList recipes={state.recipes} />
      ) : (
        <Text>Loading...</Text>
      )}      
    </View>
    </ScrollView>
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
