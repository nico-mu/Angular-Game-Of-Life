import { Injectable } from '@angular/core';
import boardConstants from './constants/board.constant';
import Board from './types/Board';

@Injectable({
  providedIn: 'root',
})
export class GameLogicService {
  constructor() {}

  render = (board: Board, ctx: CanvasRenderingContext2D): void => {
    board.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        ctx.beginPath();
        ctx.rect(
          colIndex * boardConstants.RESOLUTION,
          rowIndex * boardConstants.RESOLUTION,
          boardConstants.RESOLUTION,
          boardConstants.RESOLUTION
        );
        ctx.fillStyle = col ? 'black' : 'white';
        ctx.fill();
        //ctx.stroke();
      });
    });
    console.log('Rendering');
  };

  nextGen = (board: Board): Board => {
    const nextGenBoard: Board = new Array(board.length)
      .fill(null)
      .map(() => new Array(board[0].length).fill(0));

    board.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        const numNeighbors = this.getNumNeighbors(board, rowIndex, colIndex);
        if (col) {
          if (numNeighbors < 2 || numNeighbors > 3) {
            nextGenBoard[rowIndex][colIndex] = false;
          } else {
            nextGenBoard[rowIndex][colIndex] = true;
          }
        } else {
          if (numNeighbors === 3) {
            nextGenBoard[rowIndex][colIndex] = true;
          }
        }
      });
    });

    return nextGenBoard;
  };

  private getNumNeighbors = (
    board: Board,
    rowIndex: number,
    colIndex: number
  ): number => {
    let numNeighbors = 0;
    for (let i = rowIndex - 1; i <= rowIndex + 1; i++) {
      for (let j = colIndex - 1; j <= colIndex + 1; j++) {
        if (i >= 0 && i < board.length && j >= 0 && j < board[0].length) {
          if (i !== rowIndex || j !== colIndex) {
            numNeighbors += board[i][j] ? 1 : 0;
          }
        }
      }
    }
    return numNeighbors;
  };
}
