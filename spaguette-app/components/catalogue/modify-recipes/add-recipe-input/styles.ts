import { SPACING } from "@/styles/spacing";
import { WIDTHS } from "@/styles/widths";
import { StyleSheet, useWindowDimensions } from "react-native";

export const useStyles = () => {
    const { width } = useWindowDimensions();
    const isMobile = width < WIDTHS.mobileBreakdown;

    return StyleSheet.create({
        container: {
            margin: isMobile ? SPACING.medium : SPACING.large,
            width: isMobile ? WIDTHS.mobileMaxWidth : WIDTHS.desktopMaxWidth,
        },
        buttonsContainer: {
            alignSelf: 'flex-end',
            flexDirection: 'row',
        },
    })
}