import { Team } from "../domain/Team";
import TeamRepositoryInterface from "./TeamRepositoryInterface";
import TeamRepositoryLocal from "./TeamRepositoryLocal";
import TeamRepositoryRemote from "./TeamRepositoryRemote";

export default class TeamRepository {

    private static instance: TeamRepository;
    private repositories: Map<boolean, TeamRepositoryInterface>;

    private constructor() {
        this.repositories = new Map<boolean, TeamRepositoryInterface>();
        this.repositories.set(true, new TeamRepositoryLocal());
        this.repositories.set(false, new TeamRepositoryRemote());
    }

    public static getInstance(): TeamRepository {
        if (!TeamRepository.instance) {
            TeamRepository.instance = new TeamRepository();
        }

        return TeamRepository.instance;
    }

    public getTeam(teamId: Number): Team {
        const isOnline: boolean = this.getNetworkStatus();
        const repo: TeamRepositoryInterface = this.repositories.get(isOnline)!;
        return repo.getTeam(teamId);
    }

    public saveTeam(team: Team): void {
        const isOnline: boolean = this.getNetworkStatus();
        const repo: TeamRepositoryInterface = this.repositories.get(isOnline)!;
        repo.saveTeam(team);
    }

    // TODO: get from network status
    private getNetworkStatus(): boolean {
        return true
    }
}