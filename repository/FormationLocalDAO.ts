import { Formation } from "../domain/Formation";
import { formationsStorage } from "./storage";

export default class FormationLocalDAO {
  private storage: any;
  constructor() {
    this.storage = formationsStorage
  }

  getTemplateFormations(): Formation[] {
    const jsonObj = JSON.stringify(this.storage.getAllKeys())
    console.log("GEtting formations:", jsonObj)
    let formationsId: string[] = JSON.parse(jsonObj || '')
    if (formationsId && (formationsId.length > 0)) {
      console.log("GEtting formations 3:", formationsId)
      return formationsId.map(id => {
        return  Formation.getFromJSON(JSON.parse(this.storage.getString(id)))
      })
    } else {
      return []
    }
  }

  saveFormation(formation: Formation) {
    console.log("Saving config", formation, JSON.stringify(formation))

    this.storage.set(formation.name, JSON.stringify(formation))
  }
}