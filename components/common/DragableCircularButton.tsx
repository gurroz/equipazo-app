import {StyleSheet} from "react-native";
import React from "react";
import Draggable from "react-native-draggable";
import theme from "../app/theme";

type DragableCircularButtonProps = {
    name: string, 
    posX: number, 
    posY: number, 
    onShortPress: any
}
export default function DragableCircularButton(props: DragableCircularButtonProps) {
    return <Draggable
            x={props.posX}
            y={props.posY}
            renderSize={50}
            renderColor={theme.COLORS.GREY}
            renderText={props.name}
            isCircle
            // imageSource
            onShortPressRelease={props.onShortPress}/>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
});
