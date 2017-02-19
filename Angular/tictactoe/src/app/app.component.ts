import { Component } from '@angular/core';
import { GameComponent } from './game/game.component';
import { GameService } from './game/game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [GameComponent, GameService]
})
export class AppComponent {
  title = 'Tic Tac Toe !!';
}
