import { Block, Button, Input, Text } from 'galio-framework';
import isEqual from "lodash.isequal";
import React, { Component } from "react";
import { Dimensions, FlatList, Image, Modal, StyleSheet } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Team } from "../../../domain/Team";
import { TeamMember } from "../../../domain/TeamMember";
import TeamRepository from "../../../repository/TeamRepository";
import { DEFAULT_IMAGES } from "../../app/images";
import { MyTeamProps } from "../../app/Router";
import theme from "../../app/theme";
import AlertComponent from "../../common/AlertComponent";
import ImagePickerComponent from "../../common/ImagePickerComponent";


type MyClubState = {
    team: Team
    , teamMemberImgFile: any
    , teamMember: TeamMember
    , modalVisible: boolean
    , modalType: string
    , isDirty: boolean
}
const COACH = 'COACH';
const PLAYER = 'PLAYER';
const DEFAULT_TEAM_MEMBER_NAME = "Member's Name";
const DEFAULT_TEAM_MEMBER_MOBILE = "+569";
export class MyTeam extends Component<MyTeamProps, MyClubState> {
    private teamRepo: TeamRepository;
    constructor(props: MyTeamProps) {
        super(props);

        console.log("CREATING MyTeam", props.route.params.teamId)
        const team = Team.emptyTeam()
        team.id = props.route.params.teamId
        this.teamRepo = TeamRepository.getInstance();

        this.state = {
            team: team
            , teamMemberImgFile: null
            , teamMember: this.defaultTeamMember()
            , modalVisible: false
            , modalType: ''
            , isDirty: false
        };
    }

    componentDidMount = () => {
        this.getTeam();
    }

    componentDidUpdate(prevProps: Readonly<MyTeamProps>, prevState: Readonly<MyClubState>, snapshot?: any) {
        if (this.state.isDirty) {
            if (prevState.team
                && (prevState.team.name != this.state.team.name
                    || prevState.team.emblem != this.state.team.emblem)) {
                this.synchronizeTeam();
            } else if (prevState.team
                && !isEqual(prevState.team.coaches, this.state.team.coaches)) {
                this.synchronizeCoaches();
            } else if (prevState.team
                && !isEqual(prevState.team.players, this.state.team.players)) {
                this.synchronizePlayers();
            }
        }
    }

    defaultTeamMember = () => {
        let teamMember = new TeamMember("", "", "");
        teamMember.synchronized = false;

        return teamMember;
    }

    getTeam = () => {
        console.log("Calling getTeam with id", this.state.team.id);
        const team = this.teamRepo.getTeam(this.state.team.id);
        console.log("response getTeam", team);

        this.setState({ team: team, modalVisible: false, teamMemberImgFile: null, teamMember: this.defaultTeamMember(), isDirty: false });
    }

    updateImage = (img: any) => {
        const updatedTeam = Team.copy(this.state.team)
        updatedTeam.emblem = img

        this.setState({ team: updatedTeam, isDirty: true });
    };

    updateModalImage = (img: any) => {
        this.setState({ teamMemberImgFile: img, isDirty: true });
    };

    addCoach = () => {
        this.setState({ modalVisible: true, modalType: COACH });
    }
    addPlayer = () => {
        this.setState({ modalVisible: true, modalType: PLAYER });
    }

    renderListItem = (item: TeamMember, index: number) => {
        return <Block flex id={`id-${item.name}`} key={`key-${item.name}`}>
            <Block row>

                <Block>
                    {item.picture &&
                        <Image
                            key={`pic-${item.name}`}
                            style={styles.avatar}
                            source={{ uri: item.picture }}
                        />
                    }
                    {!item.picture &&
                        <Image
                            key={`pic-${item.name}`}
                            style={styles.avatar}
                            source={require("../../../assets/images/player-dummy.png")}
                        />
                    }
                </Block>
                <Block>
                    <Text style={styles.listItem}>{item.name}</Text>
                </Block>
            </Block>
        </Block>
    }

    synchronizeTeam = () => {
        this.teamRepo.saveTeam(this.state.team);
        AlertComponent({ title: "Saved Successful", message: "Saved Team Successfully" });
    }

    synchronizeCoaches = () => {
        console.log("Synchronising coaches");

    }

    synchronizePlayers = () => {
        console.log("Synchronising players");
        this.setState({ teamMemberImgFile: null });
    }


    onTeamNameChange = (newName: string) => {
        console.log("Updating name", newName, this.state.team);
        let team = Object.assign({}, this.state.team);
        // if(!newName || newName.length < 3) {
        //     AlertComponent({title: "Error", message:"Team name must be at least 3 character long"});
        // } else {
        //     team.name = newName;
        //     this.setState({team: team});
        // }

        team.name = newName;
        console.log("Updating name2 ", team);

        this.setState({ team: team, isDirty: true });
    }

