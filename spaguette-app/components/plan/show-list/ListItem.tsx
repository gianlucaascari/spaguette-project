import { View, Text } from 'react-native'
import React from 'react'
import { styles } from '@/styles/style'
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useDataService } from '@/services/data/data-service';

interface ListItemProps {
    item: ListItem,
}

const ListItem: React.FC<ListItemProps> = ({ item }) => {

    const { updateListItem } = useDataService()

    const onClickCheckbox = () => {
        updateListItem({
            ingredientID: item.ingredient.id,
            quantity: item.quantity,
            taken: !item.taken,
        })
    }

  return (
    <View style={styles.rowContainer}>
        <BouncyCheckbox 
            isChecked={item.taken}
            useBuiltInState={false}
            onPress={onClickCheckbox}
        />

        <Text style={styles.textInput}>{item.ingredient.name} {item.quantity} {item.ingredient.unityOfMeasure}</Text>
    </View>
  )
}

export default ListItem