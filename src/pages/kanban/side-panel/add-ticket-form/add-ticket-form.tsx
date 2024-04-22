import { FunctionComponent } from 'react';
import { CreateTicket } from '../../../../types/create-ticket.type';
import { User } from '../../../../types/user.type';
import { Tag } from '../../../../types/tag.type';
import { useForm, SubmitHandler } from 'react-hook-form';
import { CreateInProgressTicket } from '../../../../types/create-in-progress-ticket.type';
import { CreateDoneTicket } from '../../../../types/create-done-ticket.type';
import { Ticket } from '../../../../types/ticket.type';
import { ColumnType } from '../../../../types/column-type.type';

type AddTicketFormProps = {
  userList: User[];
  tagList: Tag[];
  ticketList: Ticket[];
  defaultType: ColumnType;
  onAddTicket: (ticket: CreateTicket) => void;
};

type FormInputs = {
  name: string;
  storyPoint: number;
  assigneId?: string;
  tagName?: string;
  description: string;
  parentId?: string;
  childId?: string;
  blocked: boolean;
};

export const AddTicketForm: FunctionComponent<AddTicketFormProps> = ({
  userList,
  tagList,
  ticketList,
  defaultType,
  onAddTicket,
}) => {
  const { register, watch, handleSubmit } = useForm<FormInputs>({
    defaultValues: {
      name: '',
      storyPoint: 0,
      assigneId: '',
      tagName: '',
      description: '',
      parentId: '',
      childId: '',
      blocked: false,
    },
  });

  const onSubmit: SubmitHandler<FormInputs> = (formData) => {
    const date = new Date();
    const newTicket: CreateTicket = {
      name: formData.name,
      storyPoint: formData.storyPoint,
      assigneId: formData.assigneId === '' ? undefined : formData.assigneId,
      tagName: formData.tagName === '' ? undefined : formData.tagName,
      description: formData.description,
      parentId: formData.parentId === '' ? undefined : formData.parentId,
      childId: formData.childId === '' ? undefined : formData.childId,
      creationDate: date,
      blocked: formData.blocked,
    };

    if (defaultType === 'todo') {
      onAddTicket(newTicket);
      return;
    }

    if (defaultType === 'inProgress') {
      const inProgressTicket: CreateInProgressTicket = {
        ...newTicket,
        startDate: date,
        blocked: false,
      };
      onAddTicket(inProgressTicket);
      return;
    }

    if (defaultType === 'done') {
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
            placeholder="Story points..."
            className="input input-bordered input-md w-full"
            {...register('storyPoint')}
          />
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
              <option key={index} value={user.id}>
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
            {ticketList.map((ticket, index) => {
              if (watch('childId') === ticket.id) {
                return;
              }
              return (
                <option key={index} value={ticket.id}>
                  {ticket.name}
                </option>
              );
            })}
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
            {ticketList.map((ticket, index) => {
              if (watch('parentId') === ticket.id) {
                return;
              }
              return (
                <option key={index} value={ticket.id}>
                  {ticket.name}
                </option>
              );
            })}
          </select>
        </label>
        <label className="label cursor-pointer form-control mt-9 flex-row">
          <span className="label-text">Blocked : </span>
          <input
            type="checkbox"
            className="checkbox"
            disabled={defaultType !== 'todo'}
            {...register('blocked')}
          />
        </label>
      </div>
      <input
        type="submit"
        className="btn btn-secondary mt-2"
        value="New ticket"
      />
    </form>
  );
};
