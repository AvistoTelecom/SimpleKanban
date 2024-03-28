import { Tag } from '../../model/Tag';

export type TagAction =
  | { type: 'ADD-TAG'; payload: Tag }
  | { type: 'UPDATE-TAG'; payload: { name: string; newTag: Tag } }
  | { type: 'DELETE-TAG'; payload: string };
