import {TicketForm} from './TicketForm'

export const SidePanel = (): React.JSX.Element => {
  return (
    <div className="w-full bg-neutral rounded-box p-2">
      sidepanel
      <TicketForm></TicketForm>
    </div>
  )
}
