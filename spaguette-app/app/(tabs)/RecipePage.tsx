import { ScrollView, StyleSheet } from 'react-native';
import { useContext, useEffect, useState } from 'react';

import { Text, View } from '@/components/Themed';
import { DataContext } from '@/services/data/DataContext';
import { useDataService } from '@/services/data/data-service';
import AddRecipeInput from '@/components/catalogue/modify-recipes/add-recipe-input/AddRecipeInput';
import RecipesListElement from '@/components/catalogue/show-recipes/RecipesListElement';
import { styles } from '@/styles/style';
import Button from '@/components/general/Button';

export default function TabOneScreen() {

  const { state } = useContext(DataContext);
  const { getRecipes } = useDataService();

  const [isAddingRecipe, setAddingRecipe] = useState(false)

  useEffect(() => {
    getRecipes();
  }, []);
  
  return (
    <ScrollView>
    <View style={styles.mainContainer}>

      {isAddingRecipe ?  
        <AddRecipeInput onCancel={() => setAddingRecipe(false)} afterSubmit={() => setAddingRecipe(false)}/> 
        : 
        <Button text='Add New Recipe' onButtonPress={() => setAddingRecipe(true)} style='primary'/>
      }

      {state.recipes ? (
        <View>
          {state.recipes.map((recipe: Recipe, index: number) => <RecipesListElement key={index} recipe={recipe} />)}
        </View>
      ) : (
        <Text>Loading...</Text>
      )}      
    </View>
    </ScrollView>
  );
}
