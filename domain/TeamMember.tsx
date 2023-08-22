import { v4 as uuidv4 } from 'uuid';
import { Position } from './Position';

export class TeamMember {
    id: string = '';
    name: string = '';
    picture: string = '';
    mobile: string = '';
    isPlayer: boolean = false;
    isCoach: boolean = false;
    positions: Position[] = [];

    constructor() {}

    static emptyTeamMember() {
        return new TeamMember();
    }

    static copy(teamMember: TeamMember) {
        const copyTeamMember = new TeamMember();
        copyTeamMember.id = teamMember.id;
        copyTeamMember.name = teamMember.name;
        copyTeamMember.mobile = teamMember.mobile;
        copyTeamMember.picture = teamMember.picture;
        copyTeamMember.isPlayer = teamMember.isPlayer;
        copyTeamMember.isCoach = teamMember.isCoach;
        copyTeamMember.positions = Object.assign([], teamMember.positions);

        return copyTeamMember;
    }

    static newTeamMember(teamMember: TeamMember) {
        const copyTeamMember = TeamMember.copy(teamMember);
        copyTeamMember.id = uuidv4();

        return copyTeamMember;
    }

    static newTeamMemberWithId(name: string, mobile: string, picture: string) {
        const newTeamMember = TeamMember.emptyTeamMember();
        newTeamMember.id = uuidv4();
        newTeamMember.name = name;
        newTeamMember.mobile = mobile;
        newTeamMember.picture = picture;

        return newTeamMember;
    }

    hasPosition = (position: Position) : boolean => {
        return this.positions.includes(position);
    }
}