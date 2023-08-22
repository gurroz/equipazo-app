import { Team } from "../domain/Team";
import FormationRepositoryInterface from "./FormationRepositoryInterface";
import FormationRepositoryLocal from "./FormationRepositoryLocal";
import TeamRepositoryInterface from "./TeamRepositoryInterface";
import TeamRepositoryLocal from "./TeamRepositoryLocal";
import TeamRepositoryRemote from "./TeamRepositoryRemote";

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

}