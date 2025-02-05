import { COLORS } from "@/styles/colors"
import { SHADOWS } from "@/styles/shadow"
import { SPACING } from "@/styles/spacing"
import { TYPOGRAPHY } from "@/styles/typography"
import { WIDTHS } from "@/styles/widths"
import { TypeOrFieldNameRegExp } from "@apollo/client/cache/inmemory/helpers"
import { StyleSheet, useWindowDimensions } from "react-native"


export const useStyles = () => {
    const { width } = useWindowDimensions()
    const isMobile = width < WIDTHS.mobileBreakdown

    return StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        formContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            padding: SPACING.large,
            shadowColor: SHADOWS.color,
            shadowOffset: SHADOWS.offset,
            shadowOpacity: SHADOWS.opacity,
            shadowRadius: SHADOWS.radius,
            elevation: SHADOWS.elevation,
            backgroundColor: COLORS.background
        },
        inputContainer: {
            marginVertical: SPACING.medium
        },
        title: {
            fontWeight: TYPOGRAPHY.titleWeight,
            fontSize: TYPOGRAPHY.titleSize,
            marginVertical: SPACING.medium
        },
        textInput: {
            padding: SPACING.medium,
            marginBottom: SPACING.medium,
            backgroundColor: COLORS.white,
            width: isMobile ? WIDTHS.mobileInputLarge : WIDTHS.desktopInputMedium,
            borderRadius: 10,
        }
    })
}