import { CardComponent } from './../card/card.component';
import { StoryBoardProject } from './../classess/story-board-project.class';
import { StoryBoardElement } from './../classess/story-board-element.class';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from '../service/data.service';


@Component({
  selector: 'story-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})

export class BoardComponent {
  @Input() elements: StoryBoardElement[];
  activeCard: StoryBoardElement;

  onAction(event: StoryBoardElement): void {
    if (event === null) {
      this.activeCard = null;
    }else {
      // copy object - we do not want referenced object edited directly
      this.activeCard = Object.assign({}, event);
    }
  }
}
