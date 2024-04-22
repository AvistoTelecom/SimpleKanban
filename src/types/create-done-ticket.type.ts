import { DoneTicket } from './done-ticket.type';

export type CreateDoneTicket = Omit<DoneTicket, 'id' | 'yIndex'>;
