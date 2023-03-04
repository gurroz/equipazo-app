import { Block } from "galio-framework";
import React, { Component } from "react";
import { ImageBackground, StyleSheet } from "react-native";
import { FIELD_BK } from "../../../assets/images";
import { Team } from "../../../domain/Team";
import { TeamMember } from "../../../domain/TeamMember";
import { FormationsProps, MyTeamProps } from "../../app/Router";
import AlertComponent from "../../common/AlertComponent";
import DragableCircularButton from "../../common/DragableCircularButton";
import { apiGetTeam } from "../my-team/MyTeamApi";
import { TeamDTO } from "../my-team/TeamDTO";

type FormationState = {
    teamImgFile: any
    , team: Team
    , teamMemberImgFile: any
    , teamMember: TeamMember
    , modalVisible: boolean
    , modalType: string
    , isDirty: boolean
}

export default class Formation extends Component<FormationsProps, FormationState> {
    constructor(props: MyTeamProps) {
        super(props);

        const team = new Team("", props.route.params.teamId, "");
        this.state = {
            team: team
            , teamImgFile: null
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

    // Todo: get team formation
    getTeam = () => {
        console.log("Calling getTeam");
        apiGetTeam(this.state.team.id, (response: TeamDTO) => {
            console.log("Response getTeam:", response);
            const team = response.toTeam();
            console.log("Trasformed getTeam is", team);

            this.setState({ team: team, modalVisible: false, teamMemberImgFile: null, teamMember: this.defaultTeamMember(), isDirty: false });
        },
            (error: any) => {
                AlertComponent({ title: "Error", message: "Error getting Team" });
                if (error.response)
                    console.log(error.response.data);

                if (error.request)
                    console.log(error.request);

                console.log('Error', error.message);
            });
    }

    render() {
        return (
            <Block safe>
                <ImageBackground source={FIELD_BK} style={styles.image}>
                    {this.state.players
                        && this.state.players.map((player, index) => {
                            return <DragableCircularButton name={player.name} onShortPress={() => console.log("WEENA")} />
                        })
                    }
                </ImageBackground>
            </Block>)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        margin: 10,
        // height: '100%'
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
});
