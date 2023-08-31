import { Position } from "./Position";
import { TeamMember } from "./TeamMember";

export class FormationPosition {
    position: Position;
    row: number;
    column: number;
    coordX?: number;
    coordY?: number;
    player?: TeamMember;

    constructor(position: Position, row: number, column:number) {
        this.position = position;
        this.row = row;
        this.column = column;
    }

    // Check if defined
    getPositionCoordX = () => {
        return this.coordX ? this.coordX : (this.column * 70) + 20;
    }

    getPositionCoordY = () => {
        return this.coordY? this.coordY : (this.row * 100) + 20;
    }
}