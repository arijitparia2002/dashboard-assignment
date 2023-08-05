// pages/index.tsx
import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import UserList from "../components/UserList";
import UserDetailsModal from "../components/UserDetailsModal";
import GroupsList from "../components/GroupsList";
import Analytics from "../components/Analytics";
import { getUsers, getUserPhotos } from "../utils/api";
import { User } from "../types";

const Home: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [activeTab, setActiveTab] = useState("user"); // Initially set to 'user'

  useEffect(() => {
    getUsers().then((data: any) => setUsers(data));
  }, []);

  return (
    <div className="flex h-screen">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-grow justify-center items-center bg-zinc-400/30">
        <div className="w-full flex justify-center">
          {activeTab === "user" && <UserList users={users} />}
          {activeTab === "groups" && <GroupsList users={users} />}
          {activeTab === "visualize" && <Analytics users={users} />}
        </div>
      </div>
    </div>
  );
};

export default Home;
