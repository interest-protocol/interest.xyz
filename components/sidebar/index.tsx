import { FC } from 'react';

import DirectionalMenu from '../directional-menu';
import SidebarContent from './components/sidebar-content';
import { ISidebarProps } from './sidebar.types';

const Sidebar: FC<ISidebarProps> = ({ onClose }) => (
  <DirectionalMenu onClose={onClose}>
    <SidebarContent />
  </DirectionalMenu>
);

export default Sidebar;
