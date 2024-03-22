import { v4 as uuidv4 } from 'uuid';
import { DoneTicket } from './model/DoneTicket';
import { InProgressTicket } from './model/InProgressTicket';
import { Tag } from './model/Tag';
import { Ticket } from './model/Ticket';
import {
  isDoneTicket,
  isInProgressTicket,
  isTodoTicket,
} from './model/TicketsFunctions';
import { TodoTicket } from './model/TodoTicket';
import { User } from './model/User';

export class LocalStorage {
  static getUserList = (): User[] => {
    const userList = localStorage.getItem('userList');
    return userList ? JSON.parse(userList) : [];
  };

  static setUserList = (userList: User[]) => {
    localStorage.setItem('userList', JSON.stringify(userList));
  };

  static getUser = (userId: string): User | undefined => {
    const storedUsers = this.getUserList();
    const user = storedUsers.find((currUser) => currUser.id === userId);
    return user;
  };

  static addUser = (userToAddInfos: Omit<User, 'id'>): string => {
    const storedUsers = this.getUserList();
    const uuid: string = uuidv4();
    const userToAdd = { ...userToAddInfos, id: uuid };
    storedUsers.push(userToAdd);
    this.setUserList(storedUsers);
    return userToAdd.id;
  };

  static deleteUser = (userId: string) => {
    const ticketList = this.getTicketList();
    const storedUser = this.getUserList();
    ticketList.forEach((currentTicket) => {
      if (currentTicket.assigneId === userId) {
        currentTicket.assigneId = undefined;
      }
    });
    this.setTicketList(ticketList);
    const filteredUserList = storedUser.filter((currUser) => {
      currUser.id !== userId;
    });
    this.setUserList(filteredUserList);
  };

  static updateUser = (user: User) => {
    const userList = this.getUserList();
    const index = userList.findIndex((currUser) => {
      currUser.id === user.id;
    });
    this.setUserList(userList.with(index, user));
  };

  static getTagList = (): Tag[] => {
    const tagList = localStorage.getItem('tagList');
    return tagList ? JSON.parse(tagList) : [];
  };

  static setTagList = (tagList: Tag[]) => {
    localStorage.setItem('tagList', JSON.stringify(tagList));
  };

  static getTag = (tagName: string): Tag | undefined => {
    const storedTags = this.getTagList();
    const tag = storedTags.find((currTag) => currTag.name === tagName);
    return tag;
  };

  static addTag = (tagToAdd: Tag): string | undefined => {
    const tagList = this.getTagList();
    if (tagList.some((tag) => tag.name === tagToAdd.name)) {
      return;
    }
    tagList.push(tagToAdd);
    this.setTagList(tagList);
    return tagToAdd.name;
  };

  static deleteTag = (tagName: string) => {
    const storedTickets = this.getTicketList();
    const storedUser = this.getTagList();
    storedTickets.forEach((currentTicket) => {
      if (currentTicket.tagName === tagName) {
        currentTicket.tagName = undefined;
      }
    });
    this.setTicketList(storedTickets);
    const filteredTaList = storedUser.filter((currTag: Tag) => {
      currTag.name !== tagName;
    });
    this.setTagList(filteredTaList);
  };

  static updateTag = (oldTag: Tag, newTag: Tag) => {
    const tagList = this.getTagList();
    const ticketList = this.getTicketList();
    ticketList.forEach((currentTicket) => {
      if (currentTicket.tagName === oldTag.name) {
        currentTicket.tagName = newTag.name;
      }
    });
    this.setTicketList(ticketList);
    const tagIndex = tagList.findIndex((currTag) => {
      currTag.name === oldTag.name;
    });
    this.setTagList(tagList.with(tagIndex, newTag));
  };

  static getTicketList = (): Ticket[] => {
    const storedTickets = localStorage.getItem('ticketList');
    if (storedTickets === null) {
      return [];
    }
    const storedTicketList: Ticket[] = JSON.parse(storedTickets);
    return storedTicketList;
  };

  static getTodoTicketList = (): TodoTicket[] => {
    const ticketList = this.getTicketList();
    return ticketList
      .filter((currentTicket) => isTodoTicket(currentTicket))
      .map((todoTicket) => {
        todoTicket.creationDate = new Date(todoTicket.creationDate);
        return todoTicket;
      });
  };

  static getInProgressTicketList = (): InProgressTicket[] => {
    const ticketList = this.getTicketList();
    const result = ticketList.filter((currentTicket) =>
      isInProgressTicket(currentTicket)
    ) as InProgressTicket[];
    return result.map((inProgressTicket) => {
      inProgressTicket.creationDate = new Date(inProgressTicket.creationDate);
      inProgressTicket.startDate = new Date(inProgressTicket.startDate);
      return inProgressTicket;
    });
  };

