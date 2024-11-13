import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CompanyList from './src/components/CompanyList';
import UserList from './src/components/UserList';
import './style.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CompanyList />} />
        <Route path="/companies/:id" element={<UserList />} />
      </Routes>
    </Router>
  );
}

export default App;