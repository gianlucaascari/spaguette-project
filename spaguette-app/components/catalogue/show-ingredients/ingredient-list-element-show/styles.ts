import { COLORS } from "@/styles/colors";
import { SHADOWS } from "@/styles/shadow";
import { SPACING } from "@/styles/spacing";
import { TYPOGRAPHY } from "@/styles/typography";
import { WIDTHS } from "@/styles/widths";
import { StyleSheet, useWindowDimensions } from "react-native";

export const useStyles = () => {
    const { width } = useWindowDimensions();
    const isMobile = width < WIDTHS.mobileBreakdown;

    return StyleSheet.create({
        shadowContainer: {
            shadowColor: SHADOWS.color,
            shadowOffset: SHADOWS.offset,
            shadowOpacity: SHADOWS.opacity,
            shadowRadius: SHADOWS.radius,
            elevation: SHADOWS.elevation,
            borderRadius: 10,
            backgroundColor: COLORS.white,
            marginVertical: SPACING.medium,

        },
        container: {
            flexDirection: 'row',
            width: isMobile ? WIDTHS.mobileMaxWidth : WIDTHS.desktopMaxWidth,
            margin: SPACING.medium,
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        ingredientName: {
            flex: 3,
            fontSize: TYPOGRAPHY.subtitleSize,
            fontWeight: TYPOGRAPHY.subtitleWeight,
            marginLeft: 10,
        },
        UdM: {
            flex: 1,
        }
    })
}