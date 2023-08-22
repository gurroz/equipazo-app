import { Formation } from "../domain/Formation";

export default interface FormationRepositoryInterface {

    getTemplatesFormations: () => Formation[];
    saveFormation: (formation: Formation) => void;
}