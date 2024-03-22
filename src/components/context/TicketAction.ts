import { Ticket } from '../../model/Ticket';

export type TicketAction =
  | { type: 'ADD-TICKET'; payload: Ticket }
  | {
      type: 'UPDATE-TICKET';
      payload: {
        old: Ticket;
        new: Ticket;
      };
    }
  | { type: 'DELETE-TICKET'; payload: number }
  | { type: 'SET-TODO-TO-INPROGRESS-TICKET'; payload: number }
  | { type: 'SET-TODO-TO-DONE-TICKET'; payload: number }
  | { type: 'SET-INPROGRESS-TO-TODO-TICKET'; payload: number }
  | { type: 'SET-INPROGRESS-TO-DONE-TICKET'; payload: number }
  | { type: 'SET-DONE-TO-TODO-TICKET'; payload: number }
  | { type: 'SET-DONE-TO-INPROGRESS-TICKET'; payload: number };
