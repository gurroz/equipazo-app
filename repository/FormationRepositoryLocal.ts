import { Formation } from "../domain/Formation";
import FormationLocalDAO from "./FormationLocalDAO";
import FormationRepositoryInterface from "./FormationRepositoryInterface";

export default class FormationRepositoryLocal implements FormationRepositoryInterface {

    localDao: FormationLocalDAO;
    constructor() {
        this.localDao = new FormationLocalDAO();
    }

    getTemplatesFormations = () => {
        return this.localDao.getTemplateFormations();
    }

    saveFormation = (formation: Formation) => {
        this.localDao.saveFormation(formation);
    }
}