declare const Buffer;

import { StoryBoardElement } from './../classess/story-board-element.class';
import { Injectable } from '@angular/core';
import { StoryBoardProject } from './../classess/story-board-project.class';
import { Loader } from '../classess/loader.class';
import { ProjectWriter } from '../classess/project-writer.class';
import { Debug } from './../classess/debug.class';

@Injectable()
export class DataService {

  data: StoryBoardElement[]; // all resources
  storyboard: StoryBoardElement[]; // storyboard cards
  project: StoryBoardProject;

  init() {
    this.storyboard = [];
    this.data = [];
  }

  /* Promise example - leave this for further reference. */
  getStoryboardElements(): Promise<StoryBoardElement[]> {
    return Promise.resolve(this.storyboard);
  }

  getAllData(): Promise<StoryBoardElement[]> {
    return Promise.resolve(this.data);
  }

  getProject(): Promise<StoryBoardProject> {
    return Promise.resolve(this.project);
  }

  startNew() {
    this.init();
    this.project = new StoryBoardProject();
  }

  openProject(filePath: string) {
    const loader: Loader = new Loader(
      this.data, this.project
    );
    if (loader.processFile(filePath)) {
      this.process();
      this.project = loader.getProject();
    }
  }

  process() {
    this.storyboard = [];
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

  setModified() {
    this.project.modified = true;
  }

  saveElement(element: StoryBoardElement) {
    const e = this.getElementOfId(element.id) as StoryBoardElement;
    e.content = element.content;
    e.name = element.name;
    e.state = 2;
    this.setModified();
  }

  addElement(element: StoryBoardElement) {
    alert('add');
    let e = '';
    if (element.extension !== '') { e = '.' + element.extension; }
    element.id = this.data.length + 1;
    element.resource = element.name.replace(new RegExp(' ', 'g'), '_');
    element.fileName = this.project.localization + path.sep + element.category + path.sep + element.resource + e;
    Debug.info(JSON.stringify(element));
    this.data.push(element);
    this.setModified();
  }

  removeElement(element: StoryBoardElement) {
    const e = this.getElementOfId(element.id) as StoryBoardElement;
    e.state = 0;
    this.setModified();
  }
}
