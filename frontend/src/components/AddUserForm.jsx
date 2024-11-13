import React, { useState } from "react";
import crossIcon from '../../assets/cross_cancel.svg';
import { IconButton } from '@mui/material';
import { DropFile } from "./DropFile";

const AddUserForm = ({ newUser, setNewUser, onSubmit, onClose, isEditMode }) => {
  const [userProfilePic, setUserProfilePic] = useState([]);

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileUpload = async (uploadedFile) => {
    setUserProfilePic(uploadedFile);

    if (uploadedFile.length > 0) {
      const file = uploadedFile[0];

      const base64Url = await fileToBase64(file);
      setNewUser((prev) => ({
        ...prev,
        profilePic: base64Url,
      }));
    }
  };

  return (
    <div className="p-8 w-full max-w-xl min-w-[400px] bg-white rounded-lg shadow-md mx-auto">
      <div className="flex justify-between items-center border-b pb-4 mb-4">
        <p className="text-lg font-semibold text-gray-900">Enter User Details</p>
        <IconButton onClick={onClose} className="-mr-2">
          <img src={crossIcon} alt="Close" className="w-6 transform transition-transform duration-300 hover:rotate-90" />
        </IconButton>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            placeholder="Enter user name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            placeholder="Enter email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Contact Number</label>
          <input
            type="text"
            placeholder="Enter contact number"
            value={newUser.contactNumber}
            onChange={(e) => setNewUser({ ...newUser, contactNumber: e.target.value })}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="w-full min-w-[300px]">
          <DropFile
            setFile={handleFileUpload}
            files={userProfilePic}
            heading="Profile Picture"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Bio</label>
          <textarea
            placeholder="Enter bio"
            value={newUser.bio}
            onChange={(e) => setNewUser({ ...newUser, bio: e.target.value })}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-between items-center mt-10 gap-4">
          <button
            onClick={onClose}
            type="button"
            className="w-1/4 h-12 rounded-lg border-2 border-blue-500 text-blue-500 font-medium text-sm hover:bg-blue-100"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="w-1/4 h-12 rounded-lg bg-blue-500 text-white font-medium text-sm hover:bg-blue-600"
          >
            {isEditMode ? "Update" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUserForm;