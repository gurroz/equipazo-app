import {ImageBackground, StyleSheet, View} from "react-native";
import React from "react";
import {Player} from "../../../domain/Player";
import {FIELD_BK} from "../../../assets/images";
import DragableCircularButton from "../../common/DragableCircularButton";

const getPlayers = () => {
    return [
        new Player("Juan", 1,['GK'])
        , new Player("Salas", 11,['CF'])
        , new Player("Pitbull", 3,['CB'])
    ]
};
export default function Formation() {
        const players = getPlayers();
        return (
            <View style={styles.container}>
                <ImageBackground source={FIELD_BK} style={styles.image}>
                    {players && players.map((value, index) => {
                        return <DragableCircularButton name={value.name} onShortPress={ () => console.log("WEENA")}/>
                    })
                    }
                </ImageBackground>
            </View>
        );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        margin: 10,
        // height: '100%'
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
});
