import { Canvas } from "./canvas";
import { Player } from "./player";
import { Square } from "./square";


export class Board {

    static squareLimit = 9;
    static winConditions = {
        rows: [[0, 1, 2], [3, 4, 5], [6, 7, 8]],
        cols: [[0, 3, 6], [1, 4, 7], [2, 5, 8]],
        diags: [[0, 4, 8], [2, 4, 6]]
    }

    static buildBoard() { // Board.buildBoard()
        const squares: Square[] = [];

        const paddingX = innerWidth / 4;
        const paddingY = innerHeight / 4;
        const squareSize = 150;
        const buffer = 3;
        const spacing = squareSize + buffer;
        let posX: number;
        let posY: number;


        for (let i = 0; i < Board.squareLimit; i++) {

            const x = i % 3;
            const y = Math.floor(i / 3);
            posX = paddingX + (x * spacing);
            posY = paddingY + (y * spacing)

            squares.push(new Square(posX, posY, squareSize))
        }
        return new Board(squares);
    }

    squares: Square[] = [];


    constructor(squares: Square[]) {
        this.squares = squares;
    }


    clickingOnSquare() {


    }


    drawXAndO(marker: 'X' | 'O') {

    }


    playerChange(name1: 'X', name2: 'O') {

        let startingplayer = 'X'

        return startingplayer = startingplayer === 'X' ? 'O' : 'X';
    }



    checkForWinRows(marker: 'X' | 'O'): boolean {
        return Board.winConditions.rows.some((row: []) => {
            return row.every((idx: number) => this.squares[idx].marker === marker)
        });
    }


    checkForWinColumns(marker: 'X' | 'O'): boolean {
        return Board.winConditions.cols.some((col: []) => {
            return col.every((idx: number) => this.squares[idx].marker === marker)
        });
    }

    checkForWinDiagonal(marker: 'X' | 'O'): boolean {
        return Board.winConditions.diags.some((diag: []) => {
            return diag.every((idx: number) => this.squares[idx].marker === marker)
        });
    }

    checkForWin(marker: 'X' | 'O'): boolean {
        return this.checkForWinRows(marker) ||
            this.checkForWinColumns(marker) ||
            this.checkForWinDiagonal(marker);
    }

}