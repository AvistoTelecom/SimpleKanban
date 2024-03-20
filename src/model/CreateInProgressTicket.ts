import { CreateTodoTicket } from './CreateTodoTicket';

export type CreateInProgressTicket = CreateTodoTicket & {
  blocked: false;
  startDate: Date;
};
