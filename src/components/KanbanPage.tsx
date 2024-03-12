import { FunctionComponent, useState } from 'react';
import { KanbanArea } from './KanbanArea';
import { SidePanel } from './SidePanel';
import { NavBar } from './NavBar';

export const KanbanPage: FunctionComponent = () => {
  const [sidePanelOpen, setSidePanelOpen] = useState<boolean>(false);

  const handleNavBar = () => {
    setSidePanelOpen(!sidePanelOpen);
  };

  return (
    <>
      <NavBar handleNavBar={handleNavBar} />
      <main className="flex-grow h-96 flex w-full space-x-2 p-2 bg-base-300">
        <KanbanArea />
        {sidePanelOpen && <SidePanel />}
      </main>
    </>
  );
};
