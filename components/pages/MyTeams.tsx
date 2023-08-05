import React, { Component } from "react";
import { FlatList, ListRenderItem, Pressable, StyleSheet, View } from "react-native";
import { Button, Divider, Text } from "react-native-paper";
import { Team } from "../../domain/Team";
import TeamRepository from '../../repository/TeamRepository';
import { MyTeamsProps } from "../app/Router";
import TeamCard from "../common/TeamCard";


type MyTeamsState = {
    teams: any
}


export class MyTeams extends Component<MyTeamsProps, MyTeamsState> {
    private repository: TeamRepository;

    constructor(props: MyTeamsProps) {
        super(props);
        this.repository = TeamRepository.getInstance();
        this.state = {
            teams: []
        };
    }

    componentDidMount = () => {
        this.getTeams();
        this.props.navigation.addListener(
            'focus',
            () => {
                this.getTeams();
            }
        );
    }

    saveTeam = () => {
        this.teamDetail("");
    }

    getTeams = () => {
        const teams = this.repository.getTeams();
        console.log("Calling getTeam", teams);

        this.setState({ teams: teams })
    }

    teamDetail = (teamId: string) => {
        console.log("Calling teamDetail", teamId);
        this.props.navigation.navigate('TeamProfile', { teamId })
    }

    renderTeamListItem: ListRenderItem<Team> = ({ item }) => (
        <Pressable key={item.id} onPress={() => this.teamDetail(item.id)}>
            <TeamCard team={item} readOnly={true} />
        </Pressable>
    );

    render() {
        console.log("Teams are", this.state.teams)
        return (
            <View style={styles.container}>
                <View style={{flex:11}}>
                    <FlatList
                        data={this.state.teams}
                        renderItem={this.renderTeamListItem}
                        keyExtractor={team => team.id}
                        contentContainerStyle={{ flexGrow: 1 }}
                        ListEmptyComponent={<Text style={styles.row}>No teams created</Text>}
                    />
                </View>
                <View style={{flex:1}}>
                    <Button icon="plus-circle-outline" mode="contained" onPress={this.saveTeam}>
                        New Team
                    </Button>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
});
