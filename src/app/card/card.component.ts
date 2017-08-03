import { Component, Input, Output, EventEmitter } from '@angular/core';
import { StoryBoardElement } from './../classess/story-board-element.class';
import { Debug } from '../classess/debug.class';


@Component({
  selector: 'story-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() elements: StoryBoardElement[];
  @Output() action: EventEmitter<StoryBoardElement> = new EventEmitter<StoryBoardElement>();
  selectedCard: StoryBoardElement;

  editCard(card: StoryBoardElement) {
    this.selectedCard = card;
    this.action.emit(this.selectedCard);
  }

  deleteCard(card: StoryBoardElement) {
    Debug.info('Delete of ' + card.name);
  }
}
