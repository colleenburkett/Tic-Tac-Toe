export class Player {

    static makeTwoPlayers(name1: string, name2: string): Player[] {
        return [new Player(name1, 'X'), new Player(name2, 'O')]
    }

    name: string;
    marker: 'X' | 'O'

    constructor(name: string, marker: 'X' | 'O') {
        this.name = name;
        this.marker = marker;
    }

}

