import { CreateTicket } from '../../model/CreateTicket';
import { Ticket } from '../../model/Ticket';

export type TicketAction =
  | { type: 'ADD-TICKET'; payload: CreateTicket }
  | { type: 'UPDATE-TICKET'; payload: Ticket }
  | { type: 'DELETE-TICKET'; payload: string }
  | {
      type: 'MOVE-TODO-TO-INPROGRESS-TICKET';
      payload: { ticketId: string; destinationIndex: number };
    }
  | {
      type: 'MOVE-TODO-TO-DONE-TICKET';
      payload: { ticketId: string; destinationIndex: number };
    }
  | {
      type: 'MOVE-INPROGRESS-TO-TODO-TICKET';
      payload: { ticketId: string; destinationIndex: number };
    }
  | {
      type: 'MOVE-INPROGRESS-TO-DONE-TICKET';
      payload: { ticketId: string; destinationIndex: number };
    }
  | {
      type: 'MOVE-DONE-TO-TODO-TICKET';
      payload: { ticketId: string; destinationIndex: number };
    }
  | {
      type: 'MOVE-DONE-TO-INPROGRESS-TICKET';
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
