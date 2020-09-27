import {Image, StyleSheet, TouchableHighlight} from "react-native";
import ImagePicker from "react-native-image-picker";
import React from "react";

interface Props {
    imgURI: any
    , onSelectImg: any
}

export default function ImagePickerComponent(props: Props) {

    const chooseImage = () => {
        let options = {
            title: 'Select Image',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                props.onSelectImg(response);
            }
        });
    }

    const renderFileUri = () => {
        if (props.imgURI) {
            return <Image source={{ uri: props.imgURI}} style={styles.images}/>
        } else {
            return <Image source={require("../../assets/images/myTeam-dummy.png")} style={styles.images}/>
        }
    }

    return <TouchableHighlight onPress={chooseImage}>
        {renderFileUri()}
    </TouchableHighlight>

}

const styles = StyleSheet.create({
    images: {
        width: 150,
        height: 150,
        borderColor: 'black',
        borderWidth: 1,
        marginHorizontal: 3
    }
});
