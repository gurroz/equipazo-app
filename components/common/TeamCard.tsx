import React, { PureComponent } from "react";
import { Image, StyleSheet } from "react-native";
import { Text, TextInput } from "react-native-paper";
import { Team } from "../../domain/Team";
import { DEFAULT_IMAGES } from "../app/images";
import Block from "./Block";
import ImagePickerComponent from "./ImagePickerComponent";

type TeamCardProps = {
    team: Team,
    onChangeImg?: Function,
    onSave?: Function,
    onNameChange?: any,
    readOnly?: boolean
}
export default class TeamCard extends PureComponent<TeamCardProps> {
    getTitle = (team: Team) => {
        if (this.props.readOnly) {
            return <Text variant="titleLarge">{team.name}</Text>
        } else {
            return <TextInput placeholder={team.name || "Team's Name"}
                mode="outlined"
                style={styles.teamTitle}
                onEndEditing={(e) => this.props.onNameChange(e.nativeEvent.text)} />
        }
    }

    getContent = (team: Team) => {
        if (this.props.readOnly) {
            return <Image source={{ uri: team.emblem, headers: { Pragma: 'no-cache' } }} style={styles.images} />
        } else {
            return <ImagePickerComponent
                imgURI={team.emblem}
                onSelectImg={this.props.onChangeImg}
                defaultImg={DEFAULT_IMAGES.team}
            />
        }
    }

    render() {
        const team: Team = this.props.team;
        return (
            <Block style={{ flex: 3 }}
                contentStyle={styles.cardContent}
                actionEnabled={!this.props.readOnly}
                action1Title="Save"
                action1Press={this.props.onSave}>
                {this.getContent(team)}
                {this.getTitle(team)}
            </Block>
        )
    }
}

const styles = StyleSheet.create({
    cardContent: {
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    teamTitle: {
        width: 300
    },
    images: {
        width: 100,
        height: 100,
        borderWidth: 0,
    }
});
