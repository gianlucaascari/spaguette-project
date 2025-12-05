import React, { useState } from "react";
import { Input, InputField } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
} from "@/components/ui/form-control";
import { AlertCircleIcon } from "lucide-react-native";

interface RecipeHeadingProps {
  name: string;
  setName: (name: string) => void;
  link: string | undefined;
  setLink: (link: string) => void;
}

const RecipeHeadingInput: React.FC<RecipeHeadingProps> = ({
  name,
  setName,
  link,
  setLink,
}) => {
  const [invalidName, setIsInvalidName] = useState(false);

  return (
    <VStack className="w-full mr-4">
      <FormControl isInvalid={invalidName} className="mb-2">
        <Input size="xl">
          <InputField
            className="text-2xl"
            value={name}
            onChangeText={(name) => {
              setName(name);
              if (name.trim() !== "") setIsInvalidName(false);
            }}
            placeholder="Name"
            onBlur={() => setIsInvalidName(name.trim() === "")}
          />
        </Input>
        <FormControlError>
          <FormControlErrorIcon as={AlertCircleIcon} className="text-red-500" />
          <FormControlErrorText className="text-red-500">
            The recipe must have a name
          </FormControlErrorText>
        </FormControlError>
      </FormControl>
      <Input>
        <InputField
          value={link}
          onChangeText={(link) => setLink(link)}
          placeholder="Insert link here..."
        />
      </Input>
    </VStack>
  );
};

export default RecipeHeadingInput;
