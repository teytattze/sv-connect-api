import { Injectable } from '@nestjs/common';
import { Nullable, Tuple } from '@sv-connect/core-common';
import { MunkresHelper } from './munkres.helper';
import { Matrix, MunkresStepFunc, MunkresSteps } from './munkres.types';

@Injectable()
export class MunkresAlgorithm {
  private matrix: Nullable<Matrix>;
  private n: number;
  private rowCovered: boolean[];
  private colCovered: boolean[];
  private zRow: number;
  private zCol: number;
  private marked: Nullable<Matrix>;
  private path: Nullable<Matrix>;

  constructor() {
    this.matrix = null;
    this.n = 0;
    this.rowCovered = [];
    this.colCovered = [];
    this.zRow = 0;
    this.zCol = 0;
    this.marked = null;
    this.path = null;
  }

  solve(costMatrix: Matrix): Matrix {
    this.matrix = MunkresHelper.padMatrix(costMatrix);
    this.n = this.matrix.length;

    const nFalseArray = [];
    while (nFalseArray.length < this.n) nFalseArray.push(false);
    this.rowCovered = nFalseArray.slice();
    this.colCovered = nFalseArray.slice();

    this.path = MunkresHelper.makeMatrix(this.n * 2, 0);
    this.marked = MunkresHelper.makeMatrix(this.n, 0);

    let step: MunkresSteps = 1;
    const steps: Record<MunkresSteps, Nullable<MunkresStepFunc>> = {
      1: this.stepOne,
      2: this.stepTwo,
      3: this.stepThree,
      4: this.stepFour,
      5: this.stepFive,
      6: this.stepSix,
      7: null,
    };

    const isDone = true;
    while (isDone) {
      const func: Nullable<MunkresStepFunc> = steps[step];
      if (!func) break;
      step = func.apply(this);
    }

    const oriRows = costMatrix.length;
    const oriCols = costMatrix[0].length;
    const results = [];
    for (let i = 0; i < oriRows; i++) {
      for (let j = 0; j < oriCols; j++) {
        if (this.marked[i][j] === 1) {
          results.push([i, j]);
        }
      }
    }

    return results;
  }

  private stepOne(): MunkresSteps {
    if (!this.matrix) return 7;
    for (let i = 0; i < this.n; i++) {
      const minVal = Math.min(...this.matrix[i]);
      for (let j = 0; j < this.n; j++) this.matrix[i][j] -= minVal;
    }
    return 2;
  }

  private stepTwo(): MunkresSteps {
    if (!this.matrix || !this.marked) return 7;
    for (let i = 0; i < this.n; i++) {
      for (let j = 0; j < this.n; j++) {
        if (
          this.matrix[i][j] === 0 &&
          !this.rowCovered[i] &&
          !this.colCovered[j]
        ) {
          this.marked[i][j] = 1;
          this.rowCovered[i] = true;
          this.colCovered[j] = true;
          break;
        }
      }
    }
    this.clearCovers();
    return 3;
  }

  private stepThree(): MunkresSteps {
    if (!this.marked) return 7;
    let count = 0;
    for (let i = 0; i < this.n; i++) {
      for (let j = 0; j < this.n; j++) {
        if (this.marked[i][j] === 1 && !this.colCovered[j]) {
          this.colCovered[j] = true;
          count++;
        }
      }
    }
    return count >= this.n ? 7 : 4;
  }

  private stepFour(): MunkresSteps {
    if (!this.marked) return 7;
    let done = false;
    let row = -1;
    let col = -1;
    let starCol = -1;

    while (!done) {
      [row, col] = this.findZero();
      if (row < 0) return 6;
      this.marked[row][col] = 2;
      starCol = this.findStarInRow(row);
      if (starCol >= 0) {
        col = starCol;
        this.rowCovered[row] = true;
        this.colCovered[col] = false;
      } else {
        this.zRow = row;
        this.zCol = col;
        done = true;
      }
    }
    return 5;
  }

  private stepFive(): MunkresSteps {
    if (!this.path) return 7;

    let count = 0;
    this.path[count][0] = this.zRow;
    this.path[count][1] = this.zCol;

    let done = false;
    while (!done) {
      const row = this.findStarInCol(this.path[count][1]);
      if (row >= 0) {
        count++;
        this.path[count][0] = row;
        this.path[count][1] = this.path[count - 1][1];
      } else {
        done = true;
      }

      if (!done) {
        const col = this.findPrimeInRow(this.path[count][0]);
        count++;
        this.path[count][0] = this.path[count - 1][0];
        this.path[count][1] = col;
      }
    }

    this.convertPath(this.path, count);
    this.clearCovers();
    this.erasePrimes();

    return 3;
  }

  private stepSix(): MunkresSteps {
    if (!this.matrix) return 7;
    const minVal = this.findSmallest();
    for (let i = 0; i < this.n; i++) {
      for (let j = 0; j < this.n; j++) {
        if (this.rowCovered[i]) this.matrix[i][j] += minVal;
        if (!this.colCovered[j]) this.matrix[i][j] -= minVal;
      }
    }
    return 4;
  }

  private findSmallest(): number {
    if (!this.matrix) return -1;
    let minVal = Number.MAX_VALUE;
    for (let i = 0; i < this.n; i++) {
      for (let j = 0; j < this.n; j++) {
        if (!this.rowCovered[i] && !this.colCovered[j]) {
          if (minVal > this.matrix[i][j]) minVal = this.matrix[i][j];
        }
      }
    }
    return minVal;
  }

  private findZero(): Tuple {
    if (!this.matrix) return [-1, -1];
    for (let i = 0; i < this.n; i++) {
      for (let j = 0; j < this.n; j++) {
        if (
          this.matrix[i][j] === 0 &&
          !this.rowCovered[i] &&
          !this.colCovered[j]
        ) {
          return [i, j];
        }
      }
    }
    return [-1, -1];
  }

  private findStarInRow(row: number): number {
    if (!this.marked) return -1;
    return this.marked[row].findIndex((value) => value === 1);
  }

  private findStarInCol(col: number): number {
    if (!this.marked) return -1;
    return this.marked.findIndex((cols) => cols[col] === 1);
  }

  private findPrimeInRow(row: number): number {
    if (!this.marked) return -1;
    return this.marked[row].findIndex((value) => value === 2);
  }

  private convertPath(path: Matrix, count: number): void {
    if (!this.marked) return;
    for (let i = 0; i <= count; i++) {
      this.marked[path[i][0]][path[i][1]] =
        this.marked[path[i][0]][path[i][1]] === 1 ? 0 : 1;
    }
  }

  private clearCovers(): void {
    for (let i = 0; i < this.n; i++) {
      this.rowCovered[i] = false;
      this.colCovered[i] = false;
    }
  }

  private erasePrimes(): void {
    if (!this.marked) return;
    for (let i = 0; i < this.n; i++) {
      for (let j = 0; j < this.n; j++) {
        if (this.marked[i][j] === 2) this.marked[i][j] = 0;
      }
    }
  }
}
