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

    static buildBoard() {
        const squares: Square[] = [];

        const paddingX = innerWidth / 4;
        const paddingY = innerHeight / 4;
        const squareSize = 150;
        const spacing = squareSize;
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


    clickingOnSquare(x: number, y: number, player: Player): boolean {
        const square = this.getClickedSquare(x, y);
        if (!square) return false;

        square.marker = player.marker;
        return true;
    }

    getClickedSquare(x: number, y: number): Square {
        console.log({ x, y });

        for (const square of this.squares) {
            const isInXRange = x >= square.posX && x <= square.posX + square.size;
            const isInYRange = y >= square.posY && y <= square.posY + square.size;

            if (isInXRange && isInYRange) return square;
        }
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
        const rowWin = this.checkForWinRows(marker);
        const colWin = this.checkForWinColumns(marker);
        const diagWin = this.checkForWinDiagonal(marker);

        console.log({ rowWin, colWin, diagWin });

        return rowWin || colWin || diagWin;
    }

}