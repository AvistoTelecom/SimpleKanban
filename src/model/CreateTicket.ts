import { DoneTicket } from './DoneTicket';
import { InProgressTicket } from './InProgressTicket';
import { TodoTicket } from './TodoTicket';

export type CreateTicket =
  | Omit<TodoTicket, 'id'>
  | InProgressTicket
  | DoneTicket;
