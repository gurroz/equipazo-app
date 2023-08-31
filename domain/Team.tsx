import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { TeamMember } from "./TeamMember";
import { Formation } from './Formation';

export class Team {
    id: string = '';
    name: string = '';
    emblem: string = '';
    members: TeamMember[] = [];
    fieldPlayers: number = 0;
    benchPlayers: number = 0;
    formation: Formation = new Formation("", false);

    constructor() { }

    static emptyTeam() {
        return new Team();
    }

    static newTeam(name: string, emblem: string) {
        const team = new Team();
        team.id = uuidv4();
        team.name = name;
        team.emblem = emblem;

        return team;
    }

    static newTeamWithId(id: string, name: string, emblem: string) {
        const team = new Team();
        team.id = id;
        team.name = name;
        team.emblem = emblem;

        return team;
    }

    static copy(oldTeam: Team) {
        const team = Team.newTeamWithId(oldTeam.id, oldTeam.name, oldTeam.emblem);
        const teamMembers : TeamMember[] = [];
        oldTeam.members.forEach(teamMember => {
            teamMembers.push(Object.assign(TeamMember.emptyTeamMember(), teamMember));
        })
        team.members = teamMembers;
        team.fieldPlayers = oldTeam.fieldPlayers;
        team.benchPlayers = oldTeam.benchPlayers;
        team.formation = new Formation("", false).copy(oldTeam.formation);

        return team
    }

    static fromJSON(json: Object): Team {
        const plainTeam: Team = Object.assign(Team.emptyTeam(), json);
        const realTem: Team = Team.copy(plainTeam);
        return realTem
    }

    addPlayer(player: TeamMember): boolean {
        this.members = this.members.filter(member => member.id !== player.id)
        let response = false
        const playerNoExists: boolean = this.members.filter(member => member.name === player.name).length === 0
        if (playerNoExists) {
            this.members.push(player);
            response = true;
        }

        return response;
    }

    getTeamMember(memberId: string): TeamMember {
        const player: TeamMember = this.members.filter(member => member.id === memberId)[0]
        if (player) {
            return player
        }

        return TeamMember.emptyTeamMember();
    }

    getTeamMembers(): TeamMember[] {
        return this.members ? this.members.sort((m1, m2) => {
            if (m1.name < m2.name) {
                return -1;
            }
            if (m1.name > m2.name) {
                return 1;
            }

            return 0;
        }) : []
    }

    updateFormation = (newFormation: Formation) => {
        this.formation = Object.assign({}, newFormation);
        if(this.formation) {
            console.log("updateFormation", this.formation.playersPositions)
            this.formation.resetPositions();
            console.log("updateFormation", this.formation.playersPositions)

            const players = this.getTeamMembers();

            players.forEach(player => {
                this.formation.addPlayerToPosition(player);
            });
        }
    }

    updateFormationName = (name: string) => {
        if(this.formation) {
            this.formation.name = name;
            this.formation.isTemplate = false;
        }
    }
}
