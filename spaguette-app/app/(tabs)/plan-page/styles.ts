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
            flex: 1,
        },
        scrollViewContentStyling: {
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: isMobile ? 'center' : 'flex-start',
            justifyContent: isMobile ? 'flex-start' : 'center',
        },
        planningContainer: {
            marginRight: isMobile ? 0 : 150,
            marginVertical: SPACING.medium,
        },
        planContainer: {
            marginTop: SPACING.medium,
        },
        listContainer: {
            marginVertical: SPACING.medium,
        }
    })
}