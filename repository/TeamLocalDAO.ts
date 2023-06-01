import { Team } from "../domain/Team";
import teamStorage from "./storage";

export default class TeamLocalDAO {
  private storage: any;
  constructor() {
    this.storage = teamStorage
  }

  getTeams(): Team[] {
    const jsonObj = JSON.stringify(this.storage.getAllKeys())
    console.log("GEtting teams:", jsonObj)
    let teamsId: string[] = JSON.parse(jsonObj || '')
    if (teamsId && (teamsId.length > 0)) {
      console.log("GEtting teams 3:", teamsId)
      return teamsId.map(id => {
        return Team.fromJSON(JSON.parse(this.storage.getString(id)))
      })
    } else {
      let teamResponse: Team = Team.emptyTeam();
      return [teamResponse]
    }
  }

  getTeam(teamId: string): Team {
    const jsonObj = this.storage.getString(teamId)
    console.log("GEtting team", teamId, jsonObj)

    let team: Team = Team.fromJSON(JSON.parse(jsonObj || ''))
    console.log("GEtting team2:", team, (team instanceof Team))

    if (team) {
      return team
    } else {
      let team: Team = Team.emptyTeam();
      return team
    }
  }

  setTeam(team: Team) {
    const key = team.id
    console.log("setTeam", team)
    this.storage.set(key, JSON.stringify(team))
  }
}