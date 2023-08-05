import React from "react";
import { Image, StyleSheet, TouchableHighlight } from "react-native";
import { MediaType, launchImageLibrary } from "react-native-image-picker";

interface Props {
    imgURI: any
    , defaultImg: object
    , onSelectImg: any
    , style?: any
}

export default function ImagePickerComponent(props: Props) {

    const chooseImage = () => {
        const type: MediaType = 'photo';
        let options = {
            mediaType: type,
            maxWidth: 600,
            maxHeight: 800
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                console.log('ImagePicker Error: ', response.errorMessage);
            } else if (response.assets) {
                props.onSelectImg(response.assets[0].uri);
            }
        });
    }

    const renderFileUri = () => {
        if (props.imgURI) {
            return <Image source={{ uri: props.imgURI, headers: { Pragma: 'no-cache' } }} style={props.style || styles.images} />
        } else {
            return <Image source={props.defaultImg} style={props.style || styles.images} />
        }
    }

    return <TouchableHighlight onPress={chooseImage}>
        {renderFileUri()}
    </TouchableHighlight>

}

const styles = StyleSheet.create({
    images: {
        width: 100,
        height: 100,
        borderWidth: 0,
    }
});
