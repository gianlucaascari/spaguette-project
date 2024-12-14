import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { apiService } from '@/services/api/api-service';
import { useEffect, useState } from 'react';

export default function TabOneScreen() {
  const [ingredients, setIngredients] = useState<Ingredient[] | null>(null);

  useEffect(() => {
    console.log("Fetching ingredients...");
    apiService.getIngredients().then(setIngredients);
    console.log(ingredients);
  }, []);
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      {ingredients ? (
        ingredients.map((ingredient: Ingredient, index: number) => (
          <Text key={index}>{ingredient.name}</Text>
        ))
      ) : (
        <Text>Loading...</Text>
      )}
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
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
