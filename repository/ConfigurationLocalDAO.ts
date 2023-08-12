import { Configuration } from "./Configuration";
import { configStorage } from "./storage";

export default class ConfigurationLocalDAO {
  private storage: any;
  constructor() {
    this.storage = configStorage
  }

  getConfig(): Configuration {
    const jsonObj = this.storage.getString("config")
    console.log("Returnig jsonObj", jsonObj)

    let config: Configuration = Configuration.fromJSON(JSON.parse(jsonObj || ''))

    console.log("Returnig config", config)
    return config
  }

  setConfig(config: Configuration) {
    console.log("Saving config", config, JSON.stringify(config))

    this.storage.set("config", JSON.stringify(config))
  }
}