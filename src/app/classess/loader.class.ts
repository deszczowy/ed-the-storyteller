import { StoryBoardElement } from './story-board-element.class';
import { StoryBoardProject } from './story-board-project.class';

export class Loader {
  private elementsArray: StoryBoardElement[];
  private projectData: StoryBoardProject;

  private fileName: string;
  private fileLocalization: string;
  private resourceName: string;

  constructor() { }

  private debug() {
    alert(this.projectData.localization);
    alert(this.projectData.file);
    alert(this.projectData.name);
  }

  private decomposeFileName(fileName: string): void {
    if (fileName) {
      // the border
      const index = (fileName.indexOf('\\') >= 0 ? fileName.lastIndexOf('\\') : fileName.lastIndexOf('/'));

      this.fileName = fileName.substring(index);
      if (this.fileName.indexOf('\\') === 0 || this.fileName.indexOf('/') === 0) {
        this.fileName = this.fileName.substring(1);
      }

      this.resourceName = this.fileName.replace(new RegExp('_', 'g'), ' ');
      this.resourceName = this.resourceName.substring(0, this.resourceName.lastIndexOf('.') + 1);

      this.fileLocalization = fileName.substring(0, index);
    }
  }

  init() {
    this.elementsArray = [];
    this.projectData = {} as StoryBoardProject;
  }

  private copy(s: string): string {
    return s.substring(0, s.length);
  }

  processFile(fileName: string, content: string) {
    this.init();

    this.decomposeFileName(fileName);
    this.projectData.localization = this.copy(this.fileLocalization);
    this.projectData.file = this.copy(this.fileName);

    const lines = content.split('\n');
    if (lines.length > 0) {
      lines.forEach(element => {
        // alert(element);
        if (element.substring(0, 5).indexOf('#name') === 0) {
          this.projectData.name = element.substring(5);
        }
      });
    }
    this.debug();
  }

}
