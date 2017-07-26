import { StoryBoardElement } from './../classess/story-board-element.class';
import { Injectable } from '@angular/core';
import { StoryBoardProject } from './../classess/story-board-project.class';
import { ELEMENTS } from './mock-data';
import { Loader } from '../classess/loader.class';

@Injectable()
export class DataService {

  data: StoryBoardElement[]; // all resources
  storyboard: StoryBoardElement[]; // storyboard cards
  project: StoryBoardProject;

  init() {
    this.storyboard = [];
    this.data = [];
    this.project = {} as StoryBoardProject;
    this.project.modified = false;
  }

  /* Promise example - leave this for further reference. */
  getStoryboardElements(): Promise<StoryBoardElement[]> {
    return Promise.resolve(this.storyboard);
  }

  getProject(): Promise<StoryBoardProject> {
    return Promise.resolve(this.project);
  }

  startNew() {
    this.init();
  }

  openProject(filePath: string) {
    const loader: Loader = new Loader(
      this.data, this.project
    );
    if (loader.processFile(filePath)) {
      this.process();
    }
  }

  process() {
    this.data.forEach(element => {
      if ('story' === element.category) {
        this.storyboard.push(element);
      }
    });
  }

  getElementOfId(id: number): StoryBoardElement {
    let e: StoryBoardElement = null;
    this.data.forEach(element => {
      if (id as number === element.id as number) {
        e = element;
      }
    });
    return e;
  }

  saveElement(element: StoryBoardElement) {
    const e = this.getElementOfId(element.id) as StoryBoardElement;
    e.content = element.content;
    e.name = element.name;
    e.state = 2;
  }

  saveData() {
    this.data.forEach(element => {
      if (2 === element.state) {
        alert('Building file for ' + element.name);
        alert('Saving file: ' + element.fileName);
      }
    });
  }
}
