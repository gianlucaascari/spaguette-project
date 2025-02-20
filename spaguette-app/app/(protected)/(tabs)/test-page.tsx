import { View, Text } from "react-native";
import React, { useContext } from "react";
import Button from "@/components/general/Button";
import { database } from "@/services/local-storage/database";
import { DataContext } from "@/services/data/DataContext";
import { DbIngredient } from "@/types/database/Catalogue";

const TestPage = () => {

  const { state } = useContext(DataContext);
  console.log(JSON.stringify(state.ingredients, null, 2));

  const onWrite = async () => {
    try {
      await database.write(async () => {
        const recipe = await database.get<DbRecipe>('recipes').create((r) => {
            r.name = 'Pasta Carbonara';
            r.description = 'A classic Italian dish';
            r.stepsLink = 'https://example.com/carbonara';
        });
    
        const ingredient = await database.get<DbIngredient>('ingredients').create((i) => {
            i.name = 'Eggs';
            i.unityOfMeasure = 'pcs';
        });
    
        await database.get<DbIngredientQuantity>('ingredient_quantities').create((iq) => {
            iq.recipe.set(recipe);
            iq.ingredient.set(ingredient);
            iq.quantity = 2;
        });
    });
      alert("Ingredient created");
    } catch (error) {
      alert("Errore: " + error);
    }
  };

  const onRead = async () => {
    try {
        const ingredients = await database.get<DbIngredient>("ingredients").query().fetch();
        const ingredientsData = ingredients.map(ing => ing._raw);
        alert(JSON.stringify(ingredientsData, null, 2));

        // const postData = await database.get<Post>("posts").find('BIeuZsKfHceAaqCi');
        // alert(JSON.stringify(postData._raw, null, 2));
    } catch (error) {
        alert("Errore: " + error);
    }
  };

  const onUpdate = async () => {
    try {
      const ingredientData = await database.get<DbIngredient>("ingredients").find('IrsxawWIsmqk1rRg');
      await database.write(async () => {
        await ingredientData.update((ingredient: DbIngredient) => {
          ingredient.name = "Lore non puzza";
        });
      });
      alert("Post updated");
    } catch (error) {
      alert("Errore: " + error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button text="write" style="primary" onPress={onWrite} />
      <Text>{JSON.stringify(state.ingredients[0], null, 2)}</Text>
      <Button text="read" style="primary" onPress={onRead} />
      <Text>test</Text>
      <Button text="update" style="primary" onPress={onUpdate} />
    </View>
  );
};

export default TestPage;
