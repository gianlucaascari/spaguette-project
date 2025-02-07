import { WIDTHS } from "@/styles/const/widths";
import { StyleSheet, useWindowDimensions } from "react-native"


export const useStyles = () => {
    const { width } = useWindowDimensions();
    const isMobile = width < WIDTHS.mobileBreakdown;

    return StyleSheet.create({
        container: {
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between',
        },
        buttonContainer : {
            flexDirection: 'row',
            alignSelf: 'center',
        }        
    })
}