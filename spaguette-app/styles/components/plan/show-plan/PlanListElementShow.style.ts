import { SPACING } from "@/styles/const/spacing";
import { WIDTHS } from "@/styles/const/widths";
import { StyleSheet, useWindowDimensions } from "react-native"


export const useStyles = () => {
    const { width } = useWindowDimensions();
    const isMobile = width < WIDTHS.mobileBreakdown;

    return StyleSheet.create({
        container: {
            flexDirection: 'row',
            paddingHorizontal: SPACING.small,
            alignItems: 'center',
            justifyContent: 'space-between'
        }, 
        textContainer: {
            flexDirection: 'row',
        },
        text: {
            width: isMobile ? WIDTHS.mobileInputMedium : WIDTHS.desktopInputMedium,
            marginRight: 30,
        },
        quantity: {
            width: WIDTHS.quantity
        },
    })
}