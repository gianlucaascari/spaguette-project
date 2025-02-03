import { SPACING } from "@/styles/spacing";
import { WIDTHS } from "@/styles/widths";
import { StyleSheet, useWindowDimensions } from "react-native";

export const useStyles = () => {
    const { width } = useWindowDimensions();
    const isMobile = width < WIDTHS.mobileBreakdown;

    return StyleSheet.create({
        container: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: SPACING.medium,
        },
        recipeSelector: {
            width: isMobile ? 200 : 250,
            marginRight: SPACING.large,
        },
        quantityInput: {
            width: 40,
        }
    })
}