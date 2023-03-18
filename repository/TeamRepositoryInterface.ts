import { Team } from "../domain/Team";

export default interface TeamRepositoryInterface {

    getTeam: (teamId: Number) => Team; 
    saveTeam: (team: Team) => void;
}