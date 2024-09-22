import Header from "../components/Header.jsx";
import { useState, useEffect, useCallback } from "react";

function Dashboard() {
  const [userData, setUserData] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState(new Set());
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const listUrl = "https://task4-back.onrender.com/task4/list-user";

  const getUserData = useCallback(async () => {
    setLoading(true);
    setErrors([]);
    try {
      const result = await fetch(listUrl);
      if (result.ok) {
        const data = await result.json();
        setUserData(data.users);
      } else {
        setErrors([
          result.message ||
            "An unexpected error occurred. Please try again later.",
        ]);
        setUserData([]);
      }
    } catch (error) {
      console.error("An unexpected error has occurred:", error);
      setErrors(["An unexpected error occurred. Please try again later."]);
      setUserData([]);
    } finally {
      setLoading(false);
    }
  }, [listUrl]);

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  const toggleSelectUser = (userId) => {
    setSelectedUsers((prev) => {
      const newSelected = new Set(prev);
      if (newSelected.has(userId)) {
        newSelected.delete(userId);
      } else {
        newSelected.add(userId);
      }
      return newSelected;
    });
  };

  const toggleSelectAll = (isChecked) => {
    if (isChecked) {
      const allUserIds = userData.map((user) => user.id);
      setSelectedUsers(new Set(allUserIds));
    } else {
      setSelectedUsers(new Set());
    }
  };

  const handleDelete = async () => {
    const userIds = Array.from(selectedUsers);
    if (userIds.length === 0) {
      alert("No users selected for deletion.");
      return;
    }
    try {
      const response = await fetch("https://task4-back.onrender.com/task4/delete-user", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: userIds }),
      });

      if (response.ok) {
        setUserData((prev) => prev.filter(user => !userIds.includes(user.id)));
        setSelectedUsers(new Set());
      } else {
        const errorData = await response.json();
        setErrors([errorData.message || "Failed to delete users."]);
      }
    } catch (error) {
      console.error("An error occurred while deleting users:", error);
      setErrors(["An unexpected error occurred. Please try again later."]);
    }
  };

  const handleBlock = async () => {
    const userIds = Array.from(selectedUsers);
    if (userIds.length === 0) {
      alert("No users selected for blocking.");
      return;
    }
    try {
      const response = await fetch("https://task4-back.onrender.com/task4/block-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: userIds }),
      });

      if (response.ok) {
        setUserData((prev) => prev.map(user => 
          userIds.includes(user.id) ? { ...user, status: "blocked" } : user
        ));
        setSelectedUsers(new Set());
      } else {
        const errorData = await response.json();
        setErrors([errorData.message || "Failed to block users."]);
      }
    } catch (error) {
      console.error("An error occurred while blocking users:", error);
      setErrors(["An unexpected error occurred. Please try again later."]);
    }
  };

  const handleUnblock = async () => {
    const userIds = Array.from(selectedUsers);
    if (userIds.length === 0) {
      alert("No users selected for unblocking.");
      return;
    }
    try {
      const response = await fetch("https://task4-back.onrender.com/task4/unblock-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: userIds }),
      });

      if (response.ok) {
        setUserData((prev) => prev.map(user => 
          userIds.includes(user.id) ? { ...user, status: "active" } : user
        ));
        setSelectedUsers(new Set());
      } else {
        const errorData = await response.json();
        setErrors([errorData.message || "Failed to unblock users."]);
      }
    } catch (error) {
      console.error("An error occurred while unblocking users:", error);
      setErrors(["An unexpected error occurred. Please try again later."]);
    }
  };

  return (
    <>
      <Header />
      <div className="bg-gradient-to-r from-rose-100 to-teal-100 h-screen w-full flex flex-col">
        {loading && <p>Loading...</p>}
        {errors.length > 0 && (
          <div className="text-red-500">{errors.join(", ")}</div>
        )}

        <div className="users-table py-2 px-6 flex-grow">
          <div className="flex space-x-4 mb-4 mt-4">
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
            <button
              onClick={handleBlock}
              className="bg-yellow-500 text-white px-4 py-2 rounded"
            >
              Block
            </button>
            <button
              onClick={handleUnblock}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Unblock
            </button>
          </div>
          <div className="overflow-x-auto">
            <div className="min-w-full inline-block align-middle">
              <div className="border rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-white">
                    <tr>
                      <th scope="col" className="py-3 ps-4">
                        <div className="flex items-center h-5">
                          <input
                            id="table-checkbox-all"
                            type="checkbox"
                            className="form-checkbox rounded"
                            onChange={(e) => toggleSelectAll(e.target.checked)}
                          />
                          <label
                            htmlFor="table-checkbox-all"
                            className="sr-only"
                          >
                            Checkbox
                          </label>
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                      >
                        Last Login
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {userData.map((user) => (
                      <tr key={user.id} className="bg-gray-50">
                        <td className="py-3 ps-4">
                          <div className="flex items-center h-5">
                            <input
                              id={`table-checkbox-${user.id}`}
                              type="checkbox"
                              className="form-checkbox rounded"
                              checked={selectedUsers.has(user.id)}
                              onChange={() => toggleSelectUser(user.id)}
                            />
                            <label
                              htmlFor={`table-checkbox-${user.id}`}
                              className="sr-only"
                            >
                              Checkbox
                            </label>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                          {user.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          {new Date(user.last_login_time).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          {user.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
