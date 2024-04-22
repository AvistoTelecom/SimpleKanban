import { InProgressTicket } from './in-progress-ticket.type';

export type DoneTicket = InProgressTicket & { endDate: Date };
