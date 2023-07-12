import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { TeamMember } from "./TeamMember";

export class Team {
    id: string = '';
    name: string = '';
    emblem: string = '';
    coaches: TeamMember[] = [];
    players: TeamMember[] = [];

    constructor() {}

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
        team.coaches = oldTeam.coaches
        team.players = oldTeam.players

        return team
    }

    static fromJSON(json: Object): Team {
        const plainTeam : Team = Object.assign(Team.emptyTeam(), json);
        const realTem : Team = Team.copy(plainTeam);
        return realTem
    }

    addPlayer(player: TeamMember) : boolean {
        let response = false
        const playerNoExists : boolean = this.players.filter(member => member.name === player.name).length === 0
        if (playerNoExists) {
            this.players.push(player);
            response = true;
        }

        return response;
    }
}
