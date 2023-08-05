import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { SegmentedButtons, Switch, Text, TextInput } from "react-native-paper";
import { Team } from "../../../domain/Team";
import { TeamMember } from "../../../domain/TeamMember";
import TeamRepository from "../../../repository/TeamRepository";
import { TeamMemberProfileProps } from "../../app/Router";
import { DEFAULT_IMAGES } from "../../app/images";
import AlertComponent from "../../common/AlertComponent";
import Block from "../../common/Block";
import ImagePickerComponent from "../../common/ImagePickerComponent";


type TeamMemberProfileState = {
    team: Team
    , teamMemberImgFile: any
    , teamMember: TeamMember
    , isDirty: boolean
}

type ROLES = 'COACH' | 'PLAYER';
const DEF_POSITONS = ['GK', 'LB', 'CB', 'RB'];
const MED_POSITONS = ['DM', 'CM', 'AM'];
const FWRD_POSITONS = ['LW', 'CF', 'RW'];

export class TeamMemberProfile extends Component<TeamMemberProfileProps, TeamMemberProfileState> {
    private teamRepo: TeamRepository;
    constructor(props: TeamMemberProfileProps) {
        super(props);
        this.teamRepo = TeamRepository.getInstance();

        console.log("TeamMemberProfile", props.route.params.teamId, props.route.params.teamMemberId)
        const team = Team.emptyTeam()
        team.id = props.route.params.teamId

        const teamMember = TeamMember.emptyTeamMember();
        teamMember.id = props.route.params.teamMemberId || '';

        this.state = {
            team: team
            , teamMemberImgFile: null
            , teamMember: teamMember
            , isDirty: false
        };
    }

    componentDidMount = () => {
        this.getTeamAndTeamMember();
        this.props.navigation.addListener(
            'focus',
            () => {
                this.getTeamAndTeamMember();
            }
        );
    }

    getTeamAndTeamMember = () => {
        console.log("Calling getTeam with id", this.state.team.id);
        const team = this.teamRepo.getTeam(this.state.team.id);
        const teamMember = team.getTeamMember(this.state.teamMember.id)

        console.log("response getTeam", team, teamMember);

        this.setState({ team: team, teamMemberImgFile: teamMember.picture, teamMember: teamMember });
    }

    updateModalImage = (img: any) => {
        this.setState({ teamMemberImgFile: img, isDirty: true });
    };

    editPlayer = (teamMember: TeamMember) => {
        this.setState({ teamMember: teamMember });
    }

    setRole = (role: ROLES) => {
        const teamMember = TeamMember.copy(this.state.teamMember);
        if (role === 'COACH') {
            teamMember.isCoach = !teamMember.isCoach;
        } else {
            teamMember.isPlayer = !teamMember.isPlayer;
        }

        this.setState({ teamMember: teamMember, isDirty: true });
    }

    onTeamMemberChange = (newName: string, newMobile: string) => {
        let teamMember = TeamMember.copy(this.state.teamMember);
        // if(!newName || newName.length < 2) {
        //     AlertComponent({title: "Error", message:"Team member must be at least 3 character long"});
        // } else {
        //     teamMember.name = newName;
        //     this.setState({teamMember: teamMember});
        // }
        if (newName)
            teamMember.name = newName;

        if (newMobile)
            teamMember.mobile = newMobile;
        this.setState({ teamMember: teamMember, isDirty: true });
    }

    addMemberToTeam = (teamMember: TeamMember) => {
        let team = this.state.team;
        const hasAddedPlayer = team.addPlayer(teamMember);

        if (!hasAddedPlayer) {
            throw new Error("Team Member with that name already exist");
        }

        return team;
    }

    saveMember = () => {
        try {
            let teamMember: TeamMember = TeamMember.copy(this.state.teamMember);
            teamMember.picture = this.state.teamMemberImgFile;

            if (teamMember.id === '') {
                teamMember = TeamMember.newTeamMember(teamMember);
            }
            const team: Team = this.addMemberToTeam(teamMember);

            console.debug("saving member in team", team);

            this.teamRepo.saveTeam(team);
            this.setState({ team: team });
            AlertComponent({ title: "Saved Successful", message: "Saved Team Member Successfully" });
        } catch (e) {
            console.warn("Error saving teamMember", e);
            AlertComponent({ title: "Error", message: "Cannot Save Team Member. Please check the name is unique" });
        }

    };

    addPosition = (values: string[]) => {
        console.log("NEw Postion", values)
        const teamMember: TeamMember = TeamMember.copy(this.state.teamMember);
        teamMember.positions = values
        this.setState({ teamMember: teamMember, isDirty: true });
    }

    render() {
        const member = this.state.teamMember;
        return (
            <View style={styles.container}>
                <Block style={{ flex: 3 }} contentStyle={styles.profile}>
                    <ImagePickerComponent
                        imgURI={this.state.teamMemberImgFile ? this.state.teamMemberImgFile : ''}
                        onSelectImg={this.updateModalImage}
                        defaultImg={DEFAULT_IMAGES.member}
                    />
                    <TextInput placeholder={member.name || "Name"}
                        mode="outlined"
                        style={styles.input}
                        onEndEditing={(e) => this.onTeamMemberChange(e.nativeEvent.text, "")} />

                    <TextInput placeholder={member.mobile || "Mobile"}
                        mode="outlined"
                        style={styles.input}
                        onEndEditing={(e) => this.onTeamMemberChange("", e.nativeEvent.text)} />
                </Block>
                <Block style={{ flex: 5 }} title="Roles" actionEnabled action1Title="Save" action1Press={this.saveMember}>
                    <View style={styles.marginRow} >
                        <View style={{ flex: 1 }} >
                            <Text variant="labelLarge">Coach</Text>
                        </View>
                        <View style={{ flex: 1 }} >
                            <Switch value={member.isCoach} onValueChange={() => this.setRole('COACH')} />
                        </View>
                    </View>
                    <View style={styles.marginRow} >
                        <View style={{ flex: 1 }} >
                            <Text variant="labelLarge">Player</Text>
                        </View>
                        <View style={{ flex: 1 }} >
                            <Switch value={member.isPlayer} onValueChange={() => this.setRole('PLAYER')} />
                        </View>
                    </View>
                    {member.isPlayer && (
                        <>
                            <View style={styles.marginRow} >
                                <Text variant="headlineMedium">Positions</Text>
                            </View>
                            <View style={{ marginTop: 5 }} >
                                <SegmentedButtons
                                    value={member.positions}
                                    multiSelect={true}
                                    onValueChange={this.addPosition}
                                    buttons={DEF_POSITONS.map(pos => {
                                        return {
                                            value: pos,
                                            label: pos,
                                        }
                                    })}
                                />
                            </View>
                            <View style={{ marginTop: 5 }} >
                                <SegmentedButtons
                                    value={member.positions}
                                    multiSelect={true}
                                    onValueChange={this.addPosition}
                                    buttons={MED_POSITONS.map(pos => {
                                        return {
                                            value: pos,
                                            label: pos,
                                        }
                                    })}
                                />
                            </View>
                            <View style={{ marginTop: 5 }} >
                                <SegmentedButtons
                                    value={member.positions}
                                    multiSelect={true}
                                    onValueChange={this.addPosition}
                                    buttons={FWRD_POSITONS.map(pos => {
                                        return {
                                            value: pos,
                                            label: pos,
                                        }
                                    })}
                                />
                            </View>
                        </>
                    )}
                </Block>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    profile: {
        marginTop: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: 300
    },
    marginRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10
    },
});
