export class Configuration {
    teamSelected: string = '';

    constructor() {}

    static newConfig(teamSelected: string): Configuration {
        const conf: Configuration = new Configuration()
        conf.teamSelected = teamSelected;
        return conf;
    }

    static emptyConf() {
        return new Configuration();
    }

    static fromJSON(json: Object): Configuration {
        console.log("ParsingShit", json)
        const plainConf: Configuration = Object.assign(Configuration.emptyConf(), json);
        console.log("plainConf", plainConf)

        const realConf: Configuration = Configuration.newConfig(plainConf.teamSelected);
        return realConf
    }

}