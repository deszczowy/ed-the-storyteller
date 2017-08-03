import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Debug } from './../classess/debug.class';

@Component({
  selector: 'story-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  @Output() handle: EventEmitter<boolean> = new EventEmitter<boolean>();
  results: boolean[];
  phrase: string;

  search() {
    Debug.info('Search');
  }

  exit() {
    this.handle.emit(false);
    Debug.info('Exit');
  }
}
