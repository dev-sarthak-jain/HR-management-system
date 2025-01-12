import React, { useState } from 'react';
import Sidebar from './dashboard_functions/Sidebar';
import Content from './dashboard_functions/Content';

const Dashboard = () => {
  const [showSidebar, onSetShowSidebar] = useState(false);

  return (
    <div className="flex">
      <Sidebar onSidebarHide={() => onSetShowSidebar(false)} showSidebar={showSidebar} />
      <Content onSidebarHide={() => onSetShowSidebar(true)} />
    </div>
  );
};

export default Dashboard;
