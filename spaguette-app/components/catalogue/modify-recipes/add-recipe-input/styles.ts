import { COLORS } from "@/styles/colors";
import { SPACING } from "@/styles/spacing";
import { StyleSheet, useWindowDimensions } from "react-native";

export const useStyles = () => {
    const { width } = useWindowDimensions();
    const isMobile = width < 768;

    return StyleSheet.create({
        container: {
            padding: isMobile ? SPACING.small : SPACING.medium,
            flexDirection: isMobile ? 'column' : 'row',
        },
        button: {
            padding: SPACING.medium,
            backgroundColor: COLORS.primary,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
        }
    })
}