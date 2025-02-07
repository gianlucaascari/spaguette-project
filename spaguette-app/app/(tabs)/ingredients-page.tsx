import { ScrollView } from 'react-native';
import { useContext, useEffect, useState } from 'react';

import { Text, View } from '@/components/Themed';
import { DataContext } from '@/services/data/DataContext';
import { useDataService } from '@/services/data/data-service';
import IngredientListElement from '@/components/catalogue/show-ingredients/IngredientListElement';
import AddIngredientInput from '@/components/catalogue/modify-ingredients/AddIngredientInput';
import Button from '@/components/general/Button';
import { useStyles } from '../../styles/(tabs)/ingredients-page.style';
import { useAuthService } from '@/services/auth/auth-service';

export default function TabTwoScreen() {
  // check authentication
  const authService = useAuthService()
  authService.verifyAuth()

  // utilities
  const styles = useStyles()
  const { state } = useContext(DataContext);
  const { getIngredients } = useDataService();

  const [isAddingIngredient, setIsAddingIngredient] = useState(false)

  useEffect(() => {
    getIngredients();
  }, []);

  return (
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollViewContent}>
        {
          isAddingIngredient ?
          <AddIngredientInput onCancel={() => setIsAddingIngredient(false)} afterSubmit={() => setIsAddingIngredient(false)}/> :
          <Button text='Add New Ingredient' style='primary' onPress={() => setIsAddingIngredient(true)} />
        }

        {state.ingredients ? (
          state.ingredients.map((ingredient: Ingredient, index: number) => (
            <IngredientListElement key={index} ingredient={ingredient} />
          ))
        ) : (
          <Text>Loading...</Text>
        )}
      </ScrollView>
  );
}
