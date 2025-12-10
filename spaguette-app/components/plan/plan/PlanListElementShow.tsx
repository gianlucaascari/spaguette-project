import React from 'react'
import { RecipeQuantity } from '@/types/Plan';
import { Text } from '@/components/ui/text';
import { HStack } from '@/components/ui/hstack';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { Pencil } from 'lucide-react-native';

interface PlanListElementShowProps {
    planElement: RecipeQuantity;
    setIsModifying: (isModifying: boolean) => void;
}

const PlanListElementShow: React.FC<PlanListElementShowProps> = ({ planElement, setIsModifying }) => {

  return (
    <HStack className='w-full py-1 px-3 items-center'>
        <Text className="min-w-32 flex-[4] line-clamp-1 mr-2">{planElement.recipe.name}</Text>
        <Text className="min-w-16 max-w-20 mr-2 flex-[1]">{planElement.numTimes}</Text>

        <Button variant="link" onPress={() => setIsModifying(true)}>
          <ButtonIcon className="mx-4 " as={Pencil} />
        </Button>
    </HStack>
  )
}

export default PlanListElementShow