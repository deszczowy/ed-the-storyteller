export class StoryBoardElement {
  id: number;
  name: string; // like "Element 01"
  category: string; // like "story" or "actor"
  content: string;
  state: number; // where 0 is deleted, 1 is valid and unchanged, 2 is valid and modified
  resource: string;
  extension: string;
  fileName: string;
}
