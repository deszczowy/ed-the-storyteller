export class StoryBoardElement {
  id: number;
  name: string; // like "Element 01"
  fileName: string; // like "Element_01.txt"
  category: string; // like "story" or "actor"
  content: string;
  state: number; // where 0 is deleted, 1 is valid and unchanged, 2 is valid and modified
}
