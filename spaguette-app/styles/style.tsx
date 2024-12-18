import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      margin: 10,
    },
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    rowContainer: {
        flexDirection: 'row',
    },
    button: {
        padding: 10,
        margin: 5,
        borderWidth: 1,
        backgroundColor: 'orange',
    },
    textInput: {
        padding: 10,
        margin: 5,
        borderWidth: 1,
        borderColor: 'black',
    },
    title: {
      fontSize: 14,
      fontWeight: 'bold',
    },
  });