import { COLORS } from "@/styles/colors";
import { SPACING } from "@/styles/spacing";
import { TYPOGRAPHY } from "@/styles/typography";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    button: {
        padding: SPACING.medium,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    text: {
        fontSize: TYPOGRAPHY.buttonSize,
        fontWeight: TYPOGRAPHY.buttonWeight,
    }
})