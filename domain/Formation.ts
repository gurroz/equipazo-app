import { FormationPosition } from "./FormationPosition";
import { Position } from "./Position";
import { Serializable } from "./Serializable";
import { TeamMember } from "./TeamMember";

export class Formation extends Serializable<Formation>{
    name: string = '';
    isTemplate: boolean = false;
    playersPositions: FormationPosition[] = [];

    constructor(name: string, isTemplate: boolean) {
        super();
        this.name = name;
        this.isTemplate = isTemplate;
        this.playersPositions = [];
    }

    addPlayersPosition = (playersPosition: FormationPosition) => {
        this.playersPositions?.push(playersPosition);
    }

    /**
     * Adds the player to the prefered position, if not already assigned in other position.
     */
    addPlayerToPosition = (player: TeamMember) => {
        const usedPlayers = this.playersPositions.filter(playerPosition => playerPosition.player).map(playerPosition => playerPosition.player?.id);
        const newPlayerPositions = this.playersPositions.map(playerPosition => {
            if(!playerPosition.player && !usedPlayers.includes(player.id) && player.hasPosition(playerPosition.position)) {
                playerPosition.player = player;
                usedPlayers.push(player.id);
            }

            return playerPosition
        })

        this.playersPositions = newPlayerPositions;
    }

    resetPositions = () => {
        this.playersPositions.forEach(playerPosition => {
            playerPosition.coordX = undefined;
            playerPosition.coordY = undefined;
        })
    }

    copy = (obj: Formation): Formation => {
        const newFormation = this.emptyObj();
        newFormation.isTemplate = obj.isTemplate;
        newFormation.playersPositions = obj.playersPositions.map(pp => Object.assign(new FormationPosition(Position.RF,0,0), pp))
        newFormation.name = obj.name;

        return newFormation;
    }

    emptyObj = (): Formation => {
        return new Formation("", false);
    }

    static getFromJSON = (json: object): Formation => {
        const newFormaiton = new Formation("", false);
        return newFormaiton.fromJSON(json);
    }

    static generateTemplates = (): Formation[] => {
        const result = [];
        const formation442 = new Formation("4-4-2", true);
        formation442.addPlayersPosition(new FormationPosition(Position.GK, 0, 2))
        formation442.addPlayersPosition(new FormationPosition(Position.LB, 1, 0))
        formation442.addPlayersPosition(new FormationPosition(Position.CB, 1, 1))
        formation442.addPlayersPosition(new FormationPosition(Position.CB, 1, 3))
        formation442.addPlayersPosition(new FormationPosition(Position.RB, 1, 4))
        formation442.addPlayersPosition(new FormationPosition(Position.DM, 2, 1))
        formation442.addPlayersPosition(new FormationPosition(Position.DM, 2, 3))
        formation442.addPlayersPosition(new FormationPosition(Position.CM, 3, 1))
        formation442.addPlayersPosition(new FormationPosition(Position.AM, 3, 3))
        formation442.addPlayersPosition(new FormationPosition(Position.CF, 4, 1))
        formation442.addPlayersPosition(new FormationPosition(Position.CF, 4, 3))

        result.push(formation442);

        const formation433 = new Formation("4-3-3", true);
        formation433.addPlayersPosition(new FormationPosition(Position.GK, 0, 2))
        formation433.addPlayersPosition(new FormationPosition(Position.LB, 1, 0))
        formation433.addPlayersPosition(new FormationPosition(Position.CB, 1, 1))
        formation433.addPlayersPosition(new FormationPosition(Position.CB, 1, 3))
        formation433.addPlayersPosition(new FormationPosition(Position.RB, 1, 4))
        formation433.addPlayersPosition(new FormationPosition(Position.DM, 2, 1))
        formation433.addPlayersPosition(new FormationPosition(Position.DM, 2, 3))
        formation433.addPlayersPosition(new FormationPosition(Position.CM, 3, 2))
        formation433.addPlayersPosition(new FormationPosition(Position.LF, 4, 0))
        formation433.addPlayersPosition(new FormationPosition(Position.CF, 4, 2))
        formation433.addPlayersPosition(new FormationPosition(Position.LB, 4, 4))

        result.push(formation433);

        return result
    }
}