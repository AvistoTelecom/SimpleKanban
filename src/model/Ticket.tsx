import { Tag } from './Tag';
import { User } from './User';

export interface Ticket {
  id: number;
  name: string;
  creationDate: Date;
  storyPoint: number;
  assigne: User | null;
  tag: Tag | null;
  description: string;
  parent: Ticket | null;
  child: Ticket | null;
  blocked: boolean;
}
