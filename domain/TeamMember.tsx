export class TeamMember {
    name: string;
    picture: string;
    mobile: string;
    synchronized: boolean;

    constructor(name: string, picture: string, mobile: string) {
        this.name = name;
        this.mobile = mobile;
        this.picture = picture;
        this.synchronized = true;
    }
}