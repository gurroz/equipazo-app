import React, { PureComponent } from "react";
import { StyleSheet } from "react-native";
import { Avatar, List, Surface } from "react-native-paper";
import { TeamMember } from "../../domain/TeamMember";
import theme from "../app/theme";

type TemMemberListProps = {
    member: TeamMember,
    isSelected: boolean,
    onSelect: Function
}
export default class TemMemberList extends PureComponent<TemMemberListProps> {
    render() {
        const member: TeamMember = this.props.member;
        const isSelected = this.props.isSelected;

        return (
            <Surface key={member.id} style={styles.surface} elevation={4} >
                <List.Item 
                    title={member.name}
                    style={[styles.item, isSelected ? styles.selected : styles.unselected]}
                    onPress={() => this.props.onSelect(member.id)}
                    left={props => <Avatar.Icon size={28} icon="account-circle-outline" />}
                />
            </Surface>
        )
    }
}

const styles = StyleSheet.create({
    surface: {
        height: 'auto',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    item: {
        paddingLeft: 5
    },
    selected: {
        backgroundColor: theme.COLORS.SUCCESS,
    },
    unselected: {
        backgroundColor: theme.COLORS.NEUTRAL,
    }
});
