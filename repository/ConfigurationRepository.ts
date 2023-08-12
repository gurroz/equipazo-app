import { Configuration } from "./Configuration";
import ConfigurationInterface from "./ConfigurationRepositoryInterface";
import ConfigurationRepositoryLocal from "./ConfigurationRepositoryLocal";

export default class ConfigurationRepository {

    private static instance: ConfigurationRepository;
    private repositories: Map<boolean, ConfigurationInterface>;

    private constructor() {
        this.repositories = new Map<boolean, ConfigurationInterface>();
        this.repositories.set(true, new ConfigurationRepositoryLocal());
    }

    public static getInstance(): ConfigurationRepository {
        if (!ConfigurationRepository.instance) {
            ConfigurationRepository.instance = new ConfigurationRepository();
        }

        return ConfigurationRepository.instance;
    }

    public getConfig(): Configuration {
        const isOnline: boolean = this.getNetworkStatus();
        const repo: ConfigurationInterface = this.repositories.get(isOnline)!;
        return repo.getConfig();
    }

    public saveConfig(config: Configuration): void {
        const isOnline: boolean = this.getNetworkStatus();
        const repo: ConfigurationInterface = this.repositories.get(isOnline)!;
        repo.saveConfig(config);
    }

    // TODO: get from network status
    private getNetworkStatus(): boolean {
        return true
    }
}