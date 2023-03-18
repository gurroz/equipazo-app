import {TeamMember} from "../domain/TeamMember";

export class TeamMemberDTO {
    id: number | undefined;
    name: string;
    picture: any;
    mobile: string;
    type: string;

    constructor(name: string, picture: any, mobile: string) {
        this.name = name;
        this.mobile = mobile;
        this.picture = picture;
        this.type = "";
    }
    public isValid = () => {
        if(!this.name) {
            return false;
        }
        return true;
    }

    public toTeamMember = ()=> {
        return new TeamMember(this.name, this.picture, this.mobile);
    }

    public static fromTeamMember = (teamMember : TeamMember)=> {
        return new TeamMemberDTO(teamMember.name, teamMember.picture, teamMember.mobile);
    }
}
