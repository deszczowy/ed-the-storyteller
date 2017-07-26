import { DataService } from './service/data.service';
import { Component, OnInit } from '@angular/core';
import { BoardComponent } from './board/board.component';
import { StoryBoardProject } from './classess/story-board-project.class';
import { StoryBoardElement } from './classess/story-board-element.class';

@Component({
  selector: 'story-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Ed, The Storyteller';

  project: StoryBoardProject;
  storyboard: StoryBoardElement[];

  constructor(private data: DataService) {}

  ngOnInit() {
    this.data.init();
  }

  updateFromService() {
    // act on the promise
    this.data.getStoryboardElements()
      .then(storyboard => this.storyboard = storyboard);
    this.data.getProject()
      .then(project => this.project = project);
  }

  menuItemNewCardClick() {
    alert('New card');
  }

  menuItemNewResourceClick() {
    alert('New resource');
  }

  menuItemResourceListClick() {
    alert('Resources list');
  }

  menuItemSearchClick() {
    alert('Search');
  }

  submenuItemActorsClick() {
    alert('Actors');
  }

  submenuItemItemsClick() {
    alert('Items');
  }

  submenuItemPlacesClick() {
    alert('Places');
  }

  submenuItemNotesClick() {
    alert('Notes');
  }

  showStatistics() {
    alert('Statistics');
  }

  showMenu() {
    alert('Big menu');
  }

  projectNew() {
    let questionAnswer = 0;

    if (this.project.modified) {
      questionAnswer =
      electron.remote.dialog.showMessageBox(
        {
          message: 'Project got modify. Do You want to discard those changes and start over with new project?',
          buttons: ['Yes', 'No'],
        }
      );
    }

    if (0 === questionAnswer) {
      this.data.startNew();
    }
    this.updateFromService();
  }

  projectOpen() {
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

  projectSave() {
    this.data.saveData();
    alert('Saved.');
  }
}
