import { CreateDoneTicket } from '@model/ticket/create-ticket/create-done-ticket.type';
import { CreateInProgressTicket } from '@model/ticket/create-ticket/create-in-progress-ticket.type';
import { CreateTicket } from '@model/ticket/create-ticket/create-ticket.type';
import { CreateTodoTicket } from '@model/ticket/create-ticket/create-todo-ticket.type';
import { DoneTicket } from '@model/ticket/done-ticket.type';
import { InProgressTicket } from '@model/ticket/in-progress-ticket.type';
import { Ticket } from '@model/ticket/ticket.type';
import { TodoTicket } from '@model/ticket/todo-ticket.type';

export const isInProgressTicket = (
  ticket: Ticket
): ticket is InProgressTicket => {
  return 'startDate' in ticket && !('endDate' in ticket);
};

export const isDoneTicket = (ticket: Ticket): ticket is DoneTicket => {
  return 'endDate' in ticket && 'startDate' in ticket;
};

export const isTodoTicket = (ticket: Ticket): ticket is TodoTicket => {
  return !('startDate' in ticket) && !('endDate' in ticket);
};

export const isCreateInProgressTicket = (
  ticket: CreateTicket
): ticket is CreateInProgressTicket => {
  return 'startDate' in ticket && !('endDate' in ticket);
};

export const isCreateDoneTicket = (
  ticket: CreateTicket
): ticket is CreateDoneTicket => {
  return 'endDate' in ticket && 'startDate' in ticket;
};

export const isCreateTodoTicket = (
  ticket: CreateTicket
): ticket is CreateTodoTicket => {
  return !('startDate' in ticket) && !('endDate' in ticket);
};
