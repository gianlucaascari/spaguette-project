import React from "react";
import { useDataService } from "@/services/data/data-service";
import { ListItem as ListItemType } from "@/types/Plan";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import {
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from "@/components/ui/checkbox";
import { CheckIcon } from "@/components/ui/icon";
import { Divider } from "@/components/ui/divider";
import { Box } from "@/components/ui/box";

interface ListItemProps {
  item: ListItemType;
}

const ListItem: React.FC<ListItemProps> = ({ item }) => {
  const { updateListItem } = useDataService();

  const onClickCheckbox = () => {
    updateListItem({
      ingredientID: item.ingredient.id,
      quantity: item.quantity,
      taken: !item.taken,
    });
  };

  return (
    <Box>
      <HStack className="p-2 w-full">
        <Checkbox
          isDisabled={false}
          isInvalid={false}
          size="md"
          value={item.ingredient.id}
          onChange={onClickCheckbox}
          isChecked={item.taken}
          className="w-full"
        >
          <CheckboxIndicator className="mr-2">
            <CheckboxIcon as={CheckIcon} />
          </CheckboxIndicator>
          <CheckboxLabel className="min-w-10 flex-[1]">
            {item.quantity}
          </CheckboxLabel>
          <CheckboxLabel className="min-w-10 flex-[1]">
            {item.ingredient.unityOfMeasure.toLowerCase()}
          </CheckboxLabel>
          <CheckboxLabel className="flex-[4]">{item.ingredient.name}</CheckboxLabel>
        </Checkbox>

        <Text></Text>
        <Text> </Text>
      </HStack>

      <Divider />
    </Box>
  );
};

export default ListItem;
