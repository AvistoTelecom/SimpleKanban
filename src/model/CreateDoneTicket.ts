import { DoneTicket } from './DoneTicket';

export type CreateDoneTicket = Omit<DoneTicket, 'id' | 'yIndex'>;
