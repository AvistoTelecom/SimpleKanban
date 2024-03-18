export type TodoTicket = {
  id: number;
  name: string;
  creationDate: Date;
  storyPoint: number;
  assigneId?: number;
  tagName?: string;
  description: string;
  parentId?: number;
  childId?: number;
  blocked: boolean;
};
