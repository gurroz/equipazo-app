import React, { Component } from "react";
import { FlatList, StyleSheet, View } from 'react-native';

import { Avatar } from "../../common/Avatar";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22,
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
});

export class Sidebar extends Component<FormationsProps, FormationState> {

    renderPlayer = ({ player }) => {
        return <Avatar name={player.name} image={player.image} />
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.props.players}
                    renderItem={this.renderPlayer}
                />
            </View>
        )
    }
}

    
}
