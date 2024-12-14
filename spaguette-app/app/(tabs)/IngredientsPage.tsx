import { StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';

import { Text, View } from '@/components/Themed';
import { dataService } from '@/services/data/data-service';

export default function TabTwoScreen() {
  const [ingredients, setIngredients] = useState<Ingredient[] | null>(null);


  useEffect(() => {
    dataService.getIngredients().then(setIngredients);
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
