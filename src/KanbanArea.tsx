import {TicketConumn} from './TicketColumn'

export const KanbanArea = (): React.JSX.Element => {
  return (
    <div className="flex flex-wrap mar bg-neutral rounded-box w-full gap-2 p-2">
      <TicketConumn></TicketConumn>
      <TicketConumn></TicketConumn>
      <TicketConumn></TicketConumn>
    </div>
  )
}
