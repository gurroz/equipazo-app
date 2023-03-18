import { Team } from "../domain/Team";
import { storage } from "./db";

const TEAM_KEY = 'team';
export default class TeamLocalDAO {
   
    constructor() {}
   
    getTeam(teamId: Number) {
      const jsonObj = storage.getString(TEAM_KEY + teamId)
      return JSON.parse(jsonObj || '');
    }

    setTeam(team: Team) {
      const key = TEAM_KEY + team.id
      storage.set(key, JSON.stringify(team))
    }
}