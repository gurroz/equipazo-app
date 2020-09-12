import {StyleSheet} from "react-native";
import React from "react";
import Draggable from "react-native-draggable";

export default function DragableCircularButton(props: any) {
    const randomPos = Math.abs((Math.random() * 100) + (Math.random() * 100) );
    return <Draggable
            x={randomPos}
            y={randomPos}
            renderSize={60}
            renderColor="#cff1ff"
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
