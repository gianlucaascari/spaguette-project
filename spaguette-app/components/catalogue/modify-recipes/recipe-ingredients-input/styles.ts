import { SPACING } from "@/styles/spacing";
import { StyleSheet, useWindowDimensions } from "react-native";

export const useStyles = () => {
    const { width } = useWindowDimensions();
    const isMobile = width < 768;

    return StyleSheet.create({
        container: {
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        containerInput: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: isMobile ? SPACING.medium : SPACING.large,
            paddingRight: isMobile ? 12 : 0,
        },
        buttonsContainer: {
            alignSelf: 'flex-end',
            flexDirection: 'row',
        },
        quantityContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: SPACING.small,
        },
        quantityInput: {
            marginVertical: SPACING.small,
            width: 40,
            marginRight: 10,
        },
        ingredientInput: {
            marginVertical: SPACING.small,
            width: isMobile ? 200 : 250,
        },
        text: {
            width: 20,
        }
    })
}