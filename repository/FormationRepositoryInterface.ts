import { Formation } from "../domain/Formation";

export default interface FormationRepositoryInterface {
    getAllFormations: () => Formation[];
    saveFormation: (formation: Formation) => void;
}