import { Ticket } from './Ticket';

export type InProgressTicket = Ticket & {
  blocked: false;
  startDate: Date;
};
