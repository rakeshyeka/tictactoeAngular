import {Injectable} from '@angular/core'

@Injectable()
export class GameService {

  constructor(){}
    
  initializeGrid(): Object[][] {
    let grid = [];
    let defaultValue: string = "";
    for (let i : number = 0; i < 3 ; i++) {
      grid[i] = [];
      for (let j : number = 0; j < 3; j++) {
        grid[i][j] = {
          value: defaultValue,
          class: ""
        };
      }
    }

    return grid;
  }

  getCellClass(cell:Object, success:boolean): string {
    let cellValue = cell['value'];
    let cellClass = cell['value'];
    let cellSuccessPaint = cell['stroke'];
    if (!cellValue) {
      return "";
    }

    if (success) {
      cellClass += "-cell";
    } else {
      cellClass += "-cell-" + cellSuccessPaint;
    }

    return cellClass;
  }



  checkSuccess(grid: Object[][]){
    let successElements = [];
    let stroke = "";
    let a, b, c;
    let success:boolean = false;

    for (let i = 0; i < 3; i++) {
      a = grid[i][0]['value'];
      b = grid[i][1]['value'];
      c = grid[i][2]['value'];
      if(a && a === b && a === c) {
        // Horizontal success
        success = true;
        stroke = 'h';
        successElements = [[i,0], [i,1], [i,2]];
      }

      a = grid[0][i]['value'];
      b = grid[1][i]['value'];
      c = grid[2][i]['value'];
      if(a && a === b && a === c) {
        // Vertical success
        success = true;
        stroke = 'v';
        successElements = [[0,i], [1,i], [2,i]];
      }
    }

    a = grid[0][0]['value'];
    b = grid[1][1]['value'];
    c = grid[2][2]['value'];
    if(a && a === b && a === c) {
      // Diagonal-1 success
      success = true;
      stroke = 'd1';
      successElements = [[0,0], [1,1], [2,2]];
    }

    a = grid[0][2]['value'];
    b = grid[1][1]['value'];
    c = grid[2][0]['value'];
    if(a && a === b && a === c) {
      // Diagonal-2 success
      success = true;
      stroke = 'd2';
      successElements = [[0,2], [1,1], [2,0]];
    }

    return {
        'success': success,
        'stroke': stroke,
        'successElements': successElements
    };
  }
}