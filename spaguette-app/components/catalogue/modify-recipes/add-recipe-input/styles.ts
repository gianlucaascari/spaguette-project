import { COLORS } from "@/styles/colors";
import { SPACING } from "@/styles/spacing";
import { StyleSheet, useWindowDimensions } from "react-native";

export const useStyles = () => {
    const { width } = useWindowDimensions();
    const isMobile = width < 768;

    return StyleSheet.create({
        container: {
            margin: isMobile ? SPACING.medium : SPACING.large,
            width: isMobile ? 400 : 600,
            backgroundColor: COLORS.background,
        }
    })
}