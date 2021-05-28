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

  setupCanvas(): HTMLCanvasElement {
    return this.canvas.canvasElement;
  }

  // Entry for the game
  start() {
    window.addEventListener('click', (evt: MouseEvent) => console.log(`xPos: ${evt.clientX}`, `yPos: ${evt.clientY}`))
    // console.log('Starting Game');
    this.run();
  }

  run() {
    if (this.isPlaying) {
      this.update();
      this.draw();
    } else {
      console.log('game is over');
    }
  }

  // ------------------- Updating/Mutation methods --------------------------
  update() {
    this.isPlaying = !this.board.checkForWin;
  }


  // ------------------- Drawing/Animation methods --------------------------
  clearRect() {
    this.canvas.ctx.clearRect(0, 0, innerWidth, innerHeight);
  }

  draw(): void {
    this.clearRect();

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


    this.canvas.ctx.lineWidth = 10;

    // drawLine TODO: make this method
    this.canvas.ctx.beginPath();
    this.canvas.ctx.moveTo(line1Start.x, line1Start.y);
    this.canvas.ctx.lineTo(line1End.x, line1End.y);
    this.canvas.ctx.moveTo(line2Start.x, line2Start.y);
    this.canvas.ctx.lineTo(line2End.x, line2End.y);
    this.canvas.ctx.moveTo(line3Start.x, line3Start.y);
    this.canvas.ctx.lineTo(line3End.x, line3End.y);
    this.canvas.ctx.moveTo(line4Start.x, line4Start.y);
    this.canvas.ctx.lineTo(line4End.x, line4End.y);
    // this.canvas.ctx.lineTo(250, 140);
    this.canvas.ctx.closePath();
    this.canvas.ctx.stroke();


    // this.canvas.ctx.lineWidth = 1;
    // this.board.squares.forEach((square: Square) => {
    //   this.canvas.ctx.strokeRect(square.posX, square.posY, square.size, square.size);
    // });
  }

}