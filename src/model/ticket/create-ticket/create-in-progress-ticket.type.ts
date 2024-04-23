import { InProgressTicket } from './in-progress-ticket.type';

export type CreateInProgressTicket = Omit<InProgressTicket, 'id' | 'yIndex'>;
