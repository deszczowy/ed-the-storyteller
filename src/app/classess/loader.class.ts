import { StoryBoardElement } from './story-board-element.class';
import { StoryBoardProject } from './story-board-project.class';
import { Debug } from './debug.class';

export class Loader {

  private d: string; // path delimiter os-independent

  // element data
  private id = 0;
  // processing
  private extension = '';
  private command = '';
  private argument = '';
  private pins = false;

  constructor(
    private elementsArray: StoryBoardElement[],
    private projectData: StoryBoardProject
  ) {
    this.d = path.sep;
  }

  private debug() {
    Debug.info('Localization: ' + this.projectData.localization);
    Debug.info('Project root file: ' + this.projectData.file);
    Debug.info('Project name: ' + this.projectData.name);
    Debug.info('Project description: ' + this.projectData.description);

    this.elementsArray.forEach(element => {
      Debug.info(JSON.stringify(element));
    });
  }

  private retrieveInitialProjectData(fileName: string): boolean {
    if (fileName) {
      let f: string;

      // the border
      const index = fileName.lastIndexOf(this.d);

      f = fileName.substring(index);
      if (0 === f.indexOf(this.d)) {
        f = f.substring(1);
      }
      this.projectData.file = f;

      this.projectData.localization = fileName.substring(0, index + 1);
      this.projectData.modified = false;
      this.projectData.description = '';
      return true;
    }
    return false;
  }

  init() {
    Debug.info('loader initialize');
    if (this.elementsArray === undefined) {
      this.elementsArray = [];
    } else {
      this.elementsArray.length = 0;
    }
    this.projectData = {} as StoryBoardProject;
  }

  private copy(s: string): string {
    return s.substring(0, s.length);
  }

  private decomposeCommand(line: string): boolean {
    if ('' !== line) {
      const point = line.search(' ');
      if (point >= 0) {
        this.command = line.substring(0, point).trim().toLowerCase();
        this.argument = line.substring(point + 1).trim();
        return true;
      }
    }
    return false;
  }

  private commandIs(value: string): boolean {
    return value === this.command;
  }

  private setDefaults() {
    if (this.decomposeCommand(this.argument)) {
      // settings
      if (this.command === 'extension') {
        this.extension = this.argument;
      }
    }
  }

  private buildFileName(category: string, resource: string, extension: string): string {
    let e = '';
    if ('' !== extension) {
      e += '.' + extension;
    }

    return this.projectData.localization + this.d + category + this.d + resource + e;
  }

  private addElement() {
    this.id ++;
    const element: StoryBoardElement = {
      id: this.id,
      name: '', // *
      resource: this.argument,
      category: this.command,
      content: '', // *
      state: 1,
      extension: this.extension,
      fileName: this.buildFileName(this.command, this.argument, this.extension)
    };
    // *) filled when building process is done
    this.elementsArray.push(element);
  }

  private addDescription(line: string) {
    this.projectData.description += line + '\n';
  }

  private processLine(line: string) {
    if ('' !== line) {
      if ('pinned:' === line.toLowerCase()) {
        this.pins = true;
      } else {

        if (this.pins) {
          // processing pins
          if (this.decomposeCommand(line)) {
            if (this.commandIs('set')) {
              this.setDefaults();
            } else {
              this.addElement();
            }
          }
        } else {
          this.addDescription(line);
        }
      }
    }
  }

  private activate(element: StoryBoardElement) {
    const content = fs.read(element.fileName).replace(new RegExp('\r', 'g'), '');

    const lines = content.split('\n');
    let first = true;
    lines.forEach(line => {
      if (first) {
        first = false;
        element.name = line.trim();
      } else {
        element.content += line.trim();
      }
    });
  }

  private activateElements() {
    this.elementsArray.forEach(element => {
      this.activate(element);
    });
  }

  processFile(fileName: string): boolean {
    this.init();
    const content = fs.read(fileName);

    if (this.retrieveInitialProjectData(fileName)) {

      const lines = content.split('\n');
      let count = 0;

      if (lines.length > 0) {
        lines.forEach(element => {
          element = element.trim();
          count ++;
          if (1 === count) {
            this.projectData.name = element;
          } else {
            this.processLine(element);
          }
        });
        this.activateElements();
        this.debug();
        return true;
      }

    }
    Debug.error('stop');
    return false;
  }

  getProject() {
    return this.projectData;
  }

}
