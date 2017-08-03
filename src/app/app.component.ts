import { Debug } from './classess/debug.class';
import { DataService } from './service/data.service';
import { Component, OnInit } from '@angular/core';
import { BoardComponent } from './board/board.component';
import { StoryBoardProject } from './classess/story-board-project.class';
import { StoryBoardElement } from './classess/story-board-element.class';
import { ProjectWriter } from './classess/project-writer.class';
import { SearchComponent } from './search/search.component';

@Component({
  selector: 'story-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Ed, The Storyteller';
  subSelect: boolean;
  toggleSearch: boolean;

  project: StoryBoardProject;
  allData: StoryBoardElement[];
  storyboard: StoryBoardElement[];

  card: StoryBoardElement;

  constructor(private data: DataService) {
    this.subSelect = false;
  }

  ngOnInit() {
    this.data.init();
  }

  updateFromService() {
    // act on the promise
    this.data.getAllData()
      .then(allData => this.allData = allData);
    this.data.getStoryboardElements()
      .then(storyboard => this.storyboard = storyboard);
    this.data.getProject()
      .then(project => this.project = project);
  }

  private slide() {
    this.subSelect = true;
  }

  private roll() {
    this.subSelect = false;
  }

  menuItemNewCardClick() {
    this.card = new StoryBoardElement();
    this.card.id = 0;
    this.card.category = 'story';
    this.card.extension = 'txt';
    this.card.state = 2;
    Debug.info(JSON.stringify(this.card));
  }

  menuItemNewResourceClick() {
    Debug.info('New resource');
    this.slide();
  }

  menuItemResourceListClick() {
    Debug.info('Resources list');
    this.slide();
  }

  menuItemSearchClick() {
    Debug.info('Search');
    this.toggleSearch = true;
  }

  actionSearch(event: boolean) {
    this.toggleSearch = event;
  }

  submenuItemActorsClick() {
    Debug.info('Actors');
    this.roll();
  }

  submenuItemItemsClick() {
    Debug.info('Items');
    this.roll();
  }

  submenuItemPlacesClick() {
    Debug.info('Places');
    this.roll();
  }

  submenuItemNotesClick() {
    Debug.info('Notes');
    this.roll();
  }

  showStatistics() {
    Debug.info('Statistics');
  }

  showMenu() {
    Debug.info('Big menu');
  }

  isProjectModified() {
    return this.project !== null && this.project !== undefined && this.project.modified;
  }

  question(condition: boolean, message: string) {
    let questionAnswer = 500;
    if (condition) {
      questionAnswer =
      electron.remote.dialog.showMessageBox(
        {
          message: message,
          buttons: ['Yes', 'No'], // 0, 1
        }
      );
    }
    return questionAnswer;
  }

  projectNew() {
    if (1 !== this.question(
      this.isProjectModified() ,
      'Project got modify. Do You want to discard those changes and start over with new project?')
    ) {
      this.data.startNew();
    }
    this.updateFromService();
  }

  projectOpen() {
    // yes or no question
    if (1 !== this.question(
      this.isProjectModified() ,
      'Project got modify. Do You want to discard those changes and load next project?')
    ) {
      const files =
        electron.remote.dialog.showOpenDialog(
          {
            filters: [
              { name: 'text', extensions: ['txt'] }
            ]
          }
        );

      this.data.openProject(files[0]);
      this.updateFromService();
    }
  }

  projectSave() {
    if (0 === this.question(
      this.isProjectModified() ,
      'Do You want to save all changes?')
    ) {
      const writer: ProjectWriter = new ProjectWriter();
      writer.save(
        this.project,
        this.allData
      );
      this.updateFromService();
    }
  }

}
