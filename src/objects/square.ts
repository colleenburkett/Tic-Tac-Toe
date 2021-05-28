export class Square {
    marker: 'X' | 'O';
    posX: number;
    posY: number;
    size: number;

    constructor(posX: number, posY: number, size: number) {
        this.posX = posX;
        this.posY = posY;
        this.size = size;
    }
}


