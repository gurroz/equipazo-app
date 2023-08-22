import { Position } from "./Position";
import { TeamMember } from "./TeamMember";

export class FormationPosition {
    position: Position;
    row: number;
    column: number;
    player?: TeamMember;

    constructor(position: Position, row: number, column:number) {
        this.position = position;
        this.row = row;
        this.column = column;
    }

}