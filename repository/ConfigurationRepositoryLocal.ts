import { Configuration } from "./Configuration";
import ConfigurationLocalDAO from "./ConfigurationLocalDAO";
import ConfigurationRepositoryInterface from "./ConfigurationRepositoryInterface";

export default class ConfigurationRepositoryLocal implements ConfigurationRepositoryInterface {

    localDao: ConfigurationLocalDAO;
    constructor() {
        this.localDao = new ConfigurationLocalDAO();
    }

    getConfig(): Configuration {
        return this.localDao.getConfig();
    }

    saveConfig(config: Configuration) {
        this.localDao.setConfig(config);
    }
}