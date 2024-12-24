import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { styles } from '@/styles/style'
import { useDataService } from '@/services/data/data-service';

const PlanPage = () => {

    const { getMyPlan } = useDataService();

    useEffect(() => {
        getMyPlan();
    }, []);

  return (
    <View style={styles.container}>
      <Text>PlanPage</Text>
    </View>
  )
}

export default PlanPage