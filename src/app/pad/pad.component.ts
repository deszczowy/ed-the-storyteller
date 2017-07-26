import { DataService } from './../service/data.service';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { StoryBoardElement } from './../classess/story-board-element.class';

@Component({
  selector: 'story-pad',
  templateUrl: './pad.component.html',
  styleUrls: ['./pad.component.css']
})

export class PadComponent implements OnInit {
  @Input() element: StoryBoardElement = null;
  @Output() back: EventEmitter<StoryBoardElement> = new EventEmitter<StoryBoardElement>();

  constructor (private data: DataService) {}

  ngOnInit() {
  }

  quitEdit() {
    this.element = null;
    this.back.emit(null);
  }

  save() {
    this.data.saveElement(this.element);
    alert('Save changes in element');
    this.quitEdit();
  }

  clear() {
    this.element.content = '';
    this.element.name = '';
  }
}
