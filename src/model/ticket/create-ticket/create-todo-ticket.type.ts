import { TodoTicket } from '../todo-ticket.type';

export type CreateTodoTicket = Omit<TodoTicket, 'id' | 'yIndex'>;
