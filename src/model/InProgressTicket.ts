import { TodoTicket } from './TodoTicket';

export type InProgressTicket = TodoTicket & {
  blocked: false;
  startDate: Date;
};
