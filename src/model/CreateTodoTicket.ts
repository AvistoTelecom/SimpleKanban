import { TodoTicket } from './TodoTicket';

export type CreateTodoTicket = Omit<TodoTicket, 'id' | 'yIndex'>;
