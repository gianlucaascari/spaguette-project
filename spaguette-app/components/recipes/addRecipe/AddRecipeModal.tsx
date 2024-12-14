import { View, Text, Modal, Button, StyleSheet } from 'react-native'
import React from 'react'

interface RecipeModalProps {
    visible: boolean
    onClose: () => void
}

const AddRecipeModal: React.FC<RecipeModalProps> = ({ visible, onClose }) => {
  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        <Text>RecipeModal</Text>
        <Button title="Close" onPress={onClose}/>
      </View>
    </Modal>
  )
}

export default AddRecipeModal

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});