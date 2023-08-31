import { Formation } from "../domain/Formation";
import { formationsStorage } from "./storage";

export default class FormationLocalDAO {
  private storage: any;
  constructor() {
    this.storage = formationsStorage
  }

  getAllFormations(): Formation[] {
    const jsonObj = JSON.stringify(this.storage.getAllKeys())
    let formationsId: string[] = JSON.parse(jsonObj || '')
    const allFormations = Formation.generateTemplates(); // TODO: This should be moved to the init process
    if(formationsId && formationsId.length > 0) {
      formationsId.forEach(id => {
        allFormations.push(Formation.getFromJSON(JSON.parse(this.storage.getString(id))))
      })
    }
    

    return allFormations
  }

  saveFormation(formation: Formation) {
    this.storage.set(formation.name, JSON.stringify(formation))
  }
}