import React, { Component } from "react";
import { FlatList, ListRenderItem, StyleSheet, View } from "react-native";
import { IconButton, MD3Colors, Text } from "react-native-paper";
import { Team } from "../../../domain/Team";
import { TeamMember } from "../../../domain/TeamMember";
import TeamRepository from "../../../repository/TeamRepository";
import { TeamProfileProps } from "../../app/Router";
import AlertComponent from "../../common/AlertComponent";
import Block from "../../common/Block";
import TeamCard from "../../common/TeamCard";
import TeamMemberList from '../../common/TeamMemberListItem';
import ConfigurationRepository from "../../../repository/ConfigurationRepository";
import { Configuration } from "../../../repository/Configuration";

type TeamProfileState = {
    team: Team
    , onEditMode: boolean
}

export class TeamProfile extends Component<TeamProfileProps, TeamProfileState> {
    private teamRepo: TeamRepository;
    private configRepo: ConfigurationRepository;

    constructor(props: TeamProfileProps) {
        super(props);
        console.log("TeamProfile constructing")

        const team = Team.emptyTeam()
        team.id = props.route.params.teamId
        this.teamRepo = TeamRepository.getInstance();
        this.configRepo = ConfigurationRepository.getInstance();

        this.state = {
            team: team,
            onEditMode: false
        };
    }

    componentDidMount = () => {
        console.log("TeamProfile Mounting")
        this.getTeam();
        this.props.navigation.addListener(
            'focus',
            () => {
                console.log("TeamProfile Focused")
                this.getTeam();
            }
        );
    }

    getTeam = () => {
        console.log("TeamProfile Calling getTeam with id", this.state.team.id);
        if (this.state.team.id !== "") {
            const team = this.teamRepo.getTeam(this.state.team.id);
            console.log("response getTeam", team);
            this.setState({ team });
            this.configRepo.saveConfig(Configuration.newConfig(team.id))
        }
    }

    updateImage = (img: any) => {
        const updatedTeam = Team.copy(this.state.team)
        updatedTeam.emblem = img

        this.setState({ team: updatedTeam });
    };

    renderListItem: ListRenderItem<TeamMember> = ({ item }) => (
        <TeamMemberList key={item.id} member={item} isSelected={false} onSelect={() => this.goToTeamMemberProfile(item.id)} />
    );

    saveTeam = () => {
        console.log("Saving team", this.state.team)
        let team = Team.copy(this.state.team)
        if (team.id === "") {
            team = Team.newTeam(team.name, team.emblem)
        }

        this.teamRepo.saveTeam(team);
        this.configRepo.saveConfig(Configuration.newConfig(team.id))

        this.setState({ team })
        AlertComponent({ title: "Saved Successful", message: "Saved Team Successfully" });
    }


    onTeamNameChange = (newName: string) => {
        let team = Team.copy(this.state.team)
        // if(!newName || newName.length < 3) {
        //     AlertComponent({title: "Error", message:"Team name must be at least 3 character long"});
        // } else {
        //     team.name = newName;
        //     this.setState({team: team});
        // }

        team.name = newName;
        console.log("Saving team name " + newName);
        this.setState({ team: team });
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
                <View style={styles.teamCard}>
                    <TeamCard team={this.state.team}
                        readOnly={false}
                        onChangeImg={this.updateImage}
                        onNameChange={this.onTeamNameChange}
                        onSave={this.saveTeam} />
                </View>
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
