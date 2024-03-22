import { FunctionComponent } from 'react';
import { Ticket } from '../../model/Ticket';
import { Tag } from '../context/TagsContext';
import { User } from '../context/UsersContext';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  isDoneTicket,
  isInProgressTicket,
  isTodoTicket,
} from '../../model/TicketsFunctions';
import { ColumnType } from '../KanbanPage';

type EditTicketFormProps = {
  ticket: Ticket;
  userList: User[];
  tagList: Tag[];
  ticketList: Ticket[];
  onEditTicket: (ticket: Ticket) => void;
};

type FormInputs = {
  name: string;
  storyPoint: number;
  assigneId?: string;
  tagName?: string;
  description: string;
  parentId?: string;
  childId?: string;
  type: string;
  blocked: boolean;
};

export const EditTicketForm: FunctionComponent<EditTicketFormProps> = ({
  userList,
  tagList,
  ticketList,
  ticket,
  onEditTicket,
}) => {
  let ticketType: ColumnType = '';
  if (isTodoTicket(ticket)) {
    ticketType = 'todo';
  }
  if (isInProgressTicket(ticket)) {
    ticketType = 'inProgress';
  }
  if (isDoneTicket(ticket)) {
    ticketType = 'done';
  }

  const { register, handleSubmit } = useForm<FormInputs>({
    defaultValues: {
      name: ticket.name,
      storyPoint: ticket.storyPoint,
      assigneId: ticket.assigneId,
      tagName: ticket.tagName,
      description: ticket.description,
      parentId: ticket.parentId,
      childId: ticket.childId,
      type: ticketType,
    },
  });

  const onSubmit: SubmitHandler<FormInputs> = (formData) => {
    // TODO
    console.log(formData);
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
            placeholder="Story points..."
            min={0}
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
            <option value={''}>None</option>
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
            <option value={''}>None</option>
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
            <option value={''}>None</option>
            {ticketList.map((ticket, index) => (
              <option key={index} value={ticket.id}>
                {ticket.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <input
        type="submit"
        className="btn btn-secondary mt-2"
        value="Edit ticket"
      />
    </form>
  );
};
