import { DoneTicket } from './DoneTicket';
import { InProgressTicket } from './InProgressTicket';
import { TodoTicket } from './TodoTicket';

export type Ticket = TodoTicket | InProgressTicket | DoneTicket;
