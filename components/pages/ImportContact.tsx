import React, { Component } from "react";
import { PermissionsAndroid, ScrollView, StyleSheet, View } from "react-native";
import Contacts from 'react-native-contacts';
import { Button, List, Searchbar, Surface } from 'react-native-paper';
import { Team } from "../../domain/Team";
import TeamRepository from "../../repository/TeamRepository";
import { ImportContactsProps } from "../app/Router";
import { TeamMember } from "../../domain/TeamMember";
import TeamMemberList from "../common/TeamMemberList";

type ImportContactsState = {
    contacts: Array<ContactTeamMember>
    , team: Team
    , query: any
}

type ContactTeamMember = {
    teamMember: TeamMember,
    selected: boolean
}
export class ImportContact extends Component<ImportContactsProps, ImportContactsState> {
    private teamRepo: TeamRepository;
    constructor(props: ImportContactsProps) {
        super(props);

        console.log("ImportContact", props.route.params.teamId)
        const team = Team.emptyTeam()
        team.id = props.route.params.teamId
        this.teamRepo = TeamRepository.getInstance();

        this.state = {
            team: team
            , contacts: []
            , query: ""
        };
    }

    componentDidMount = () => {
        this.getTeam();
        this.importContacts();
    }

    getTeam = () => {
        console.log("Calling getTeam with id", this.state.team.id);
        const team = this.teamRepo.getTeam(this.state.team.id);
        console.log("response getTeam", team);

        this.setState({ team });
    }

    importContacts = () => {
        PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
            {
                'title': 'Contacts',
                'message': 'This app would like to view your contacts.',
                'buttonPositive': 'Please accept bare mortal'
            }
        ).then(() => {
            Contacts.getAll()
                .then((contacts) => {
                    const filteredContacts = contacts.map(contact => {
                        const mobile = contact.phoneNumbers && contact.phoneNumbers.length > 0? contact.phoneNumbers[0].number.replace(" ","").trim() : ""
                        return {
                            teamMember: new TeamMember(contact.displayName, contact.thumbnailPath, mobile),
                            selected: false
                        }
                    })
                    this.setState({ contacts: filteredContacts })
                })
                .catch((e) => {
                    console.log("EROR 1", e)
                })
        }).catch((e) => {
            console.log("EROR 2", e)
        })
    }

    onSelectContact = (id: string) => {
        const filteredContacts = this.state.contacts.filter((contact: ContactTeamMember) => {
            if (id === contact.teamMember.id) {
                contact.selected = !contact.selected
            }
            return contact
        })
        this.setState({ contacts: filteredContacts })
    }

    renderContactDetail = () => {
        if (this.state.contacts) {
            const filterValue = this.state.query ? this.state.query.toLowerCase() : ""
            return this.state.contacts
                .filter((contact: ContactTeamMember) => contact.teamMember.name.toLowerCase().includes(filterValue))
                .map((contact: ContactTeamMember) => {
                    return (
                        <TeamMemberList key={contact.teamMember.id} member={contact.teamMember} isSelected={contact.selected} onSelect={this.onSelectContact}/>
                    )
                })
        } else {
            return (<></>)
        }

    }

    onChangeSearch = (query: string) => {
        this.setState({ query });
    }

    importContact = () => {
        const team: Team = this.state.team;
        this.state.contacts.forEach((contact: ContactTeamMember) => {
            if(contact.selected) {
                team.addPlayer(contact.teamMember)
            }
        });

        this.teamRepo.saveTeam(team)
        this.props.navigation.navigate('MyTeam', {teamId: team.id, contactsImported: new Date().getTime() });
    }

    render() {
        return (
            <View style={styles.container}>
                <Searchbar
                    placeholder="Search"
                    onChangeText={this.onChangeSearch}
                    value={this.state.query}
                />
                <Button icon="camera" mode="contained" onPress={this.importContact}>
                    Import
                </Button>
                <ScrollView>
                    {this.renderContactDetail()}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: 20,
        backgroundColor: '#ecf0f1',
        padding: 8,
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },

});