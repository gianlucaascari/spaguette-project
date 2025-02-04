import { ScrollView } from 'react-native';
import { useContext, useEffect, useState } from 'react';

import { Text, View } from '@/components/Themed';
import { DataContext } from '@/services/data/DataContext';
import { useDataService } from '@/services/data/data-service';
import IngredientListElement from '@/components/catalogue/show-ingredients/IngredientListElement';
import AddIngredientInput from '@/components/catalogue/modify-ingredients/add-ingredient-input/AddIngredientInput';
import Button from '@/components/general/Button';
import { useStyles } from './styles';

export default function TabTwoScreen() {

  const styles = useStyles()

  const [isAddingIngredient, setIsAddingIngredient] = useState(false)

  const { state } = useContext(DataContext);
  const { getIngredients } = useDataService();

  useEffect(() => {
    getIngredients();
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>

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
