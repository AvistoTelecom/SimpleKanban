import { DoneTicket } from './model/DoneTicket';
import { InProgressTicket } from './model/InProgressTicket';
import { Tag } from './model/Tag';
import { Ticket } from './model/Ticket';
import { User } from './model/User';

interface TicketStorage {
  id: number;
  name: string;
  creationDate: Date;
  storyPoint: number;
  assigneId: number | null;
  tagName: string | null;
  description: string;
  parentId: number | null;
  childId: number | null;
  blocked: boolean;
}

interface InProgressTicketStorage {
  ticketId: number;
  startDate: Date;
}

interface DoneTicketStorage {
  inProgressTicketId: number;
  endDate: Date;
}

export class LocalStorageUtil {
  static getItem = (key: string): [] => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : [];
  };

  static setItem = (key: string, value: string): void => {
    window.localStorage.setItem(key, value);
  };

  // Users
  static getUsers = (): User[] => {
    return this.getItem('users');
  };

  static getUser = (userId: number): User | null => {
    const storedUsers: User[] = this.getUsers();
    const user: User | undefined = storedUsers.find(
      (currUser: User) => currUser.id === userId
    );
    return user === undefined ? null : user;
  };

  static addUser = (userToAddInfos: {
    name: string;
    image: string;
  }): number => {
    const storedUsers: User[] = this.getUsers();
    let maxUserId: number = 0;
    if (storedUsers.length !== 0) {
      maxUserId = storedUsers.reduce((prevUser, currUser) =>
        prevUser && prevUser.id > currUser.id ? prevUser : currUser
      ).id;
    }
    const userToAdd = userToAddInfos as User;
    userToAdd.id = maxUserId + 1;
    storedUsers.push(userToAdd);
    this.setItem('users', JSON.stringify(storedUsers));
    return userToAdd.id;
  };

  static deleteUser = (userId: number) => {
    const storedTickets = this.getItem('tickets');
    const storedUser = this.getItem('users');
    // Each ticket that is assigned to the user we want to delete is asigned to no one
    storedTickets.map((currTicket: TicketStorage) => {
      if (currTicket.assigneId == userId) {
        currTicket.assigneId = null;
      }
    });
    this.setItem(
      'users',
      JSON.stringify(
        storedUser.filter((currUser: User) => {
          currUser.id != userId;
        })
      )
    );
  };

  static updateUser = (user: User) => {
    const storedUser = this.getItem('users');
    this.setItem(
      'users',
      JSON.stringify(
        storedUser.map((currUser: User) => {
          if (currUser.id === user.id) {
            return user;
          }
          return currUser;
        })
      )
    );
  };

  // Tags
  static getTags = (): Tag[] => {
    return this.getItem('tags');
  };

  static getTag = (tagName: string): Tag | null => {
    const storedTags: Tag[] = this.getTags();
    const tag: Tag | undefined = storedTags.find(
      (currTag: Tag) => currTag.name === tagName
    );
    return tag === undefined ? null : tag;
  };

  static addTag = (tagToAdd: Tag): string | null => {
    const storedTags: Tag[] = this.getTags();
    if (storedTags.some((tag) => tag.name === tagToAdd.name)) {
      return null;
    }
    storedTags.push(tagToAdd);
    this.setItem('tags', JSON.stringify(storedTags));
    return tagToAdd.name;
  };

  // Ticket

  static getParents = (ticketId: number): TicketStorage[] => {
    const ticketsArray: TicketStorage[] = this.getItem('tickets');
    const curr: TicketStorage | undefined = ticketsArray.find(
      (currTicket: TicketStorage) => currTicket.id === ticketId
    );
    if (curr === undefined || !curr.parentId) {
      return [];
    }
    return this.getParents(curr.parentId).concat(curr);
  };

  static getChildren = (ticketId: number): TicketStorage[] => {
    const ticketsArray: TicketStorage[] = this.getItem('tickets');
    const curr: TicketStorage | undefined = ticketsArray.find(
      (currTicket: TicketStorage) => currTicket.id === ticketId
    );
    if (curr === undefined || !curr.childId) {
      return [];
    }
    return this.getChildren(curr.childId).concat(curr);
  };

  static storageToTicket = (storedTicket: TicketStorage): Ticket => {
    return {
      id: storedTicket.id,
      name: storedTicket.name,
      creationDate: storedTicket.creationDate,
      storyPoint: storedTicket.storyPoint,
      assigne: storedTicket.assigneId
        ? this.getUser(storedTicket.assigneId)
        : null,
      tag: storedTicket.tagName ? this.getTag(storedTicket.tagName) : null,
      description: storedTicket.description,
      parent: null,
      child: null,
      blocked: storedTicket.blocked,
    };
  };

  static getTickets = (): Ticket[] => {
    const storedTickets = this.getItem('tickets');
    return storedTickets.map((currTicket: TicketStorage) => {
      const child = currTicket.childId
        ? this.getTicket(currTicket.childId)
        : null;
      const parent = currTicket.parentId
        ? this.getTicket(currTicket.parentId)
        : null;
      const result = this.storageToTicket(currTicket);
      result.child = child;
      result.parent = parent;
      return result;
    });
  };

  static getTicket = (ticketId: number): Ticket | null => {
    const storedTicket: TicketStorage | undefined = this.getItem(
      'tickets'
    ).find((currTicket: TicketStorage) => currTicket.id === ticketId);

    if (storedTicket === undefined) {
      return null;
    }
    const parents = this.getParents(ticketId);
    const children = this.getChildren(ticketId);
    const relations = parents.concat(storedTicket, children);

    let ticketsInRelation = relations.map((currTicket) => {
      return this.storageToTicket(currTicket);
    });

    ticketsInRelation = ticketsInRelation.map(
      (currTicket, index, allTickets) => {
        currTicket.parent = index > 0 ? allTickets[index - 1] : null;
        currTicket.child =
          index < allTickets.length - 1 ? allTickets[index + 1] : null;
        return currTicket;
      }
    );
    const result = ticketsInRelation.find(
      (currTicket) => currTicket.id === ticketId
    );
    return result === undefined ? null : result;
  };

  static addTicket = (ticketToAddInfos: {
    name: string;
    creationDate: Date;
    storyPoint: number;
    assigne: User | null;
    tag: Tag | null;
    description: string;
    parent: Ticket | null;
    child: Ticket | null;
    blocked: boolean;
  }): number => {
    const storedTickets: Ticket[] = this.getTickets();
    let maxTicketId: number = 0;
    if (storedTickets.length !== 0) {
      maxTicketId = storedTickets.reduce((prevTicket, currTicket) =>
        prevTicket && prevTicket.id > currTicket.id ? prevTicket : currTicket
      ).id;
    }
    const ticketToAdd = ticketToAddInfos as Ticket;
    ticketToAdd.id = maxTicketId + 1;
    storedTickets.push(ticketToAdd);
    this.setItem('tickets', JSON.stringify(storedTickets));
    return ticketToAdd.id;
  };

  // InProgressTicket

  static getInProgressTickets = (): InProgressTicket[] => {
    const storedInProgressTickets = this.getItem('inProgressTickets');
    return storedInProgressTickets.map(
      (currInProgressTicket: InProgressTicketStorage) => {
        const inProgressTicket = this.getTicket(
          currInProgressTicket.ticketId
        ) as InProgressTicket;
        inProgressTicket.startDate = currInProgressTicket.startDate;
        return inProgressTicket;
      }
    );
  };

  static getInProgressTicket = (
    inProgressTicketId: number
  ): InProgressTicket | null => {
    const storedInProgressTickets: InProgressTicket[] =
      this.getInProgressTickets();
    const inProgressTicket: InProgressTicket | undefined =
      storedInProgressTickets.find(
        (currInProgressTicket: InProgressTicket) =>
          currInProgressTicket.id === inProgressTicketId
      );
    return inProgressTicket === undefined ? null : inProgressTicket;
  };

  static addInProgressTicket = (inProgressTicket: InProgressTicket): void => {
    const storedInProgressTickets: InProgressTicketStorage[] =
      this.getItem('inProgressTickets');
    storedInProgressTickets.push({
      ticketId: inProgressTicket.id,
      startDate: inProgressTicket.startDate,
    });
    this.setItem('inProgressTickets', JSON.stringify(storedInProgressTickets));
  };

  // DoneTicket

  static getDoneTickets = (): DoneTicket[] => {
    const storedDoneTickets = this.getItem('doneTickets');
    return storedDoneTickets.map((currDoneTicket: DoneTicketStorage) => {
      const doneTicket = this.getInProgressTicket(
        currDoneTicket.inProgressTicketId
      ) as DoneTicket;
      doneTicket.endDate = currDoneTicket.endDate;
      return doneTicket;
    });
  };

  static getDoneTicket = (doneTicketId: number): DoneTicket | null => {
    const storedDoneTickets: DoneTicket[] = this.getDoneTickets();
    const doneTicket: DoneTicket | undefined = storedDoneTickets.find(
      (currDoneTicket: DoneTicket) => currDoneTicket.id === doneTicketId
    );
    return doneTicket === undefined ? null : doneTicket;
  };

  static addDoneTicket = (doneTicket: DoneTicket): void => {
    const storedDoneTickets: DoneTicketStorage[] = this.getItem('doneTicket');
    storedDoneTickets.push({
      inProgressTicketId: doneTicket.id,
      endDate: doneTicket.startDate,
    });
    this.setItem('inProgressTickets', JSON.stringify(storedDoneTickets));
  };
}
