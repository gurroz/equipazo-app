import React, { Component } from "react";
import { FlatList, ListRenderItem, Pressable, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { Team } from "../../domain/Team";
import TeamRepository from '../../repository/TeamRepository';
import { MyTeamsProps } from "../app/Router";
import TeamCard from "../common/TeamCard";
import ConfigurationRepository from "../../repository/ConfigurationRepository";


type MyTeamsState = {
    teams: any,
    teamSelectedId: string
}

export class MyTeams extends Component<MyTeamsProps, MyTeamsState> {
    private teamRepo: TeamRepository;
    private configRepo: ConfigurationRepository;

    constructor(props: MyTeamsProps) {
        super(props);
        this.teamRepo = TeamRepository.getInstance();
        this.configRepo = ConfigurationRepository.getInstance();

        this.state = {
            teams: [],
            teamSelectedId: ''
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

    newTeam = () => {
        this.teamDetail("");
    }

    getTeams = () => {
        const teams = this.teamRepo.getTeams();
        console.log("MyTeams Calling getTeam", teams);

        const config = this.configRepo.getConfig()

        this.setState({
            teams: teams, teamSelectedId: config ? config.teamSelected : ''
        })
    }

    teamDetail = (teamId: string) => {
        console.log("Calling teamDetail", teamId);
        this.props.navigation.navigate('TeamProfile', { screen: 'TeamProfile', params: { teamId } })
    }

    renderTeamListItem: ListRenderItem<Team> = ({ item }) => (
        <Pressable key={item.id} onPress={() => this.teamDetail(item.id)}>
            <TeamCard
                team={item}
                readOnly={true}
                isSelected={item.id === this.state.teamSelectedId}
            />
        </Pressable>
    );

    render() {
        console.log("Teams are", this.state.teams)
        return (
            <View style={styles.container}>
                <View style={{ flex: 11 }}>
                    <FlatList
                        data={this.state.teams}
                        renderItem={this.renderTeamListItem}
                        keyExtractor={team => team.id}
                        contentContainerStyle={{ flexGrow: 1 }}
                        ListEmptyComponent={<Text style={styles.row}>No teams created</Text>}
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <Button icon="plus-circle-outline" mode="contained" onPress={this.newTeam}>
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
