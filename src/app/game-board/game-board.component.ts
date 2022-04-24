import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import boardConstants from '../constants/board.constant';
import { GameLogicService } from '../game-logic.service';
import Board from '../types/Board';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css'],
})
export class GameBoardComponent implements AfterViewInit {
  @ViewChild('gameBoard', { static: false })
  canvas!: ElementRef<HTMLCanvasElement>;

  private numRows: number =
    boardConstants.BOARD_HEIGHT / boardConstants.RESOLUTION;
  private numCols: number =
    boardConstants.BOARD_WIDTH / boardConstants.RESOLUTION;
  private board: Board;
  private ctx!: CanvasRenderingContext2D;

  gen = 0;

  constructor(private service: GameLogicService) {
    this.board = new Array(this.numRows)
      .fill(null)
      .map(() => new Array(this.numCols).fill(0).map(this.oneOrZero));
  }

  ngAfterViewInit(): void {
    this.canvas.nativeElement.width = boardConstants.BOARD_WIDTH;
    this.canvas.nativeElement.height = boardConstants.BOARD_HEIGHT;

    this.ctx = this.canvas.nativeElement.getContext('2d')!;

    this.run();
  }

  private run = (): void => {
    this.gen++;
    this.board = this.service.nextGen(this.board);
    this.service.render(this.board, this.ctx);
    setTimeout(this.run, 1);
  };

  private oneOrZero = () => (Math.random() > 0.5 ? true : false);
}
