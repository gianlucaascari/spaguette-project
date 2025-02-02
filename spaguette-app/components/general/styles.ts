import { COLORS } from "@/styles/colors";
import { SPACING } from "@/styles/spacing";
import { TYPOGRAPHY } from "@/styles/typography";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    primaryButton: {
        paddingVertical: SPACING.medium,
        paddingHorizontal: SPACING.large,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        alignSelf: 'center',
    },
    secondaryButton: {
        paddingVertical: SPACING.medium,
        paddingHorizontal: SPACING.large,
        backgroundColor: COLORS.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        alignSelf: 'center',
    },
    tertiaryButton: {
        paddingVertical: SPACING.medium,
        paddingHorizontal: SPACING.large,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    primarytext: {
        fontSize: TYPOGRAPHY.buttonSize,
        fontWeight: TYPOGRAPHY.buttonWeight,
    },
    tertiaryText: {
        fontSize: TYPOGRAPHY.buttonSize,
        fontWeight: TYPOGRAPHY.buttonWeight,
        color: COLORS.secondary,
    },
})