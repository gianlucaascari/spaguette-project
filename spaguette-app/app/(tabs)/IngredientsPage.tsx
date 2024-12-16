import { StyleSheet } from 'react-native';
import { useContext, useEffect, useState } from 'react';

import { Text, View } from '@/components/Themed';
import { DataContext } from '@/services/data/DataContext';
import { useDataService } from '@/services/data/useDataService';

export default function TabTwoScreen() {
  const { state } = useContext(DataContext);
  const { getIngredients } = useDataService();

  useEffect(() => {
    getIngredients();
  }, []);

  return (
    <View style={styles.container}>
          <Text style={styles.title}>Ingredients</Text>
    
          {state.ingredients ? (
            state.ingredients.map((ingredient: Ingredient, index: number) => (
              <Text key={index}>{ingredient.name}</Text>
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