  static getDoneTicketList = (): DoneTicket[] => {
    const ticketList = this.getTicketList();
    const result: DoneTicket[] = ticketList.filter((currentTicket) =>
      isDoneTicket(currentTicket)
    ) as DoneTicket[];
    return result.map((doneTicket) => {
      doneTicket.creationDate = new Date(doneTicket.creationDate);
      doneTicket.startDate = new Date(doneTicket.startDate);
      doneTicket.endDate = new Date(doneTicket.endDate);
      return doneTicket;
    });
  };

  static setTicketList = (ticketList: Ticket[]) => {
    localStorage.setItem('ticketList', JSON.stringify(ticketList));
  };

  static addTicket = (ticketToAddInfos: Omit<Ticket, 'id'>): string => {
    const storedTickets = this.getTicketList();
    const uuid: string = uuidv4();
    const ticketToAdd = { ...ticketToAddInfos, id: uuid };
    storedTickets.push(ticketToAdd);
    this.setTicketList(storedTickets);
    return ticketToAdd.id;
  };

  static deleteTicket = (ticketId: string) => {
    const ticketList = this.getTicketList();
    ticketList.forEach((currentTicket) => {
      if (currentTicket.childId === ticketId) {
        currentTicket.childId = undefined;
      }
      if (currentTicket.parentId === ticketId) {
        currentTicket.parentId = undefined;
      }
    });
    const filteredTicketList = ticketList.filter((currentTicket) => {
      currentTicket.id !== ticketId;
    });
    this.setTicketList(filteredTicketList);
  };

  static updadeTicket = (ticket: Ticket) => {
    const ticketList = this.getTicketList();
    const index = ticketList.findIndex((currentTicket) => {
      currentTicket.id === ticket.id;
    });
    this.setTicketList(ticketList.with(index, ticket));
  };

  static getTicket = (ticketId: string): Ticket | undefined => {
    const storedTickets = this.getTicketList();
    const ticket = storedTickets.find(
      (currentTicket) => currentTicket.id === ticketId
    );
    return ticket;
  };

  static getTodoTicket = (todoTicketId: string): TodoTicket | undefined => {
    const storedTodoTickets = this.getTodoTicketList();
    const todoTicket = storedTodoTickets.find(
      (currTodoTicket) => currTodoTicket.id === todoTicketId
    );
    return todoTicket;
  };

  static getInProgressTicket = (
    inProgressTicketId: string
  ): InProgressTicket | undefined => {
    const storedInProgressTickets = this.getInProgressTicketList();
    const inProgressTicket = storedInProgressTickets.find(
      (currInProgressTicket) => currInProgressTicket.id === inProgressTicketId
    );
    return inProgressTicket;
  };

  static getDoneTicket = (doneTicketId: string): DoneTicket | undefined => {
    const storedDoneTickets = this.getDoneTicketList();
    const doneTicket = storedDoneTickets.find(
      (currDoneTicket) => currDoneTicket.id === doneTicketId
    );
    return doneTicket;
  };

  static setTodoToInProgress = (ticketId: string) => {
    const ticket = this.getTicket(ticketId);
    if (ticket === undefined || ticket.blocked) {
      return;
    }
    const inProgress = {
      ...ticket,
      blocked: ticket.blocked,
      startDate: new Date(),
    };
    this.updadeTicket(inProgress);
  };

  static setInProgressToTodo = (ticketId: string) => {
    const inProgress = this.getTicket(ticketId);
    if (inProgress === undefined || !isInProgressTicket(inProgress)) {
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { startDate, ...todo } = inProgress;
    this.updadeTicket(todo);
  };

  static setInProgressToDone = (ticketId: string) => {
    const inProgress = this.getTicket(ticketId);
    if (inProgress === undefined || !isInProgressTicket(inProgress)) {
      return;
    }
    const done = {
      ...inProgress,
      startDate: inProgress.startDate,
      endDate: new Date(),
    };
    this.updadeTicket(done);
  };

  static setDoneToInProgress = (ticketId: string) => {
    const done = this.getTicket(ticketId);
    if (done === undefined || !isDoneTicket(done)) {
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { endDate, ...inProgress } = done;
    this.updadeTicket(inProgress);
  };

  static setTodoToDone = (ticketId: string) => {
    const ticket = this.getTicket(ticketId);
    if (ticket === undefined || ticket.blocked) {
      return;
    }
    const done = {
      ...ticket,
      blocked: ticket.blocked,
      startDate: new Date(),
      endDate: new Date(),
    };

    this.updadeTicket(done);
  };

  static setDoneTicketToTodo = (ticketId: string) => {
    const done = this.getTicket(ticketId);
    if (done === undefined || !isDoneTicket(done)) {
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { endDate, startDate, ...todo } = done;

    this.updadeTicket(todo);
  };
}
