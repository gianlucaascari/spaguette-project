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
        contentContainer: {
            padding: SPACING.large,
            flex: 1,
        },
        shadowContainer: {
            shadowColor: SHADOWS.color,
            shadowOffset: SHADOWS.offset,
            shadowOpacity: SHADOWS.opacity,
            shadowRadius: SHADOWS.radius,
            elevation: SHADOWS.elevation,
            borderRadius: 10,
            backgroundColor: COLORS.white,
            margin: SPACING.medium,
        },
        container: {
            flexDirection: isMobile ? 'column' : 'row',
            width: isMobile ? WIDTHS.mobileMaxWidth : WIDTHS.desktopMaxWidth,
            borderRadius: 10,
            overflow:'hidden',
        },
        title: {
            fontSize: TYPOGRAPHY.titleSize,
            fontWeight: TYPOGRAPHY.titleWeight,
            marginBottom: SPACING.small,
        },
        image: {
            backgroundColor: COLORS.secondary,
            minWidth: isMobile ? 0 : 200,
            minHeight: isMobile ? 150 : 0,
        }
    })
}