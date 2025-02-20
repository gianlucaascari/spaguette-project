import { View, Text, Pressable } from 'react-native'
import React from 'react'
import Button from '@/components/general/Button';
import { useStyles } from '../../../styles/components/plan/show-plan/PlanListElementShow.style';
import { RecipeQuantity } from '@/types/application/Plan';

interface PlanListElementShowProps {
    planElement: RecipeQuantity;
    setIsModifying: (isModifying: boolean) => void;
}

const PlanListElementShow: React.FC<PlanListElementShowProps> = ({ planElement, setIsModifying }) => {

  const styles = useStyles()

  return (
    <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{planElement.recipe.name}</Text>
          <Text style={styles.quantity}>{planElement.numTimes}</Text>
        </View>

        <Button text='Modify' style='tertiary' onPress={() => setIsModifying(true)} />
    </View>
  )
}

export default PlanListElementShow