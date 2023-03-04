// create a react native class for a circular avatar with name
// and image

import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export const Avatar = ({ name, image }) => {
    return (
        <View style={styles.container}>
        <Image style={styles.image} source={image} />
        <Text style={styles.name}>{name}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
    },
    image: {
    },
    name: {
    },
});