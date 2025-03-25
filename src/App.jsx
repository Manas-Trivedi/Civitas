import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Evaluation from "./components/Evaluation";
import ModerationQueue from "./components/ModerationQueue";
import UserManagement from "./components/UserManagement";
import Settings from "./components/Settings";
import ApiAccess from "./components/ApiAccess";

const App = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <Router>
      <div className="app-container">
        <div className="poll-app">
          <Sidebar isCollapsed={isCollapsed} toggleCollapse={toggleCollapse} />
          <div className="content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/evaluation" element={<Evaluation />} />
              <Route path="/moderation-queue" element={<ModerationQueue />} />
              <Route path="/user-management" element={<UserManagement />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/api-access" element={<ApiAccess />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;