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
            width: isMobile ? WIDTHS.mobileDropdown : WIDTHS.desktopDropdown,
            marginRight: SPACING.large,
        },
        quantityInput: {
            width: WIDTHS.quantity,
        }
    })
}