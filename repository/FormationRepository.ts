import { Formation } from "../domain/Formation";
import FormationRepositoryInterface from "./FormationRepositoryInterface";
import FormationRepositoryLocal from "./FormationRepositoryLocal";

export default class FormationRepository {

    private static instance: FormationRepository;
    private repositories: Map<boolean, FormationRepositoryInterface>;

    private constructor() {
        this.repositories = new Map<boolean, FormationRepositoryInterface>();
        this.repositories.set(true, new FormationRepositoryLocal());
    }

    public static getInstance(): FormationRepository {
        if (!FormationRepository.instance) {
            FormationRepository.instance = new FormationRepository();
        }

        return FormationRepository.instance;
    }

    public saveFormation(formation: Formation) {
        const repo: FormationRepositoryInterface = this.repositories.get(true)!;
        repo.saveFormation(formation);
    }

    public getFormations() : Formation[] {
        const repo: FormationRepositoryInterface = this.repositories.get(true)!;
        return repo.getAllFormations();
    }
}