import React, { useState } from "react";
import crossIcon from '../../assets/cross_cancel.svg';
import { IconButton } from '@mui/material';
import { DropFile } from "./DropFile";

const AddCompanyForm = ({ newCompany, setNewCompany, onSubmit, onClose }) => {
  const [companyLogo, setCompanyLogo] = useState([]);

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileUpload = async (uploadedFile) => {
    setCompanyLogo(uploadedFile);

    if (uploadedFile.length > 0) {
      const file = uploadedFile[0];

      const base64Url = await fileToBase64(file);
      setNewCompany((prev) => ({
        ...prev,
        profilePic: base64Url,
      }));
    }
  };

  return (
    <div className="p-8 w-full max-w-xl min-w-[400px] bg-white rounded-lg shadow-md mx-auto">
      <div className="flex justify-between items-center border-b pb-4 mb-4">
        <p className="text-lg font-semibold text-gray-900">Enter Company Details</p>
        <IconButton onClick={onClose} className="-mr-2">
          <img src={crossIcon} alt="Close" className="w-6 transform transition-transform duration-300 hover:rotate-90" />
        </IconButton>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Company Name</label>
          <input
            type="text"
            placeholder="Enter company name"
            value={newCompany.name}
            onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Contact Number</label>
          <input
            type="text"
            placeholder="Enter contact number"
            value={newCompany.contactNumber}
            onChange={(e) => setNewCompany({ ...newCompany, contactNumber: e.target.value })}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="w-full min-w-[300px]">
          <DropFile
            setFile={handleFileUpload}
            files={companyLogo}
            heading="Company Logo"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Bio</label>
          <textarea
            placeholder="Enter bio"
            value={newCompany.bio}
            onChange={(e) => setNewCompany({ ...newCompany, bio: e.target.value })}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-between items-center mt-10 gap-4">
          <button
            onClick={onClose}
            className="w-1/4 h-12 rounded-lg border-2 border-blue-500 text-blue-500 font-medium text-sm hover:bg-blue-100"
          >
            Cancel
          </button>

          <button
            onClick={onSubmit}
            className="w-1/4 h-12 rounded-lg bg-blue-500 text-white font-medium text-sm hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCompanyForm;