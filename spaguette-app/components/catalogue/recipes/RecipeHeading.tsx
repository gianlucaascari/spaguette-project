import React from "react";
import { Recipe } from "@/types/Catalogue";
import { Heading } from "@/components/ui/heading";
import { Link } from "@/components/ui/link";
import { GlobeIcon, Icon } from "@/components/ui/icon";
import { HStack } from "@/components/ui/hstack";

interface RecipeHeadingProps {
  recipe: Recipe;
}

const RecipeHeading: React.FC<RecipeHeadingProps> = ({ recipe }) => {
  return (
    <HStack className="items-center mr-8">
      <Heading size="3xl" className="">
        {recipe?.name}
      </Heading>

      {recipe?.stepsLink ? (
        <Link href={recipe?.stepsLink} isExternal>
          <Icon size="xl" as={GlobeIcon} className="ml-4 color-blue-400" />
        </Link>
      ) : (
        <Icon size="xl" as={GlobeIcon} className="ml-4 color-background-300" />
      )}
    </HStack>
  );
};

export default RecipeHeading;
