import { Picker } from "@react-native-picker/picker";
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Modal, Portal, Text, TextInput } from "react-native-paper";
import { Formation } from "../../../domain/Formation";
import { Team } from "../../../domain/Team";
import ConfigurationRepository from "../../../repository/ConfigurationRepository";
import FormationRepository from "../../../repository/FormationRepository";
import TeamRepository from "../../../repository/TeamRepository";
import { PitchFormationProps } from "../../app/Router";
import theme from "../../app/theme";
import Block from "../../common/Block";
import { PitchWithPlayers } from "./PitchWithPlayers";

type FormationState = {
    team: Team,
    defaultFormations: Formation[],
    modalOpen: boolean,
    newFormationName: string,
    pitchHeight: number,
    pitchWidth: number
}

export class PitchFormation extends Component<PitchFormationProps, FormationState> {
    private teamRepo: TeamRepository;
    private configRepo: ConfigurationRepository;
    private formationRepo: FormationRepository;
    constructor(props: PitchFormationProps) {
        super(props);

        this.teamRepo = TeamRepository.getInstance();
        this.configRepo = ConfigurationRepository.getInstance();
        this.formationRepo = FormationRepository.getInstance();

        const team = Team.emptyTeam();
        team.id = this.configRepo.getConfig().teamSelected;
        this.state = {
            team: team,
            defaultFormations: this.formationRepo.getFormations(),
            modalOpen: false,
            newFormationName: '',
            pitchHeight: 0,
            pitchWidth: 0
        };
    }

    componentDidMount = () => {
        console.log("Formation Mounting")
        this.getTeam();
        this.props.navigation.addListener(
            'focus',
            () => {
                console.log("Focus")
                this.getTeam();
            }
        );
    }

    getTeam = () => {
        console.log("PitchFormation Calling getTeam with id", this.state.team.id);
        if (this.state.team.id !== "") {
            const team = this.teamRepo.getTeam(this.state.team.id);
            if (team.formation.name === "") {
                team.updateFormation(this.state.defaultFormations[0]);
            }
            console.log("response getTeam", team);
            this.setState({ team: team, newFormationName: team.formation.name });
        }
    }

    updateSelectedFormation = (formationSelectedName: string) => {
        const foundFormation = this.state.defaultFormations.filter(formation => formation.name === formationSelectedName);
        if (foundFormation && foundFormation.length > 0) {
            const team = Team.copy(this.state.team);
            team.updateFormation(foundFormation[0]);

            this.setState({ team, newFormationName: formationSelectedName })
        }
    }

    saveFormation = () => {
        console.log("saveFormation")
        const team = Team.copy(this.state.team);

        team.updateFormationName(this.state.newFormationName);
        const formation = team.formation;
        this.teamRepo.saveTeam(team);
        this.formationRepo.saveFormation(formation);
        const defaultFormations = this.formationRepo.getFormations();

        console.log("saveFormation 2 ", defaultFormations)

        this.setState({ team: team, defaultFormations: defaultFormations });
        this.toogleModal();
    }

    toogleModal = () => {
        this.setState({ modalOpen: !this.state.modalOpen });
    }

    onNewFormationNameChanged = (newName: string) => {
        this.setState({ newFormationName: newName });
    }

    isFormationNameValid = (): boolean => {
        return Boolean(this.state.newFormationName) && (!this.state.team.formation.isTemplate || this.state.newFormationName !== this.state.team.formation.name)
    }

    getFormations = () => {
        const formations = this.state.defaultFormations;

        return formations.sort((a, b) => {
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0;
        });
    }

    setPitchDimensions = (event: any) => {
        const { x, y, height, width } = event.nativeEvent.layout;
        console.log("setPitchDimensions", x, y, height, width)
        this.setState({ pitchHeight: height, pitchWidth: width });
    }

    // TODO: Save Position of circles after move
    render() {
        return (
            <View style={styles.container}>
                <View style={{ flex: 1 }}>
                    <View style={styles.row}>
                        <View style={{ flex: 3 }}>
                            <Picker
                                selectedValue={this.state.team.formation.name}
                                onValueChange={(itemValue, itemIndex) => this.updateSelectedFormation(itemValue)}>
                                {this.getFormations().map(formation => {
                                    return <Picker.Item key={formation.name} label={formation.name} value={formation.name} />
                                })}
                            </Picker>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Button mode="contained" onPress={this.toogleModal}>Save</Button>
                        </View>
                    </View>
                </View>

                <View style={{ flex: 11 }} onLayout={this.setPitchDimensions}>
                    {this.state.pitchHeight > 0 &&
                        <PitchWithPlayers formation={this.state.team.formation} pitchHeight={this.state.pitchHeight} pitchWidth={this.state.pitchWidth} />
                    }
                </View>

                <Portal>
                    <Modal visible={this.state.modalOpen} onDismiss={this.toogleModal} contentContainerStyle={{ backgroundColor: 'white', padding: 20, height: 300 }}>
                        <Block style={{ flex: 1 }} title="Save Formation" actionEnabled={this.isFormationNameValid()} action1Title="Save" action1Press={this.saveFormation}>
                            <View style={styles.row}>
                                <View style={{ flex: 1 }} >
                                    <Text variant="labelLarge">Name</Text>
                                </View>
                                <View style={{ flex: 4 }} >
                                    <TextInput
                                        maxLength={25}
                                        mode="outlined"
                                        onEndEditing={(e) => this.onNewFormationNameChanged(e.nativeEvent.text)}
                                        placeholder={this.state.newFormationName}
                                    />
                                </View>
                            </View>
                        </Block>
                    </Modal>
                </Portal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.COLORS.GREY,
        margin: 5,
        // height: '100%'
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 5,
        textAlignVertical: 'top',
        verticalAlign: 'top'
    },
});
