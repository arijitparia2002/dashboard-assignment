import React from "react";
import { FaTimes } from "react-icons/fa";
import { User } from "../types";

interface UserDetailsModalProps {
  user: User;
  onClose: () => void;
}

const UserDetailsModal: React.FC<UserDetailsModalProps> = ({ user, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-md shadow-gray-300 p-4 mx-4 transform transition-transform ease-in-out duration-300 scale-100 w-1/5">
        <div className="flex justify-end">
          <FaTimes className="text-gray-500 cursor-pointer" onClick={onClose} />
        </div>
        <div className="flex justify-center mt-4">
          <img className="w-2/5 h-auto rounded-full" src={user.photoUrl} alt={user.name} />
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">{user.name}</h2>
          <p className="text-gray-600 font-medium">Email: {user.email}</p>
          <p className="text-gray-600 font-medium">Phone: {user.phone}</p>
          <p className="text-gray-600 font-medium">Company: {user.company.name}</p>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsModal;
