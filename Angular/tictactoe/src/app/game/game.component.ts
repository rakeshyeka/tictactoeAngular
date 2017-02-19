import { Component, OnInit} from '@angular/core';
import { GameService } from './game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  providers: [GameService],
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  private grid: Object[][];
  private success: boolean;
  private turn: string = "";
  constructor(private gameService: GameService) {
    this.init();
  }

  init(){
    this.grid = [];
    this.success = false;
    this.initializeGrid();
    this.turn = "x";
  }

  initializeGrid() {
    for (let i : number = 0; i < 3 ; i++) {
      this.grid[i] = [];
      for (let j : number = 0; j < 3; j++) {
        let defaultValue: string = "";
        this.grid[i][j] = {
          value: defaultValue,
          class: this.getCellClass(defaultValue)
        };
      }
    }
  }

  ngOnInit() {
  }

  getCellClass(cell:Object): string {
    let cellValue = cell['value'];
    let cellClass = cell['value'];
    let cellSuccessPaint = cell['stroke'];
    if (!cellValue) {
      return "";
    }

    if (!this.success) {
      cellClass += "-cell";
    } else {
      cellClass += "-cell-" + cellSuccessPaint;
    }

    return cellClass;
  }

  onClick(i:number, j:number){
    let cellValue = this.grid[i][j];
    console.log(i,j, cellValue);
    if (cellValue['value']) {
      return;
    }

    this.grid[i][j]['value'] = this.turn;
    this.grid[i][j]['class'] = this.getCellClass(this.grid[i][j]);
    if (this.turn === 'x') {
      this.turn = 'o';
    } else {
      this.turn = 'x';
    }
    
    this.checkSuccess();
  }

  checkSuccess(){
    let successElements = [];
    let stroke = "";
    let a, b, c;
    for (let i = 0; i < 3; i++) {
      a = this.grid[i][0]['value'];
      b = this.grid[i][1]['value'];
      c = this.grid[i][2]['value'];
      if(a && a === b && a === c) {
        // Horizontal success
        this.success = true;
        stroke = 'h';
        successElements = [[i,0], [i,1], [i,2]];
      }

      a = this.grid[0][i]['value'];
      b = this.grid[1][i]['value'];
      c = this.grid[2][i]['value'];
      if(a && a === b && a === c) {
        // Vertical success
        this.success = true;
        stroke = 'v';
        successElements = [[0,i], [1,i], [2,i]];
      }
    }

    a = this.grid[0][0]['value'];
    b = this.grid[1][1]['value'];
    c = this.grid[2][2]['value'];
    if(a && a === b && a === c) {
      // Diagonal-1 success
      this.success = true;
      stroke = 'd1';
      successElements = [[0,0], [1,1], [2,2]];
    }

    a = this.grid[0][2]['value'];
    b = this.grid[1][1]['value'];
    c = this.grid[2][0]['value'];
    if(a && a === b && a === c) {
      // Diagonal-2 success
      this.success = true;
      stroke = 'd2';
      successElements = [[0,2], [1,1], [2,0]];
    }

    if (this.success) {
      for (let index in successElements) {
        let elem = successElements[index];
        let i = elem[0];
        let j = elem[1];
        this.grid[i][j]['stroke'] = stroke;
        this.grid[i][j]['class'] = this.getCellClass(this.grid[i][j]);
      }
    }
  }

}
