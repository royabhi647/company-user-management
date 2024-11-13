import React, { useEffect, useState } from "react";
import { fetchUsers, deleteUser, createUser, updateUser } from "../api";
import AddUserForm from "./AddUserForm";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { Drawer } from "@mui/material";

const UserList = ({ companyId }) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    contactNumber: "",
    profilePic: "",
    bio: "",
    companyId: companyId,
  });
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers(companyId).then((res) => setUsers(res.data));
  }, [companyId]);

  const handleCreateOrUpdateUser = (e) => {
    e.preventDefault();
    if (isEditMode && selectedUser) {
      updateUser(selectedUser._id, newUser).then((res) => {
        setUsers(users.map((user) => (user._id === selectedUser._id ? res.data : user)));
        resetForm();
      });
    } else {
      createUser(newUser).then((res) => {
        setUsers([...users, res.data]);
        resetForm();
      });
    }
  };

  const handleEdit = (user) => {
    setIsEditMode(true);
    setSelectedUser(user);
    setNewUser(user);
    setOpenDrawer(true);
  };

  const handleDelete = (id) => {
    deleteUser(id).then(() => {
      setUsers(users.filter((user) => user._id !== id));
    });
  };

  const handleDrawerClose = () => {
    resetForm();
  };

  const resetForm = () => {
    setNewUser({
      name: "",
      email: "",
      contactNumber: "",
      profilePic: "",
      bio: "",
      companyId: companyId,
    });
    setSelectedUser(null);
    setIsEditMode(false);
    setOpenDrawer(false);
  };

  return (
    <div>
      <div className="flex gap-14">
        <h2 className="text-xl font-semibold mb-4">Users in Company</h2>
        <button
          onClick={() => {
            setIsEditMode(false);
            setNewUser({
              name: "",
              email: "",
              contactNumber: "",
              profilePic: "",
              bio: "",
              companyId: companyId,
            });
            setOpenDrawer(true);
          }}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md shadow-lg hover:bg-blue-600 transition duration-200 space-x-2"
        >
          <AddIcon fontSize="small" />
          <span>Add User</span>
        </button>
      </div>

      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {users.map((user) => (
          <div key={user._id} className="border p-3 rounded-lg shadow-sm flex flex-col items-center space-y-2 bg-white">
            {user.profilePic && (
              <img
                src={user.profilePic}
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover shadow-md"
              />
            )}
            <h3 className="text-md font-semibold text-center">{user.name}</h3>
            <p className="text-xs text-gray-600 text-center">{user.email}</p>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(user)}
                className="text-xs bg-yellow-500 text-white px-2 py-1 rounded-full hover:bg-yellow-600 transition-colors"
              >
                <EditIcon fontSize="small" /> Edit
              </button>
              <button
                onClick={() => handleDelete(user._id)}
                className="text-xs bg-red-500 text-white px-2 py-1 rounded-full hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <Drawer open={openDrawer} onClose={handleDrawerClose} anchor="right">
        <AddUserForm
          newUser={newUser}
          setNewUser={setNewUser}
          onSubmit={handleCreateOrUpdateUser}
          onClose={handleDrawerClose}
          isEditMode={isEditMode}
        />
      </Drawer>
    </div>
  );
};

export default UserList;