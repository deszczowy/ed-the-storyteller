import { Injectable } from '@angular/core';
import { StoryBoardElement } from '../classess/story-board-element.class';
import { StoryBoardProject } from './../classess/story-board-project.class';
import { ELEMENTS } from './mock-data';
import { Loader } from '../classess/loader.class';

@Injectable()
export class DataService {

  data: StoryBoardElement[];
  project: StoryBoardProject;

  tempName: string;
  tempLocalization: string;
  tempContent: string;

  init() {
    this.data = [];
    this.project = {} as StoryBoardProject;
    this.project.modified = false;
  }

  /* Promise example - leave this for further reference. */
  getElements(): Promise<StoryBoardElement[]> {
    return Promise.resolve(this.data);
  }

  getProject(): Promise<StoryBoardProject> {
    return Promise.resolve(this.project);
  }

  startNew() {
    this.init();
  }

  openProject(filePath: string, content: string) {
    const loader: Loader = new Loader();
    loader.processFile(filePath, content);
    this.data = ELEMENTS;
  }
}
