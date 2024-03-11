import {FunctionComponent} from 'react'
import {KanbanArea} from './KanbanArea'
import {SidePanel} from './SidePanel'
import {useState} from 'react'
import {NavBar} from './NavBar'

export const KanbanPage: FunctionComponent = () => {
  const [sidePanelOpen, setSidePanelOpen] = useState<boolean>(false)

  const handleNavBar = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(event.currentTarget.getAttribute('value'))
    setSidePanelOpen(!sidePanelOpen)
  }

  return (
    <>
      <NavBar handleNavBar={handleNavBar} />
      <main className="flex w-full space-x-2 p-2">
        <KanbanArea />
        {sidePanelOpen && <SidePanel />}
      </main>
    </>
  )
}
