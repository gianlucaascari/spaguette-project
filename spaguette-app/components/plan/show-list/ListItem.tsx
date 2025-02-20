import { View, Text } from 'react-native'
import React from 'react'
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useDataService } from '@/services/data/data-service';
import { useStyles } from '../../../styles/components/plan/show-list/ListItem.style';
import { ListItem as ListItemType } from '@/types/application/Plan';

interface ListItemProps {
    item: ListItemType,
}

const ListItem: React.FC<ListItemProps> = ({ item }) => {

    const styles = useStyles()

    const { updateListItem } = useDataService()

    const onClickCheckbox = () => {
        updateListItem({
            ingredientID: item.ingredient.id,
            quantity: item.quantity,
            taken: !item.taken,
        })
    }

  return (
    <View style={styles.container}>
        <BouncyCheckbox 
            isChecked={item.taken}
            useBuiltInState={false}
            onPress={onClickCheckbox}
        />

        <Text style={styles.quantity}>{item.quantity} {item.ingredient.unityOfMeasure}</Text>
        <Text style={styles.text}>{item.ingredient.name} </Text>
    </View>
  )
}

export default ListItem