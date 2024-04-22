import { TodoTicket } from './todo-ticket.type';

export type InProgressTicket = TodoTicket & {
  blocked: false;
  startDate: Date;
};
