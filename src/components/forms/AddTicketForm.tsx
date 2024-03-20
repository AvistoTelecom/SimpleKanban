import { FunctionComponent } from 'react';
import { CreateTicket } from '../../model/CreateTicket';
import { User } from '../../model/User';
import { Tag } from '../../model/Tag';
import { useForm, SubmitHandler } from 'react-hook-form';
import { CreateInProgressTicket } from '../../model/CreateInProgressTicket';
import { CreateDoneTicket } from '../../model/CreateDoneTicket';
import { Ticket } from '../../model/Ticket';

type AddTicketFormProps = {
  userList: User[];
  tagList: Tag[];
  ticketList: Ticket[];
  defaultType: string;
  onAddTicket: (ticket: CreateTicket) => void;
};

type CreateTicketFormInput = {
  name: string;
  storyPoint: number;
  assigneId?: number;
  tagName?: string;
  description: string;
  parentId?: number;
  childId?: number;
  type: string;
};

export const AddTicketForm: FunctionComponent<AddTicketFormProps> = ({
  userList,
  tagList,
  ticketList,
  defaultType,
  onAddTicket,
}) => {
  const { register, handleSubmit } = useForm<CreateTicketFormInput>({
    defaultValues: {
      name: 'Ticket',
      storyPoint: 0,
      assigneId: -1,
      tagName: '',
      description: '',
      parentId: -1,
      childId: -1,
      type: defaultType,
    },
  });

  const onSubmit: SubmitHandler<CreateTicketFormInput> = (data) => {
    const date = new Date();
    const newTicket: CreateTicket = {
      name: data.name,
      storyPoint: data.storyPoint,
      assigneId: data.assigneId === -1 ? undefined : data.assigneId,
      tagName: data.tagName === '' ? undefined : data.tagName,
      description: data.description,
      parentId: data.parentId === -1 ? undefined : data.parentId,
      childId: data.childId === -1 ? undefined : data.childId,
      creationDate: date,
      blocked: false,
    };

    if (data.type === 'todo') {
      onAddTicket(newTicket);
      return;
    }

    if (data.type === 'inProgress') {
      const inProgressTicket: CreateInProgressTicket = {
        ...newTicket,
        startDate: date,
        blocked: false,
      };
      onAddTicket(inProgressTicket);
      return;
    }

    if (data.type === 'done') {
      const doneTicket: CreateDoneTicket = {
        ...newTicket,
        startDate: date,
        endDate: date,
        blocked: false,
      };
      onAddTicket(doneTicket);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 w-full items-center p-4 overflow-y-auto max-h-full justify-between"
    >
      <label className="form-control w-full max-w-md">
        <div className="label">
          <span className="label-text">Name :</span>
        </div>
        <input
          type="text"
          placeholder="Title..."
          className="input input-bordered input-sm w-full"
          {...register('name')}
        />
      </label>
      <label className="form-control w-full max-w-md">
        <div className="label">
          <span className="label-text">Description :</span>
        </div>
        <textarea
          className="textarea textarea-bordered"
          placeholder="Description..."
          {...register('description')}
        />
      </label>

      <div className="grid grid-cols-2 max-w-md gap-x-12">
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Tag :</span>
          </div>
          <select
            className="select select-bordered w-full"
            {...register('tagName')}
          >
            <option value={''}>None</option>
            {tagList.map((tag, index) => (
              <option key={index} value={tag.name}>
                {tag.name}
              </option>
            ))}
          </select>
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Story Points :</span>
          </div>
          <input
            type="number"
            placeholder="Points..."
            className="input input-bordered input-md w-full"
            {...register('storyPoint')}
          />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Ticket type :</span>
          </div>
          <select
            className="select select-bordered w-full"
            {...register('type')}
          >
            <option key={'todo'} value={'todo'}>
              Todo
            </option>
            <option key={'inProgress'} value={'inProgress'}>
              In progress
            </option>
            <option key={'done'} value={'done'}>
              Done
            </option>
          </select>
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Assignee :</span>
          </div>
          <select
            className="select select-bordered w-full"
            {...register('assigneId')}
          >
            <option value={-1}>None</option>
            {userList.map((user, index) => (
              <option key={index} value={user.name}>
                {user.name}
              </option>
            ))}
          </select>
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Parent ticket :</span>
          </div>
          <select
            className="select select-bordered w-full"
            {...register('parentId')}
          >
            <option value={-1}>None</option>
            {ticketList.map((ticket, index) => (
              <option key={index} value={ticket.id}>
                {ticket.name}
              </option>
            ))}
          </select>
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Child ticket :</span>
          </div>
          <select
            className="select select-bordered w-full"
            {...register('childId')}
          >
            <option value={-1}>None</option>
            {ticketList.map((ticket, index) => (
              <option key={index} value={ticket.id}>
                {ticket.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <input type="submit" className="btn btn-secondary mt-2" />
    </form>
  );
};
