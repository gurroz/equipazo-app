import { Configuration } from "../domain/Configuration";

export default interface ConfigurationRepositoryInterface {

    getConfig: () => Configuration;
    saveConfig: (config: Configuration) => void;
}