import {FunctionComponent} from 'react'
import {TicketForm} from './TicketForm'

export const SidePanel: FunctionComponent = () => {
  return (
    <div className={`w-full bg-neutral rounded-box p-2`}>
      sidepanel
      <TicketForm />
    </div>
  )
}
