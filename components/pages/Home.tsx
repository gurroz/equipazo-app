import { Block, Button, Card, Input } from 'galio-framework';
import React, { Component } from "react";
import { Dimensions, ScrollView, StyleSheet } from "react-native";
import { Team } from "../../domain/Team";
import TeamRepository from '../../repository/TeamRepository';
import { DEFAULT_IMAGES } from "../app/images";
import { HomeProps } from "../app/Router";
import theme from '../app/theme';
import AlertComponent from "../common/AlertComponent";
import ImagePickerComponent from "../common/ImagePickerComponent";


type HomeState = {
    newTeamImage: any
    , newTeamName: string
    , teams: any
}

const DEFAULT_NAME = "My Team";

export class Home extends Component<HomeProps, HomeState> {
    private repository: TeamRepository;

    constructor(props: HomeProps) {
        super(props);
        this.repository = TeamRepository.getInstance();
        this.state = {
            newTeamImage: null
            , newTeamName: ""
            , teams: []
        };
    }

    componentDidMount = () => {
        this.getTeams();
    }

    saveTeam = () => {
        const teamDTO = Team.newTeam(this.state.newTeamName, this.state.newTeamImage);
        this.repository.saveTeam(teamDTO);
        this.getTeams()
        AlertComponent({title: "Saved Successful", message:"Saved Team Successfully"});
    }

    getTeams = () => {
        const teams = this.repository.getTeams();
        console.log("Calling getTeam", teams);

        this.setState({teams: teams, newTeamImage: null, newTeamName: ""})
    }

    teamDetail = (teamId: string) => {
        console.log("Calling teamDetail", teamId);
        this.props.navigation.navigate('MyTeam', {teamId})
    }

    updateImage= (img: any) => {
        this.setState({newTeamImage: img});
    };

    render() {
        console.log("Teams are", this.state.teams)
        const imgSrc = this.state.newTeamImage ? this.state.newTeamImage : '';
        return (
            <ScrollView contentContainerStyle={styles.cards}>
            <Block flex space="between">
                <Block
                    key={`card-new`}
                    card={true}
                    center={true}
                    fluid={true}
                    shadow={true}
                    style={styles.card}
                    shadowColor={theme.COLORS.BLACK}>

                    <ImagePickerComponent
                        imgURI={imgSrc}
                        onSelectImg={this.updateImage}
                        defaultImg={DEFAULT_IMAGES.team}
                    />
                    <Input
                        onChangeText={(text: string) => this.setState({newTeamName: text})}
                        placeholder={DEFAULT_NAME}
                        value={this.state.newTeamName}
                        color={theme.COLORS.THEME}
                        style={{ borderColor: theme.COLORS.THEME}}
                        placeholderTextColor={theme.COLORS.THEME} />
                    <Button round size="small" color="info" onPress={this.saveTeam}>Save</Button>
                </Block>
                {this.state.teams && this.state.teams.map( (team: Team, i: number) =>
                    <Block key={`card-${team.name}`}>
                        <Button
                            color="transparent"
                            shadowless
                            style={styles.cardButton}
                            onPress={() => this.teamDetail(team.id)}>
                            <Card
                                flex
                                borderless
                                style={styles.card}
                                title={team.name}
                                caption={`id: ${team.id} name: ${team.name}: ${team.players ? team.players.length : 0} players`}
                                image={team.emblem}
                                imageStyle={styles.rounded}
                                shadowColor={theme.COLORS.BLACK}
                                imageBlockStyle={{padding: theme.SIZES.BASE / 2}}
                            />
                        </Button>
                    </Block>
                )}
            </Block>
            </ScrollView>
        );
    }
}

const { width } = Dimensions.get('screen');

const styles = StyleSheet.create({
    cards: {
        width,
        backgroundColor: theme.COLORS.NEUTRAL,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    card: {
        backgroundColor: theme.COLORS.WHITE,
        width: width - theme.SIZES.BASE * 2,
        marginVertical: theme.SIZES.BASE * 0.875,
        elevation: theme.SIZES.BASE / 2,
        padding: 5
    },
    full: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
    },
    noRadius: {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    rounded: {
        borderRadius: theme.SIZES.BASE * 0.1875,
    },
    cardButton: {
        width: 'auto',
        height: 'auto',
    }
});
