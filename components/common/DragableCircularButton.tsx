import {StyleSheet} from "react-native";
import React from "react";
import Draggable from "react-native-draggable";
import theme from "../app/theme";

type DragableCircularButtonProps = {
    name: string, 
    posX: number, 
    posY: number, 
    onShortPress: any,
    onDragRelease: any,
    maxHeight?: number,
    maxWidth?: number
}
export default function DragableCircularButton(props: DragableCircularButtonProps) {
    return <Draggable
            x={props.posX}
            y={props.posY}
            renderSize={50}
            renderColor={theme.COLORS.GREY}
            renderText={props.name}
            onDragRelease={props.onDragRelease}
            minX={0}
            minY={0}
            maxX={props.maxWidth}
            maxY={props.maxHeight}
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
