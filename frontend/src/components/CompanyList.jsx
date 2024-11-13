import { Drawer } from '@mui/material';
import React, { useEffect, useState } from "react";
import { fetchCompanies, deleteCompany, createCompany, updateCompany } from "../api";
import UserList from "./UserList";
import AddCompanyForm from "./AddCompanyForm";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import PeopleIcon from '@mui/icons-material/People';
import DeleteIcon from '@mui/icons-material/Delete';

const CompanyList = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [newCompany, setNewCompany] = useState({
    name: "",
    contactNumber: "",
    profilePic: "",
    bio: "",
  });
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);

  useEffect(() => {
    fetchCompanies().then((res) => setCompanies(res.data));
  }, []);

  const handleCreateOrUpdateCompany = (e) => {
    e.preventDefault();
    if (isEditMode && selectedCompany) {
      updateCompany(selectedCompany._id, newCompany).then((res) => {
        setCompanies(companies.map((company) => 
          company._id === selectedCompany._id ? res.data : company
        ));
        resetForm();
      });
    } else {
      createCompany(newCompany).then((res) => {
        setCompanies([...companies, res.data]);
        resetForm();
      });
    }
  };

  const handleEdit = (company) => {
    setIsEditMode(true);
    setSelectedCompany(company);
    setNewCompany(company);
    setOpenDrawer(true);
  };

  const handleDelete = (id) => {
    deleteCompany(id).then(() => {
      setCompanies(companies.filter((company) => company._id !== id));
      if (selectedCompanyId === id) {
        setSelectedCompanyId(null);
      }
    });
  };

  const handleDrawerClose = () => {
    resetForm();
  };

  const resetForm = () => {
    setNewCompany({ name: "", contactNumber: "", profilePic: "", bio: "" });
    setSelectedCompany(null);
    setIsEditMode(false);
    setOpenDrawer(false);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className='flex justify-between'>
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Companies</h2>

        <button
          onClick={() => {
            setIsEditMode(false);
            setNewCompany({ name: "", contactNumber: "", profilePic: "", bio: "" });
            setOpenDrawer(true);
          }}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md shadow-lg hover:bg-blue-600 transition duration-200 space-x-2"
        >
          <AddIcon fontSize="small" />
          <span>Add Company</span>
        </button>
      </div>

      <Drawer open={openDrawer} onClose={handleDrawerClose} anchor="right">
        <AddCompanyForm
          newCompany={newCompany}
          setNewCompany={setNewCompany}
          onSubmit={handleCreateOrUpdateCompany}
          onClose={handleDrawerClose}
          isEditMode={isEditMode}
        />
      </Drawer>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {companies.map((company) => (
          <div
            key={company._id}
            className="flex flex-col justify-between p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200"
          >
            <div>
              <div className="mb-4">
                <img src={company?.profilePic} alt={`${company.name} Logo`} className="w-16 h-16 rounded-full object-cover" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{company.name}</h3>
              <p className="text-gray-600 text-sm">{company.bio || "No bio available"}</p>
            </div>
            <div className="flex justify-between items-center mt-4 space-x-2">
              <button
                onClick={() => setSelectedCompanyId(company._id)}
                className="flex items-center px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition duration-150 space-x-1"
              >
                <PeopleIcon fontSize="small" />
                <span>View Users</span>
              </button>
              <button
                onClick={() => handleEdit(company)}
                className="flex items-center px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition duration-150 space-x-1"
              >
                <EditIcon fontSize="small" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => handleDelete(company._id)}
                className="flex items-center px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-150 space-x-1"
              >
                <DeleteIcon fontSize="small" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedCompanyId && (
        <div className="mt-8">
          <UserList companyId={selectedCompanyId} />
        </div>
      )}
    </div>
  );
};

export default CompanyList;
