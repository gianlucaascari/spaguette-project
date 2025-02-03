import { COLORS } from "@/styles/colors";
import { SPACING } from "@/styles/spacing";
import { WIDTHS } from "@/styles/widths";
import { StyleSheet, useWindowDimensions } from "react-native";

export const useStyles = () => {
    const { width } = useWindowDimensions();
    const isMobile = width < WIDTHS.mobileBreakdown;

    return StyleSheet.create({
        container: {
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: isMobile ? 'center' : 'flex-start',
            justifyContent: isMobile ? 'flex-start' : 'center',
            padding: SPACING.medium,
            backgroundColor: COLORS.background,
            flex: 1,
        },
        planContainer: {
            marginRight: isMobile ? 0 : 150,
            marginVertical: SPACING.medium,
        },
        listContainer: {
            marginVertical: SPACING.medium,
        }
    })
}