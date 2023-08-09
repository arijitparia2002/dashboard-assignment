import React, { useState, useEffect } from "react";
import { FaToggleOff, FaToggleOn } from "react-icons/fa";
import { getUserPhotos } from "../utils/api";
import { RiSearchLine } from "react-icons/ri";
import UserDetailsModal from "./UserDetailsModal";

import { User } from "../types";
import { get } from "http";

interface UserListProps {
  users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  const [activatedUserIds, setActivatedUserIds] = useState<number[]>([]);
  const [searchedUsers, setSearchedUsers] = useState<number[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [imageCache, setImageCache] = useState<Record<number, string>>({});

  console.log(searchedUsers);
  console.log(users.map((user) => user.id));
  // Load cached activatedUserIds, imageCache from localStorage on initial render
  useEffect(() => {
    const cachedActivatedUserIds = localStorage.getItem("activatedUserIds");
    const cachedImageCache = localStorage.getItem("imageCache");

    if (cachedActivatedUserIds) {
      setActivatedUserIds(JSON.parse(cachedActivatedUserIds));
    } else {
      setActivatedUserIds(users.map((user) => user.id));
    }

    if (cachedImageCache) {
      setImageCache(JSON.parse(cachedImageCache));
    }

    setSearchedUsers(users.map((user) => user.id));
  }, []);

  const toggleUserActivation = (userId: number, userName: string) => {
    const updatedUserIds = activatedUserIds.includes(userId)
      ? activatedUserIds.filter((id) => id !== userId)
      : [...activatedUserIds, userId];

    setActivatedUserIds(updatedUserIds);
    localStorage.setItem("activatedUserIds", JSON.stringify(updatedUserIds));
    handleUserClick(users.find((user) => user.id === userId)!);
  };

  const handleUserClick = async (user: User) => {
    if (imageCache[user.id]) {
      setSelectedUser({ ...user, photoUrl: imageCache[user.id] });
    } else {
      const photoUrl = await getUserPhotos(user.id);
      setImageCache((prevCache) => ({ ...prevCache, [user.id]: photoUrl }));
      localStorage.setItem("imageCache", JSON.stringify(imageCache));
      setSelectedUser({ ...user, photoUrl });
    }
  };

  const handleChange = (value: string) => {
    const filteredUsers = users.filter((user) =>
      user.name.toLowerCase().includes(value.toLowerCase())
    );
    setSearchedUsers(filteredUsers.map((user) => user.id));
  };

  return (
    <div className="items-center w-full flex justify-center flex-col">
      <div className="flex justify-between mb-8 bg-white w-full px-28 pt-4 align-middle">
        <h3 className="text-blue-600 font-bold text-2xl">Users</h3>
        <div className="flex items-center mb-4">
          <div className="flex-shrink-0">
            <RiSearchLine className="text-gray-500 h-4 w-4 " />
          </div>
          <div className="relative ml-2">
            <input
              type="text"
              placeholder="Search for users..."
              className="rounded pl-4 py-2 w-52 focus:outline-none focus:bg-white transition duration-300"
              onChange={(e) => {
                handleChange(e.target.value);
              }}
            />
          </div>
          <button className="bg-blue-400 rounded px-4 py-2 ml-2 hover:bg-blue-500 transition duration-300">
            Search
          </button>
        </div>
      </div>
      <div className="user-list w-4/5 bg-white rounded">
        <h3 className="bg-gray-400 pl-2 py-2 font-medium">Users List</h3>
        <ul>
          {users.map(
            (user) =>
              activatedUserIds.includes(user.id) &&
              searchedUsers.includes(user.id) && (
                <li
                  key={user.id}
                  className={`p-2 flex justify-between cursor-pointer hover:bg-gray-200`}
                  onClick={() => toggleUserActivation(user.id, user.name)}
                >
                  <p>{user.name}</p>
                  <FaToggleOff className="text-gray-800 text-2xl font-normal" />
                </li>
              )
          )}
          {users.map(
            (user) =>
              !activatedUserIds.includes(user.id) &&
              searchedUsers.includes(user.id) && (
                <li
                  key={user.id}
                  className={`p-2 flex justify-between cursor-pointer hover:bg-gray-200`}
                  onClick={() => toggleUserActivation(user.id, user.name)}
                >
                  <p className="line-through">{user.name}</p>
                  <FaToggleOn className="text-blue-500 text-2xl font-normal" />
                </li>
              )
          )}
        </ul>
      </div>
      {selectedUser && !activatedUserIds.includes(selectedUser.id) && (
        <UserDetailsModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
};

export default UserList;
