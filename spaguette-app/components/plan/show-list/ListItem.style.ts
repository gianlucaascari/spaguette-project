import { COLORS } from "@/styles/const/colors";
import { SHADOWS } from "@/styles/const/shadow";
import { SPACING } from "@/styles/const/spacing";
import { WIDTHS } from "@/styles/const/widths";
import { StyleSheet, useWindowDimensions } from "react-native";

export const useStyles = () => {
    const { width } = useWindowDimensions();
    const isMobile = width < WIDTHS.mobileBreakdown;

    return StyleSheet.create({
        container: {
            flexDirection: 'row',
            padding: SPACING.small,
            marginVertical: SPACING.small,
            shadowColor: SHADOWS.color,
            shadowOffset: SHADOWS.offset,
            shadowOpacity: SHADOWS.opacity,
            shadowRadius: SHADOWS.radius,
            elevation: SHADOWS.elevation,
            borderRadius: 10,
            backgroundColor: COLORS.white,
        },
        quantity: {
            width: WIDTHS.quantity + WIDTHS.unityOfMeasure,
            alignSelf: 'center'
        },
        text: {
            alignSelf: 'center',
            minWidth: 100
        }
    })
}