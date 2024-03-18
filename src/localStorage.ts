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

  static getUser = (userId: number): User | null => {
    const storedUsers = this.getUserList();
    const user = storedUsers.find((currUser) => currUser.id === userId);
    return user ?? null;
  };

  static addUser = (userToAddInfos: Omit<User, 'id'>): number => {
    const storedUsers = this.getUserList();
    let maxUserId = 0;
    if (storedUsers.length !== 0) {
      maxUserId = storedUsers.reduce((prevUser, currUser) =>
        prevUser && prevUser.id > currUser.id ? prevUser : currUser
      ).id;
    }
    const userToAdd = { ...userToAddInfos, id: maxUserId + 1 };
    storedUsers.push(userToAdd);
    this.setUserList(storedUsers);
    return userToAdd.id;
  };

  static deleteUser = (userId: number) => {
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

  static getTag = (tagName: string): Tag | null => {
    const storedTags = this.getTagList();
    const tag = storedTags.find((currTag) => currTag.name === tagName);
    return tag ?? null;
  };

  static addTag = (tagToAdd: Tag): string | null => {
    const tagList = this.getTagList();
    if (tagList.some((tag) => tag.name === tagToAdd.name)) {
      return null;
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
    return ticketList.filter((currentTicket) => isTodoTicket(currentTicket));
  };

  static getInProgressTicketList = (): InProgressTicket[] => {
    const ticketList = this.getTicketList();
    return ticketList.filter((currentTicket) =>
      isInProgressTicket(currentTicket)
    ) as InProgressTicket[];
  };

  static getDoneTicketList = (): DoneTicket[] => {
    const ticketList = this.getTicketList();
    return ticketList.filter((currentTicket) =>
      isDoneTicket(currentTicket)
    ) as DoneTicket[];
  };

  static setTicketList = (ticketList: Ticket[]) => {
    localStorage.setItem('ticketList', JSON.stringify(ticketList));
  };

  static getTicket = (ticketId: number): Ticket | null => {
    const storedTickets = this.getTicketList();
    const ticket = storedTickets.find(
      (currentTicket) => currentTicket.id === ticketId
    );
    return ticket ?? null;
  };

  static addTicket = (ticketToAddInfos: Omit<Ticket, 'id'>): number => {
    const storedTickets = this.getTicketList();
    let maxTicketId: number = 0;
    if (storedTickets.length !== 0) {
      maxTicketId = storedTickets.reduce((prevTicket, currentTicket) =>
        prevTicket && prevTicket.id > currentTicket.id
          ? prevTicket
          : currentTicket
      ).id;
    }
    const ticketToAdd = { ...ticketToAddInfos, id: maxTicketId + 1 };
    storedTickets.push(ticketToAdd);
    this.setTicketList(storedTickets);
    return ticketToAdd.id;
  };

  static deleteTicket = (ticketId: number) => {
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

  static getInProgressTicket = (
    inProgressTicketId: number
  ): InProgressTicket | null => {
    const storedInProgressTickets = this.getInProgressTicketList();
    const inProgressTicket = storedInProgressTickets.find(
      (currInProgressTicket) => currInProgressTicket.id === inProgressTicketId
    );
    return inProgressTicket ?? null;
  };

  static getDoneTicket = (doneTicketId: number): DoneTicket | null => {
    const storedDoneTickets = this.getDoneTicketList();
    const doneTicket = storedDoneTickets.find(
      (currDoneTicket) => currDoneTicket.id === doneTicketId
    );
    return doneTicket ?? null;
  };

  static setTodoToInProgress = (ticketToSet: TodoTicket) => {
    const ticket = this.getTicket(ticketToSet.id);
    if (ticket === null || ticket.blocked) {
      return;
    }
    const inProgress = {
      ...ticket,
      blocked: ticket.blocked,
      startDate: new Date(),
    };
    this.updadeTicket(inProgress);
  };

  static setInProgressToTodo = (ticketToSet: TodoTicket) => {
    const inProgress = this.getTicket(ticketToSet.id);
    if (inProgress === null || !isInProgressTicket(inProgress)) {
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { startDate, ...todo } = inProgress;
    this.updadeTicket(todo);
  };

  static setInProgressToDone = (ticketToSet: InProgressTicket) => {
    const inProgress = this.getTicket(ticketToSet.id);
    if (inProgress === null || !isInProgressTicket(inProgress)) {
      return;
    }
    const done = {
      ...inProgress,
      startDate: inProgress.startDate,
      endDate: new Date(),
    };
    this.updadeTicket(done);
  };

  static setDoneToInProgress = (ticketToSet: DoneTicket) => {
    const done = this.getTicket(ticketToSet.id);
    if (done === null || !isDoneTicket(done)) {
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { endDate, ...inProgress } = done;
    this.updadeTicket(inProgress);
  };

  static setTodoToDone = (ticketToSet: Ticket) => {
    const ticket = this.getTicket(ticketToSet.id);
    if (ticket === null || ticket.blocked) {
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

  static setDoneTicketToTodo = (ticketToSet: DoneTicket) => {
    const done = this.getTicket(ticketToSet.id);
    if (done === null || !isDoneTicket(done)) {
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { endDate, startDate, ...todo } = done;

    this.updadeTicket(todo);
  };
}
