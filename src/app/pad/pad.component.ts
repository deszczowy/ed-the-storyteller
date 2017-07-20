import { Component, Input, Output, EventEmitter } from '@angular/core';
import { StoryBoardElement } from './../classess/story-board-element.class';

@Component({
  selector: 'story-pad',
  templateUrl: './pad.component.html',
  styleUrls: ['./pad.component.css']
})

export class PadComponent {
  @Input() element: StoryBoardElement = null;
  @Output() back: EventEmitter<StoryBoardElement> = new EventEmitter<StoryBoardElement>();

  quitEdit() {
    this.element = null;
    this.back.emit(null);
  }

  save() {
    alert('Save changes in element');
  }

  clear() {
    this.element.content = '';
    this.element.name = '';
  }
}
