import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { styles } from '@/styles/style';

interface PlanListElementShowProps {
    planElement: RecipeQuantity;
    setIsModifying: (isModifying: boolean) => void;
}

const PlanListElementShow: React.FC<PlanListElementShowProps> = ({ planElement, setIsModifying }) => {
  return (
    <View style={styles.rowContainer}>
        <Text style={styles.textInput}>{planElement.recipe.name}</Text>
        <Text style={styles.textInput}>{planElement.numTimes}</Text>

        <Pressable style={styles.button} onPress={() => setIsModifying(true)}>
            <Text>Modify</Text>
        </Pressable>
    </View>
  )
}

export default PlanListElementShow