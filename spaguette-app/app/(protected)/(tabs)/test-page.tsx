import { View, Text } from "react-native";
import React, { useContext } from "react";
import Button from "@/components/general/Button";
import { database } from "@/services/local-storage/database";
import { DataContext } from "@/services/data/DataContext";
import { DbIngredient, DbIngredientQuantity, DbRecipe } from "@/types/database/Catalogue";
import { Recipe, UnityOfMeasure } from "@/types/application/Catalogue";

const TestPage = () => {

  const { state } = useContext(DataContext);

  const onWrite = async () => {
    try {
      await database.write(async () => {
        const recipe = await database.get<DbRecipe>('recipes').create((r) => {
            r.name = 'Pasta Carbonara';
            r.stepsLink = 'https://example.com/carbonara';
        });
    
        const ingredient = await database.get<DbIngredient>('ingredients').create((i) => {
            i.name = 'Eggs';
            i.unityOfMeasure = UnityOfMeasure.PC;
        });
    
        await database.get<DbIngredientQuantity>('ingredient_quantities').create((iq) => {
            iq.recipe.set(recipe);
            iq.ingredient.set(ingredient);
            iq.quantity = 2;
        });
    });
      alert("Recipe created");
    } catch (error) {
      alert("Errore: " + error);
    }
  };

  const onRead = async () => {
    try {
      const dbRecipes: DbRecipe[] = await database.get<DbRecipe>("recipes").query().fetch();
      const recipes: Recipe[] = await Promise.all(dbRecipes.map(async (r: DbRecipe) => {
        const ingredientQuantities: DbIngredientQuantity[] = await r.ingredientQuantities;
        return {
          id: r.remoteId,
          name: r.name,
          description: r.description,
          stepsLink: r.stepsLink,
          ingredients: await Promise.all(ingredientQuantities.map(async (iq: DbIngredientQuantity) => {
            const ingredient: DbIngredient = await iq.ingredient;
            return {
              ingredient: {
                id: ingredient.remoteId,
                name: ingredient.name,
                unityOfMeasure: ingredient.unityOfMeasure,
              },
              quantity: iq.quantity,
            };
          }))
        };
      }));

      alert(JSON.stringify(recipes, null, 2));

      // const ingredients: DbIngredient[] = await database.get<DbIngredient>("ingredients").query().fetch();
      // const ingredientsData = ingredients.map(i => i._raw)
      // console.log(JSON.stringify(ingredientsData, null, 2));
      // alert(JSON.stringify(ingredientsData, null, 2));
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
