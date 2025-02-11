import { SPACING } from "@/styles/const/spacing";
import { WIDTHS } from "@/styles/const/widths";
import { StyleSheet, useWindowDimensions } from "react-native";

export const useStyles = () => {
    const { width } = useWindowDimensions();
    const isMobile = width < WIDTHS.mobileBreakdown;

    return StyleSheet.create({
        container: {
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        containerInput: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: isMobile ? SPACING.medium : SPACING.large,
            paddingRight: isMobile ? SPACING.medium : 0,
        },
        quantityContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: SPACING.small,
        },
        quantityInput: {
            marginVertical: SPACING.small,
            width: WIDTHS.quantity,
            marginRight: SPACING.medium,
        },
        ingredientInput: {
            marginVertical: SPACING.small,
            width: isMobile ? WIDTHS.mobileInputMedium : WIDTHS.mobileInputMedium,
        },
        text: {
            width: 20,
        }
    })
}