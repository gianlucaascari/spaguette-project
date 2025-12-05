import React from "react";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Recipe } from "@/types/Catalogue";
import { Text } from "@/components/ui/text";

interface IngredientSectionProps {
  recipe: Recipe;
}

const IngredientsSection: React.FC<IngredientSectionProps> = ({ recipe }) => {
  return (
    <Card variant="filled" className="mb-6">
      <Heading className="mb-1">Ingredients</Heading>
      
      {recipe?.ingredients.map(({ ingredient, quantity }, index) => (
        <Text key={index}>
          {quantity} {ingredient.unityOfMeasure} of {ingredient.name}
        </Text>
      ))}
    </Card>
  );
};

export default IngredientsSection;
