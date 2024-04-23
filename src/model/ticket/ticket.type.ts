import { DoneTicket } from './done-ticket.type';
import { InProgressTicket } from './in-progress-ticket.type';
import { TodoTicket } from './todo-ticket.type';

export type Ticket = TodoTicket | InProgressTicket | DoneTicket;
