import { StyleSheet } from 'react-native';
import { useContext, useEffect, useState } from 'react';

import { Text, View } from '@/components/Themed';
import { DataContext } from '@/services/data/DataContext';
import { useDataService } from '@/services/data/useDataService';
import { styles } from '@/styles/style';
import IngredientListElement from '@/components/catalogue/show-ingredients/IngredientListElement';
import AddIngredientInput from '@/components/catalogue/modify-ingredients/AddIngredientInput';

export default function TabTwoScreen() {
  const { state } = useContext(DataContext);
  const { getIngredients } = useDataService();

  useEffect(() => {
    getIngredients();
  }, []);

  return (
    <View style={styles.mainContainer}>
          <Text style={styles.title}>Ingredients</Text>

          <AddIngredientInput />
    
          {state.ingredients ? (
            state.ingredients.map((ingredient: Ingredient, index: number) => (
              <IngredientListElement key={index} ingredient={ingredient} />
            ))
          ) : (
            <Text>Loading...</Text>
          )}
    </View>
  );
}
