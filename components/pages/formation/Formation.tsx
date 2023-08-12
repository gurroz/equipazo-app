import React, { Component } from "react";
import { ImageBackground, StyleSheet } from "react-native";
import { FIELD_BK } from "../../../assets/images";
import { Team } from "../../../domain/Team";
import TeamRepository from "../../../repository/TeamRepository";
import { FormationsProps } from "../../app/Router";
import DragableCircularButton from "../../common/DragableCircularButton";

type FormationState = {
    team: Team
    , modalVisible: boolean
    , modalType: string
    , isDirty: boolean
}

export class Formation extends Component<FormationsProps, FormationState> {
    private repository: TeamRepository;

    constructor(props: FormationsProps) {
        super(props);
        this.repository = TeamRepository.getInstance();

        this.state = {
            team: new Team()
            , modalVisible: false
            , modalType: ''
            , isDirty: false
        };
    }

    componentDidMount = () => {
        this.getTeam(this.props.route.params.teamId);
    }

    // Todo: get team formation
    getTeam = (id: string) => {
        console.log("Calling getTeam");
        const team = this.repository.getTeam(id);
        this.setState({ team: team, modalVisible: false, isDirty: false });
    }

    //TODO: Add right list with players
    //TODO: Show dragrables from team
    //TODO: Make swap omnn clik
    render() {
        const players = this.state.team.getTeamMembers()
        return (
            <ImageBackground source={FIELD_BK} style={styles.image}>
                {players && players.map((player, index) => 
                    {
                        return <DragableCircularButton name={player.name} onShortPress={() => console.log("WEENA")} />
                    })
                }
            </ImageBackground>
        )
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
