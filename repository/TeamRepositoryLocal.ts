import { Team } from "../domain/Team";
import TeamLocalDAO from "./TeamLocalDAO";
import TeamRepositoryInterface from "./TeamRepositoryInterface";

export default class TeamRepositoryLocal implements TeamRepositoryInterface {

    localDao: TeamLocalDAO;
    constructor() {
        this.localDao = new TeamLocalDAO();
    }

    getTeams(): Team[]  {
        return this.localDao.getTeams()
    }

    getTeam(teamId: string): Team  {
        return this.localDao.getTeam(teamId) 
    }

    saveTeam(team: Team) {
        this.localDao.setTeam(team)
    }
}