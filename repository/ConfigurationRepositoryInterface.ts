import { Configuration } from "./Configuration";

export default interface ConfigurationRepositoryInterface {

    getConfig: () => Configuration;
    saveConfig: (config: Configuration) => void;
}