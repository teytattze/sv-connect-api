import { Matrix } from './munkres.types';

const DEFAULT_PAD_VALUE = 0;

export class MunkresHelper {
  public static makeMatrix(n: number, value: number): Matrix {
    const matrix: Matrix = [];
    for (let i = 0; i < n; i++) {
      matrix[i] = [];
      for (let j = 0; j < n; j++) {
        matrix[i][j] = value;
      }
    }
    return matrix;
  }

  public static padMatrix(costMatrix: Matrix, padValue?: number): Matrix {
    padValue = padValue || DEFAULT_PAD_VALUE;
    let maxRows = costMatrix.length;
    let maxCols = 0;
    costMatrix.forEach((row) => (maxCols = Math.max(maxCols, row.length)));
    maxRows = Math.max(maxRows, maxCols);
    const newMatrix = [];
    for (let i = 0; i < maxRows; i++) {
      let row = costMatrix[i] || [];
      let newRow = row.slice();
      while (maxRows > newRow.length) newRow.push(padValue);
      newMatrix.push(newRow);
    }
    return newMatrix;
  }

  public static convertProfitToCost(
    profitMatrix: Matrix,
    inversionFunc?: (x: number) => number
  ) {
    if (!inversionFunc) {
      let maximum = -1.0 / 0.0;
      for (let i = 0; i < profitMatrix.length; i++) {
        for (let j = 0; j < profitMatrix[i].length; j++) {
          if (profitMatrix[i][j] > maximum) {
            maximum = profitMatrix[i][j];
          }
        }
      }
      inversionFunc = (x) => maximum - x;
    }
    const costMatrix: Matrix = [];
    for (let i = 0; i < profitMatrix.length; i++) {
      let row = profitMatrix[i];
      costMatrix[i] = [];
      for (let j = 0; j < row.length; j++) {
        costMatrix[i][j] = inversionFunc(profitMatrix[i][j]);
      }
    }
    return costMatrix;
  }
}
