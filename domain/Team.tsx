import {TeamMember} from "./TeamMember";

export class Team {
    id: number;
    name: string;
    emblem: string;
    coaches: TeamMember[];
    players: TeamMember[]

    constructor(name: string, id: number, emblem: string) {
        this.name = name;
        this.id = id;
        this.emblem = emblem;
        this.coaches = [];
        this.players = [];
    }
}