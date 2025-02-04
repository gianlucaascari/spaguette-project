import { COLORS } from "@/styles/colors";
import { SPACING } from "@/styles/spacing";
import { WIDTHS } from "@/styles/widths";
import { StyleSheet, useWindowDimensions } from "react-native";

export const useStyles = () => {
    const { width } = useWindowDimensions();
    const isMobile = width < WIDTHS.mobileBreakdown;

    return StyleSheet.create({
        container: {
            padding: SPACING.medium,
            backgroundColor: COLORS.background,
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
        }
    })
}