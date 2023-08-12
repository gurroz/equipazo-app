import React, { Component } from "react";
import { FlatList, ListRenderItem, StyleSheet, View } from "react-native";
import { IconButton, MD3Colors, Text } from "react-native-paper";
import { Team } from "../../../domain/Team";
import { TeamMember } from "../../../domain/TeamMember";
import TeamRepository from "../../../repository/TeamRepository";
import { MembersProps, TeamProfileProps } from "../../app/Router";
import AlertComponent from "../../common/AlertComponent";
import Block from "../../common/Block";
import TeamCard from "../../common/TeamCard";
import TeamMemberList from '../../common/TeamMemberListItem';
import ConfigurationRepository from "../../../repository/ConfigurationRepository";
import { Configuration } from "../../../repository/Configuration";

type MembersState = {
    team: Team
}

export class Members extends Component<MembersProps, MembersState> {
    private teamRepo: TeamRepository;
    private configRepo: ConfigurationRepository;

    constructor(props: MembersProps) {
        super(props);
        console.log("Members constructing")

        this.teamRepo = TeamRepository.getInstance();
        this.configRepo = ConfigurationRepository.getInstance();

        const team = Team.emptyTeam()
        team.id = this.configRepo.getConfig().teamSelected;

        this.state = {
            team: team
        };
    }

    componentDidMount = () => {
        console.log("Members Mounting")
        this.getTeam();
        this.props.navigation.addListener(
            'focus',
            () => {
                console.log("Members Focused")
                this.getTeam();
            }
        );
    }

    getTeam = () => {
        console.log("Members Calling getTeam with id", this.state.team.id);
        if (this.state.team.id !== "") {
            const team = this.teamRepo.getTeam(this.state.team.id);
            console.log("response getTeam", team);
            this.setState({ team });
            this.configRepo.saveConfig(Configuration.newConfig(team.id))
        }
    }


    renderListItem: ListRenderItem<TeamMember> = ({ item }) => (
        <TeamMemberList key={item.id} member={item} isSelected={false} onSelect={() => this.goToTeamMemberProfile(item.id)} />
    );

    saveTeam = () => {
        console.log("Saving team", this.state.team)
        let team = Team.copy(this.state.team);
        this.teamRepo.saveTeam(team);

        this.setState({ team })
        AlertComponent({ title: "Saved Successful", message: "Saved Team Successfully" });
    }


    goToImportContact = () => {
        this.props.navigation.navigate('ImportContacts', { teamId: this.state.team.id })
    }

    goToTeamMemberProfile = (id?: string) => {
        this.props.navigation.navigate('TeamMemberProfile', { teamId: this.state.team.id, teamMemberId: id })
    }

    render() {
        return (
            <View style={styles.container}>
                <Block
                    style={{ flex: 4 }}
                    title="Members"
                    titleActionBtns={
                        <View style={styles.row}>
                            <IconButton
                                icon="account-plus"
                                iconColor={MD3Colors.error50}
                                size={20}
                                onPress={() => this.goToTeamMemberProfile()}
                                disabled={!!!this.state.team.id}
                            />

                            <IconButton
                                icon="account-multiple-plus-outline"
                                iconColor={MD3Colors.neutralVariant30}
                                size={20}
                                onPress={this.goToImportContact}
                                disabled={!!!this.state.team.id}
                            />
                        </View>
                    }>
                    <FlatList
                        style={styles.flatList}
                        data={this.state.team.getTeamMembers()}
                        renderItem={this.renderListItem}
                        keyExtractor={teamMember => teamMember.id}
                        contentContainerStyle={{ backgroundColor: 'white' }}
                        ListEmptyComponent={<Text style={styles.row}>No team member</Text>}
                    />
                </Block>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    teamCard: {
        flex: 3
    },
    flatList: {
        maxHeight: 235,
        flexGrow: 0
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
});
