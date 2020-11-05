import {Team} from "../../../domain/Team";
import {TeamMemberDTO} from "./TeamMemberDTO";

export class TeamDTO {
    id?: number;
    name: string;
    emblemURL?: string;
    coaches?: TeamMemberDTO[];
    players?: TeamMemberDTO[];

    constructor(id: number, name: string, emblem: string) {
        this.id = id;
        this.name = name;
        this.emblemURL = emblem;
    }

    toTeam() : Team {
        let team = new Team(this.name, this.id || 0, this.emblemURL || "");
        team.players = this.players?this.players.map(memberDTO => memberDTO.toTeamMember()) : [];

        return team;
    }

}
