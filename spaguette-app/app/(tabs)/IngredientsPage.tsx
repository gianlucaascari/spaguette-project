import { ScrollView, StyleSheet } from 'react-native';
import { useContext, useEffect, useState } from 'react';

import { Text, View } from '@/components/Themed';
import { DataContext } from '@/services/data/DataContext';
import { useDataService } from '@/services/data/data-service';
import { styles } from '@/styles/style';
import IngredientListElement from '@/components/catalogue/show-ingredients/IngredientListElement';
import AddIngredientInput from '@/components/catalogue/modify-ingredients/add-ingredient-input/AddIngredientInput';
import Button from '@/components/general/Button';

export default function TabTwoScreen() {

  const [isAddingIngredient, setIsAddingIngredient] = useState(false)

  const { state } = useContext(DataContext);
  const { getIngredients } = useDataService();

  useEffect(() => {
    getIngredients();
  }, []);

  return (
    <ScrollView>
      <View style={styles.mainContainer}>

            {
              isAddingIngredient ?
              <AddIngredientInput onCancel={() => setIsAddingIngredient(false)} afterSubmit={() => setIsAddingIngredient(false)}/> :
              <Button text='Add New Ingredient' style='primary' onButtonPress={() => setIsAddingIngredient(true)} />
            }
      
            {state.ingredients ? (
              state.ingredients.map((ingredient: Ingredient, index: number) => (
                <IngredientListElement key={index} ingredient={ingredient} />
              ))
            ) : (
              <Text>Loading...</Text>
            )}
      </View>
    </ScrollView>
  );
}
