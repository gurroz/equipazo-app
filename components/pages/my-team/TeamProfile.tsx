import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Team } from "../../../domain/Team";
import { Configuration } from "../../../domain/Configuration";
import ConfigurationRepository from "../../../repository/ConfigurationRepository";
import TeamRepository from "../../../repository/TeamRepository";
import { TeamProfileProps } from "../../app/Router";
import AlertComponent from "../../common/AlertComponent";
import Block from "../../common/Block";
import TeamCard from "../../common/TeamCard";
import { Text, TextInput } from "react-native-paper";

type TeamProfileState = {
    team: Team
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
            team: team
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
        this.setState({ team });
    }

    onPlayersNumberChanged = (playersCount: string) => {
        let team = Team.copy(this.state.team)

        team.fieldPlayers = playersCount != "" ? parseInt(playersCount) : 0;
        console.log("onPlayersNumberChanged " + playersCount);

        this.setState({ team });
    }

    onBenchNumberChanged = (benchNumber: string) => {
        let team = Team.copy(this.state.team)

        team.benchPlayers = benchNumber != "" ? parseInt(benchNumber) : 0;
        this.setState({ team });
    }

    render() {
        const team =  this.state.team;
        return (
            <View style={styles.container}>
                <View style={styles.teamCard}>
                    <TeamCard
                        team={team}
                        readOnly={false}
                        onChangeImg={this.updateImage}
                        onNameChange={this.onTeamNameChange}
                    />
                </View>
                <Block style={{ flex: 5 }} title="Configuration" actionEnabled action1Title="Save" action1Press={this.saveTeam}>
                    <View style={styles.marginRow} >
                        <View style={{ flex: 4 }} >
                            <Text variant="labelLarge">Field Players</Text>
                        </View>
                        <View style={{ flex: 2 }} >
                            <TextInput
                                style={styles.numericInput}
                                maxLength={2}
                                mode="outlined"
                                keyboardType="numeric"
                                onEndEditing={(e) => this.onPlayersNumberChanged(e.nativeEvent.text)}
                                placeholder={team.fieldPlayers + ''}
                            />
                        </View>
                    </View>
                    <View style={styles.marginRow} >
                        <View style={{ flex: 4 }} >
                            <Text variant="labelLarge">Bench Players</Text>
                        </View>
                        <View style={{ flex: 2 }} >
                            <TextInput
                                style={styles.numericInput}
                                maxLength={2}
                                mode="outlined"
                                keyboardType="numeric"
                                onEndEditing={(e) => this.onBenchNumberChanged(e.nativeEvent.text)}
                                placeholder={team.benchPlayers + ''}
                            />
                        </View>
                    </View>
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
    numericInput: {
    },
    marginRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10
    },
});
