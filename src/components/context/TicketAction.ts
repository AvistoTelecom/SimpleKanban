import { CreateTicket } from '../../model/CreateTicket';
import { Ticket } from '../../model/Ticket';

export type TicketAction =
  | { type: 'ADD-TICKET'; payload: CreateTicket }
  | { type: 'UPDATE-TICKET'; payload: Ticket }
  | { type: 'DELETE-TICKET'; payload: string }
  | {
      type: 'SET-TODO-TO-INPROGRESS-TICKET';
      payload: { ticketId: string; destinationIndex: number };
    }
  | {
      type: 'SET-TODO-TO-DONE-TICKET';
      payload: { ticketId: string; destinationIndex: number };
    }
  | {
      type: 'SET-INPROGRESS-TO-TODO-TICKET';
      payload: { ticketId: string; destinationIndex: number };
    }
  | {
      type: 'SET-INPROGRESS-TO-DONE-TICKET';
      payload: { ticketId: string; destinationIndex: number };
    }
  | {
      type: 'SET-DONE-TO-TODO-TICKET';
      payload: { ticketId: string; destinationIndex: number };
    }
  | {
      type: 'SET-DONE-TO-INPROGRESS-TICKET';
      payload: { ticketId: string; destinationIndex: number };
    }
  | {
      type: 'REORDER-TODO-LIST-TICKET';
      payload: { sourceIndex: number; destinationIndex: number };
    }
  | {
      type: 'REORDER-INPROGRESS-LIST-TICKET';
      payload: { sourceIndex: number; destinationIndex: number };
    }
  | {
      type: 'REORDER-DONE-LIST-TICKET';
      payload: { sourceIndex: number; destinationIndex: number };
    };
