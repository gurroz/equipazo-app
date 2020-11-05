import {Dimensions, ScrollView, StyleSheet} from "react-native";
import React, {Component} from "react";
import {Block, Button, Card, Input} from 'galio-framework';
import {apiAllGetTeams, apiCreateTeam} from "./my-team/MyTeamApi";
import {TeamDTO} from "./my-team/TeamDTO";
import AlertComponent from "../common/AlertComponent";
import {HomeProps} from "../app/Router";
import {Team} from "../../domain/Team";
import theme from '../app/theme';
import ImagePickerComponent from "../common/ImagePickerComponent";
import {DEFAULT_IMAGES} from "../app/images";


type HomeState = {
    currentTeamImage: any
    , currentTeamName: string
    , teams: any
}

const DEFAULT_NAME = "My Team";

export class Home extends Component<HomeProps, HomeState> {
    constructor(props: HomeProps) {
        super(props);

        this.state = {
            currentTeamImage: null
            , currentTeamName: ""
            , teams: []
        };
    }

    componentDidMount = () => {
        this.getTeams();
    }

    saveTeam = () => {
        const teamDTO = new TeamDTO(0, this.state.currentTeamName, "");
        apiCreateTeam(teamDTO, this.state.currentTeamImage, (response: any) => {
                AlertComponent({title: "Saved Successful", message:"Saved Team Successfully"});
                console.log("Response apiCreateTeam is", response);
                this.getTeams();
            },
            (error: any) => {
                AlertComponent({title: "Error", message:"Error saving Team"});
                if(error.response)
                    console.log(error.response.data);

                if(error.request)
                    console.log(error.request);

                console.log('Error', error.message);
            });
    }

    getTeams = () => {
        console.log("Calling getTeam");
        apiAllGetTeams((response: any) => {
                console.log("Response getTeams is", response);
                const teams = response.map( (teamDTO: TeamDTO) => {
                    const team = teamDTO.toTeam();
                    console.log("Team is", team);
                    return team;
                })
                this.setState({teams: teams, currentTeamImage: null, currentTeamName: ""})
            },
            (error: any) => {
                AlertComponent({title: "Error", message:"Error getting Teams"});
                if(error.response)
                    console.log(error.response.data);

                if(error.request)
                    console.log(error.request);

                console.log('Error', error.message);
            });
    }

    teamDetail = (teamId: number) => {
        this.props.navigation.navigate('MyTeam', {teamId})
    }

    updateImage= (img: any) => {
        this.setState({currentTeamImage: img});
    };

    render() {
        const imgSrc = this.state.currentTeamImage ? this.state.currentTeamImage.uri : '';
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
                        onChangeText={(text: string) => this.setState({currentTeamName: text})}
                        placeholder={DEFAULT_NAME}
                        value={this.state.currentTeamName}
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
                                caption={`${team.players ? team.players.length : 0} players`}
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
