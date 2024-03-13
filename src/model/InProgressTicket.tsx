import { Ticket } from './Ticket';

export interface InProgressTicket extends Ticket {
  startDate: Date;
}
