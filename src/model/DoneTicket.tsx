import { InProgressTicket } from './InProgressTicket';

export interface DoneTicket extends InProgressTicket {
  endDate: Date;
}
