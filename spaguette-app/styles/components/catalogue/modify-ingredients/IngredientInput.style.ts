import { SPACING } from "@/styles/const/spacing";
import { WIDTHS } from "@/styles/const/widths";
import { StyleSheet, useWindowDimensions } from "react-native";

export const useStyles = () => {
    const { width } = useWindowDimensions();
    const isMobile = width < WIDTHS.mobileBreakdown;

    return StyleSheet.create({
        container: {
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-around',
            flex: 1,
            marginBottom: SPACING.small,
        },
        textInput: {
            padding: SPACING.small,
            marginBlock: SPACING.small,
        }
    })
}