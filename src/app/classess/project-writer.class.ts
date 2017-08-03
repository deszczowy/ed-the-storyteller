import { StoryBoardProject } from './story-board-project.class';
import { StoryBoardElement } from './story-board-element.class';

export class ProjectWriter {
  private content: string;
  private extension: string;

  constructor() {}

  private init() {
    this.content = '';
    this.extension = '';
  }

  private buildHeader(projectData: StoryBoardProject) {
    this.addLine(projectData.name + '\n');
    this.addLine(projectData.description + '\n');
    this.addLine('pinned:\n');
  }

  private addLine(line: string) {
    this.content += line + '\n';
  }

  private pin(category: string, resource: string, extension: string) {
    if (extension !== this.extension) {
      this.extension = extension;
      this.addLine('set extension ' + this.extension);
    }
    const _pin = category + ' ' + resource;
    this.addLine(_pin);
  }

  private get(): string {
    return this.content;
  }

  save(project: StoryBoardProject, data: StoryBoardElement[]) {

    this.init();
    this.buildHeader(project);

    let content = '';

    data.forEach(element => {
      if (2 === element.state) {
        content = element.name + '\n\n' + element.content;
        fs.write(element.fileName, content);
        element.state = 1;
      }
      if (0 < element.state) {
        this.pin(element.category, element.resource, element.extension);
      }
    });

    content = project.localization + project.file;
    fs.write(content, this.get());
    project.modified = false;
  }
}
