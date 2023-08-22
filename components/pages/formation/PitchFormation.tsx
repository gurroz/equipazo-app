import React, { Component } from "react";
import { ImageBackground, StyleSheet } from "react-native";
import { FIELD_BK } from "../../../assets/images";
import { Formation } from "../../../domain/Formation";
import { Team } from "../../../domain/Team";
import ConfigurationRepository from "../../../repository/ConfigurationRepository";
import TeamRepository from "../../../repository/TeamRepository";
import { PitchFormationProps } from "../../app/Router";
import DragableCircularButton from "../../common/DragableCircularButton";

type FormationState = {
    team: Team,
    defaultFormations: Formation[]
}

export class PitchFormation extends Component<PitchFormationProps, FormationState> {
    private teamRepo: TeamRepository;
    private configRepo: ConfigurationRepository;

    constructor(props: PitchFormationProps) {
        super(props);

        this.teamRepo = TeamRepository.getInstance();
        this.configRepo = ConfigurationRepository.getInstance();

        const team = Team.emptyTeam();
        team.id = this.configRepo.getConfig().teamSelected;
        this.state = {
            team: team,
            defaultFormations: Formation.generateTemplates()
        };
    }

    componentDidMount = () => {
        console.log("Formation Mounting")
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
            if(team.formation.name === "") {
                team.formation = Object.assign({}, this.state.defaultFormations[0]);
                team.initFormation();
            }
            console.log("response getTeam", team);
            this.setState({ team });
        }
    }

    getFormationWithPlayers = () => {
        if (this.state.team.formation) {
            return this.state.team.formation.playersPositions.map((playersPosition, index) => {
               const name = playersPosition.player ? playersPosition.player.name : playersPosition.position.toString();
                return <DragableCircularButton 
                    key={index}
                    name={name}
                    onShortPress={() => console.log("WEENA")}
                    posX={this.calculateMapPositionX(playersPosition.column)}
                    posY={this.calculateMapPositionY(playersPosition.row)}
                />
            })
        }
    }

    calculateMapPositionX = (column: number) => {
        return (column * 70) + 20;
    }

    
    calculateMapPositionY = (row: number) => {
        return (row * 100) + 20;
    }

    //TODO: Get default Formations from config/team
    //TODO: Add right list with players
    //TODO: Add save button and save formation, show that formation onwards
    //TODO: Make swap omnn clik
    render() {
        return (
            <ImageBackground source={FIELD_BK} style={styles.image}>
                {this.getFormationWithPlayers()}
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
