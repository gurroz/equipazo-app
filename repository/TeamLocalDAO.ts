import { Team } from "../domain/Team";
import { teamStorage } from "./storage";

export default class TeamLocalDAO {
  private storage: any;
  constructor() {
    this.storage = teamStorage
  }

  getTeams(): Team[] {
    const jsonObj = JSON.stringify(this.storage.getAllKeys())
    let teamsId: string[] = JSON.parse(jsonObj || '')
    if (teamsId && (teamsId.length > 0)) {
      return teamsId.map(id => {
        return Team.fromJSON(JSON.parse(this.storage.getString(id)))
      })
    } else {
      return []
    }
  }

  getTeam(teamId: string): Team {
    const jsonObj = this.storage.getString(teamId)
    let team: Team = Team.fromJSON(JSON.parse(jsonObj || ''))

    if (team) {
      return team
    } else {
      return Team.emptyTeam()
    }
  }

  setTeam(team: Team) {
    const key = team.id
    console.log("setTeam", team)
    this.storage.set(key, JSON.stringify(team))
  }
}