import { InProgressTicket } from './InProgressTicket';

export type DoneTicket = InProgressTicket & { endDate: Date };
