import { Board } from './objects/board';
import { Canvas } from './objects/canvas';
import { Player } from './objects/player';
import { Square } from './objects/square';

export class Game {

  canvas: Canvas;
  board: Board;
  players: Player[] = [];
  currentPlayer: Player;
  isPlaying: boolean;

  constructor() {
    this.isPlaying = true;
    this.canvas = new Canvas();
    this.board = Board.buildBoard();
    this.players = Player.makeTwoPlayers('Colleen', 'Shawn');
    this.currentPlayer = this.players[0];
  }

  resetGame() {
    this.isPlaying = true;
    this.board = Board.buildBoard();
    this.currentPlayer = this.players[0];
    this.draw();
  }

  setupCanvas(): HTMLCanvasElement {
    return this.canvas.canvasElement;
  }

  // Entry for the game
  start() {
    window.addEventListener('click', (evt: MouseEvent) => {
      if (this.isPlaying) {
        if (this.board.clickingOnSquare(evt.clientX, evt.clientY, this.currentPlayer)) {
          this.run();
        }
      }
    });

    window.addEventListener('keyup', (evt: KeyboardEvent) => {
      if (evt.key === 'r') this.resetGame();
    });

    this.drawGrid();
  }

  run() {
    this.update();
    this.draw();
  }

  // ------------------- Updating/Mutation methods --------------------------
  update() {
    if (this.board.checkForWin(this.currentPlayer.marker)) this.endGame();
    this.changePlayer();
  }

  endGame() {
    this.isPlaying = false;
    console.log('game is over');
  }

  changePlayer(): void {
    this.currentPlayer = this.currentPlayer.marker === this.players[0].marker ? this.players[1] : this.players[0];
  }

  // ------------------- Drawing/Animation methods --------------------------
  draw(): void {
    this.clearRect();
    this.drawGrid();
    this.drawMarkers()
  }

  clearRect() {
    this.canvas.ctx.clearRect(0, 0, innerWidth, innerHeight);
  }

  drawGrid() {
    this.canvas.ctx.lineWidth = 10;
    const x = this.board.squares[4].posX
    const y = this.board.squares[4].posY
    const s = this.board.squares[4].size

    const line1Start = { x, y: y - s }
    const line1End = { x, y: y + (2 * s) }
    const line2Start = { x: x + s, y: y - s }
    const line2End = { x: x + s, y: y + (2 * s) }
    const line3Start = { x: x - s, y }
    const line3End = { x: x + (2 * s), y }
    const line4Start = { x: x - s, y: y + s }
    const line4End = { x: x + (2 * s), y: y + s }

    this.drawLine(line1Start.x, line1Start.y, line1End.x, line1End.y)
    this.drawLine(line2Start.x, line2Start.y, line2End.x, line2End.y)
    this.drawLine(line3Start.x, line3Start.y, line3End.x, line3End.y)
    this.drawLine(line4Start.x, line4Start.y, line4End.x, line4End.y)
  }

  drawMarkers() {
    this.board.squares.forEach((square: Square) => {
      if (square.marker === 'X') {
        this.drawX(square.posX, square.posY, square.size);
      } else if (square.marker === 'O') {
        this.drawO(square.posX, square.posY, square.size);
      }
    });
  }

  drawLine(x1: number, y1: number, x2: number, y2: number) {
    // this.canvas.ctx.lineCap = 'round';
    this.canvas.ctx.beginPath();
    this.canvas.ctx.moveTo(x1, y1);
    this.canvas.ctx.lineTo(x2, y2);
    this.canvas.ctx.closePath();
    this.canvas.ctx.stroke();
  }

  drawX(x: number, y: number, size: number) {
    const padding = 30;

    this.drawLine(x + padding, y + padding, x + size - padding, y + size - padding);
    this.drawLine(x + size - padding, y + padding, x + padding, y + size - padding);
  }

  drawO(x: number, y: number, size: number) {
    this.canvas.ctx.beginPath();
    this.canvas.ctx.arc(x + size / 2, y + size / 2, size / 3, 0, 2 * Math.PI);
    this.canvas.ctx.closePath();
    this.canvas.ctx.stroke();
  }

}