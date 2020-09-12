export class Player {
    name: string;
    jersey: number;
    position: [];

    constructor(name: string, jersey: number, position: any) {
        this.name = name;
        this.jersey = jersey;
        this.position = position;
    }
}