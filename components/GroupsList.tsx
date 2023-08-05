import React, { useState, useEffect } from "react";

interface User {
  id: number;
  name: string;
  company: {
    name: string;
  };
}

const GroupsList: React.FC<{ users: User[] }> = ({ users }) => {
  const [groups, setGroups] = useState<{ [key: string]: User[] }>({});
  const [sortOption, setSortOption] = useState<"groupSize" | "groupName">(
    "groupName"
  );
  const [selectedOrganization, setSelectedOrganization] = useState<string>("");
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    const categorizedGroups = users.reduce<{ [key: string]: User[] }>(
      (acc, user) => {
        const organization = user.company.name;
        if (acc[organization]) {
          acc[organization].push(user);
        } else {
          acc[organization] = [user];
        }
        return acc;
      },
      {}
    );
    setGroups(categorizedGroups);
  }, [users]);

  const organizationOptions = Object.keys(groups);

  const filteredGroups = selectedOrganization
    ? { [selectedOrganization]: groups[selectedOrganization] }
    : groups;

  const sortedAndFilteredGroups = Object.keys(filteredGroups).sort((a, b) => {
    if (sortOption === "groupName") {
      return a.localeCompare(b);
    } else if (sortOption === "groupSize") {
      return filteredGroups[a].length - filteredGroups[b].length;
    }
    return 0;
  });

  return (
    <div className="items-center w-full flex justify-center flex-col">
      <div className="mb-4 bg-white w-full py-4">
        <h3 className="text-blue-600 font-bold text-2xl ml-4">
          Categorize Users
        </h3>
      </div>
      <div className="w-4/5 bg-white rounded p-4">
        <div className="mb-4 flex items-center">
          <label className="mr-2 font-medium">Sort by:</label>
          <select
            value={sortOption}
            onChange={(e) =>
              setSortOption(e.target.value as "groupSize" | "groupName")
            }
            className="border border-gray-300 rounded px-2 py-1"
          >
            <option value="groupName">Group Name</option>
            <option value="groupSize">Group Size</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Filter by Organization:</label>
          <select
            value={selectedOrganization}
            onChange={(e) => setSelectedOrganization(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 w-full"
          >
            <option value="">All Organizations</option>
            {organizationOptions.map((org) => (
              <option key={org} value={org}>
                {org}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-auto">
          {sortedAndFilteredGroups.map((organization) => (
            <div key={organization} className="border rounded p-4">
              <h2 className="text-lg font-medium mb-2">{organization}</h2>
              <ul className="max-h-40 overflow-y-auto smooth-scroll">
                {filteredGroups[organization].map((user) => (
                  <li key={user.id} className="mb-1">
                    {user.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GroupsList;
