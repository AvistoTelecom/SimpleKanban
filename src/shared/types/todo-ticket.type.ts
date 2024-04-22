export type TodoTicket = {
  id: string;
  name: string;
  creationDate: Date;
  storyPoint: number;
  assigneId?: string;
  tagName?: string;
  description: string;
  parentId?: string;
  childId?: string;
  blocked: boolean;
  yIndex: number;
};
