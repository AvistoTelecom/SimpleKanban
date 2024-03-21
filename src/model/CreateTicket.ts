import { CreateDoneTicket } from './CreateDoneTicket';
import { CreateInProgressTicket } from './CreateInProgressTicket';
import { CreateTodoTicket } from './CreateTodoTicket';

export type CreateTicket =
  | CreateTodoTicket
  | CreateInProgressTicket
  | CreateDoneTicket;
