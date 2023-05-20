import {TeamMember} from "./TeamMember";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export class Team {
    id: string = '';
    name: string = '';
    emblem: string = '';
    coaches: TeamMember[] = [];
    players: TeamMember[] = []

    public static emptyTeam() {
        return new Team();
    }

    public static newTeam(name: string, emblem: string) {
        const team = new Team();
        team.id = uuidv4();
        team.name = name;
        team.emblem = emblem;

        return team;
    }

    public static newTeamWithId(id: string, name: string, emblem: string) {
        const team = new Team();
        team.id = id;
        team.name = name;
        team.emblem = emblem;

        return team;
    }
}
