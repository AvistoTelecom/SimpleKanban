import {FunctionComponent} from 'react'
import {TicketConumn} from './TicketColumn'

export const KanbanArea: FunctionComponent = () => {
  return (
    <div className="flex mar bg-base-100 rounded-box w-full gap-2 p-2 overflow-x-auto	">
      <TicketConumn />
      <TicketConumn />
      <TicketConumn />
    </div>
  )
}
