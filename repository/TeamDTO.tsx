import {Team} from "../domain/Team";
import {TeamMemberDTO} from "./TeamMemberDTO";

export class TeamDTO {
    id?: string;
    name: string;
    emblemURL?: string;
    coaches?: TeamMemberDTO[];
    players?: TeamMemberDTO[];

    constructor(id: string, name: string, emblem: string) {
        this.id = id;
        this.name = name;
        this.emblemURL = emblem;
    }

    toTeam() : Team {
        const name = this.name || "";
        const pic = this.emblemURL || "";
        const id = this.id || "";
        let team = new Team(name, pic, id);
        team.players = this.players ? this.players.map(memberDTO => memberDTO.toTeamMember()) : [];

        return team;
    }

}
