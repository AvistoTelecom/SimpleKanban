export type Ticket = {
  id: number;
  name: string;
  creationDate: Date;
  storyPoint: number;
  assigneId: number | null;
  tagName: string | null;
  description: string;
  parentId: number | null;
  childId: number | null;
  blocked: boolean;
};
