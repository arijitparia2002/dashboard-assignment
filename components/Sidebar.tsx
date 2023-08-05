// Sidebar.tsx
import React, { useState } from "react";
import { RiDashboardLine } from "react-icons/ri";
import { FaRegCircle, FaRegDotCircle } from "react-icons/fa";

interface TabItemProps {
  tab: string;
  activeTab: string;
  onClick: (tab: string) => void;
  children: React.ReactNode; // Add this line to fix the children prop issue
}

const TabItem: React.FC<TabItemProps> = ({
  tab,
  activeTab,
  onClick,
  children,
}) => {
  const isActive = tab === activeTab;

  return (
    <li
      className={`flex items-center justify-between cursor-pointer px-12 ${
        isActive ? "bg-gray-500 bg-opacity-60" : ""
      }`}
      onClick={() => onClick(tab)}
    >
      {isActive ? (
        <FaRegDotCircle className="text-xl" />
      ) : (
        <FaRegCircle className="text-xl" />
      )}
      <div className="flex justify-center">
        <p className="font-semibold p-4 mr-8 text-center">{children}</p>
      </div>
    </li>
  );
};

const Sidebar = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) => {
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="sidebar bg-blue-500 text-white w-1/5 h-fulll">
      <div className="flex items-center justify-between px-12 bg-gray-700 bg-opacity-60">
        <RiDashboardLine className="text-2xl" />
        <h1 className="text-xl font-semibold p-4">Dashboard</h1>
      </div>
      <ul className="py-1">
        <TabItem tab="user" activeTab={activeTab} onClick={handleTabClick}>
          Users
        </TabItem>
        <TabItem tab="groups" activeTab={activeTab} onClick={handleTabClick}>
          Groups
        </TabItem>
        <TabItem tab="visualize" activeTab={activeTab} onClick={handleTabClick}>
          Visualize
        </TabItem>
        <TabItem tab="tab_4" activeTab={activeTab} onClick={handleTabClick}>
          Tab 4
        </TabItem>
        {/* Add more tabs */}
      </ul>
    </div>
  );
};

export default Sidebar;
