import { CreateDoneTicket } from './create-done-ticket.type';
import { CreateInProgressTicket } from './create-in-progress-ticket.type';
import { CreateTodoTicket } from './create-todo-ticket.type';

export type CreateTicket =
  | CreateTodoTicket
  | CreateInProgressTicket
  | CreateDoneTicket;