    onTeamMemberChange = (newName: string, newMobile: string) => {
        let teamMember = Object.assign({}, this.state.teamMember);
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

    isMemberCoaches = () => {
        const listType = this.state.modalType ? this.state.modalType : COACH;
        return isEqual(listType, COACH);
    }

    addMemberToTeam = (teamMember: TeamMember) => { 
        console.debug("addMemberToTeam", teamMember);
        let team = this.state.team;
        console.debug("addMemberToTeam 222", team);

        const hasAddedPlayer = team.addPlayer(teamMember);
        console.debug("addMemberToTeam 33");

        if(!hasAddedPlayer) {
            throw new Error("Team Member alresy exist with that name");
        }
        console.debug("addMemberToTeam 44");

        return team;
    }

    saveMember = () => {
        try {            
            console.debug("saveMember1");
            const teamMember: TeamMember = TeamMember.copy(this.state.teamMember);
            teamMember.picture = this.state.teamMemberImgFile;

            const team: Team = this.addMemberToTeam(teamMember);
            console.debug("saveMember2", team);

            this.teamRepo.saveTeam(team);
            this.setState({ team: team, modalVisible: false, teamMember: this.defaultTeamMember(), isDirty: false });
            AlertComponent({title: "Saved Successful", message:"Saved Team Successfully"});
        } catch(e) {
            console.warn("Error saving teamMember", e);
            AlertComponent({title: "Error", message: "Cannot Save Team Member. Please check the name is unique"});
        }

    };

    render() {
        return (
            <Block style={styles.root} safe flex>
                <Block style={styles.emblemHolder}>
                    <ImagePickerComponent
                        imgURI={this.state.team.emblem}
                        onSelectImg={this.updateImage}
                        defaultImg={DEFAULT_IMAGES.team}
                        style={styles.emblemImage}
                    />
                </Block>

                <Block center={true}>
                    <Text h2>{this.state.team.name}</Text>
                </Block>
                <Block>
                    <Block row>
                        <Block row middle style={{ marginHorizontal: theme.SIZES.BASE }}>
                            <Text h4>Players</Text>
                        </Block>
                        <Block row>
                            <Button onlyIcon onPress={this.addPlayer} icon="adduser" iconFamily="antdesign" iconSize={30}
                                color="success" iconColor="#fff" style={{ width: 40, height: 40 }}>Add</Button>
                        </Block>
                    </Block>
                    <Block row right>
                        <FlatList
                            style={{ backgroundColor: theme.COLORS.WHITE, margin: 5, padding: 5 }}
                            data={this.state.team.players}
                            renderItem={({ item, index }) => this.renderListItem(item, index)}
                        />
                    </Block>
                </Block>


                
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}>
                    <Block flex style={styles.modalView}>
                        <Block row>
                            <ImagePickerComponent
                                imgURI={this.state.teamMemberImgFile ? this.state.teamMemberImgFile : ''}
                                onSelectImg={this.updateModalImage}
                                defaultImg={DEFAULT_IMAGES.member}
                            />
                        </Block>
                        <Block row>
                            <Input
                                onChangeText={(name: string) => this.onTeamMemberChange(name, "")}
                                placeholder={DEFAULT_TEAM_MEMBER_NAME}
                                value={this.state.teamMember.name}
                                color={theme.COLORS.THEME}
                                style={{ borderColor: theme.COLORS.THEME }}
                                placeholderTextColor={theme.COLORS.THEME} />
                        </Block>
                        <Block row>
                            <Input
                                onChangeText={(mobile: string) => this.onTeamMemberChange("", mobile)}
                                placeholder={DEFAULT_TEAM_MEMBER_MOBILE}
                                value={this.state.teamMember.mobile}
                                color={theme.COLORS.THEME}
                                style={{ borderColor: theme.COLORS.THEME }}
                                placeholderTextColor={theme.COLORS.THEME} />
                        </Block>
                        <Block row>
                            <Button round size="small" color="info" onPress={this.saveMember}>Save</Button>
                        </Block>
                    </Block>
                </Modal>
            </Block>

        );
    }
}

const styles = StyleSheet.create({
    root: {
        // backgroundColor: 'black',
    },
    article: {
        marginTop: theme.SIZES.BASE * 1.75,
    },
    emblemImage: {
        borderRadius: theme.SIZES.BASE / 2,
        height: theme.SIZES.BASE * 13.75,
    },
    emblemHolder: {
        marginTop: theme.SIZES.BASE / 2,
        // paddingBottom: theme.SIZES.BASE / 2,
        justifyContent: 'flex-start',
        paddingHorizontal: theme.SIZES.BASE,
    },
    button: {
        width: theme.SIZES.BASE * 2,
        borderColor: 'transparent',
    },
    text: {
        fontWeight: '400',
        fontSize: theme.SIZES.FONT * 0.875,
        lineHeight: theme.SIZES.BASE * 1.25,
        letterSpacing: 0.3,
        marginBottom: theme.SIZES.BASE,
    },
    body: {
        backgroundColor: Colors.black,
        color: Colors.white,
        height: Dimensions.get('screen').height - 20,
        width: Dimensions.get('screen').width
    },
    h1: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
        paddingBottom: 8
    },
    h2: {
        color: 'white',
        textAlign: 'left',
        fontSize: 18,
        flex: 1
    },
    headerSection: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        flexWrap: 'nowrap',
        paddingHorizontal: 1,
    },
    listSection: {
        flex: 1,
        marginTop: 8,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: 'nowrap',
        flexGrow: 1,
    },
    teamBlock: {
        flex: 1,
        flexBasis: Dimensions.get('window').width / 2 - 5,
        flexGrow: 0,
        paddingTop: 2
    },
    teamNameInput: {
        height: 52,
        fontSize: 30,
        marginTop: 0,
        borderWidth: 0,
        color: Colors.white
    },
    images: {
        width: 150,
        height: 150,
        borderColor: 'black',
        borderWidth: 1,
        marginHorizontal: 3
    },
    lists: {
        flex: 1,
        backgroundColor: "white",
    },
    listItem: {
        color: 'black',
        padding: 10,
        fontSize: 18,
        height: 44,
    }
    , centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    }
    , modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    newPlayerInput: {
        height: 40,
        marginTop: 2,
        borderWidth: 0,
        color: Colors.black
    },
    tinyLogo: {
        width: 50,
        height: 50,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 4,
    }
});
