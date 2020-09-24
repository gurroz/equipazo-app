import {Alert} from "react-native";
import React from "react";

export default function AlertComponent(props: any) {
    return Alert.alert(
        props.title,
        props.message,
        [
            { text: "OK", onPress: () => {}}
        ],
        { cancelable: false }
    );
}
