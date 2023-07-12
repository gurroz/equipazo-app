import React, { PureComponent } from "react";
import { StyleSheet } from "react-native";
import { List, Surface } from "react-native-paper";
import { TeamMember } from "../../domain/TeamMember";

type TemMemberListProps= {
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
                <List.Item title={member.name} style={[isSelected ? styles.selected : styles.unselected]} onPress={() => this.props.onSelect(member.id)} />
            </Surface>
        )
      }
}

const styles = StyleSheet.create({
    surface: {
        padding: 8,
        height: 'auto',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    selected: {
        backgroundColor: 'grey',
    },
    unselected: {
        backgroundColor: 'black',
    }
});
