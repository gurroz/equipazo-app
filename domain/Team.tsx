import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { TeamMember } from "./TeamMember";

export class Team {
    id: string = '';
    name: string = '';
    emblem: string = '';
    members: TeamMember[] = [];
    fieldPlayers: number = 0;
    benchPlayers: number = 0;

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
        team.members = oldTeam.members

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
}
