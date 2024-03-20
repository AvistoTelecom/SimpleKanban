import { CreateInProgressTicket } from './CreateInProgressTicket';

export type CreateDoneTicket = CreateInProgressTicket & { endDate: Date };
