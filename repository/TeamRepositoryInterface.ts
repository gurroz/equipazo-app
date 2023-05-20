import { Team } from "../domain/Team";

export default interface TeamRepositoryInterface {

    getTeam: (teamId: string) => Team;
    getTeams: () => Team[];  
    saveTeam: (team: Team) => void;
}