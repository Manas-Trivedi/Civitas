import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, LayoutDashboard, FileText, ShieldCheck, Users, Settings, Key } from "lucide-react";

const Sidebar = ({ isCollapsed, toggleCollapse }) => {
  const [showDescription, setShowDescription] = useState(false);
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);

  useEffect(() => {
    const appContainer = document.querySelector(".poll-app");
    if (isCollapsed) {
      appContainer.classList.add("content-collapsed");
    } else {
      appContainer.classList.remove("content-collapsed");
    }
  }, [isCollapsed]);

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`} style={{ backgroundColor: '#F8F9FA', width: isCollapsed ? '80px' : '280px', borderRadius: '12px' }}>
      <div className="sidebar-header">
        <Menu size={20} onClick={toggleCollapse} style={{ cursor: "pointer" }} />
        {!isCollapsed && <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#6C757D' }}>Civitas Dashboard</h2>}
        {!isCollapsed && <div className="info-icon" onClick={toggleDescription} style={{ cursor: "pointer" }}>i</div>}
      </div>
      {!isCollapsed && showDescription && (
        <p className={`description ${showDescription ? "show" : ""}`}>
          Civitas is a platform designed to empower communities by providing insights and tools for discussion moderation.
        </p>
      )}
      <nav>
        <ul className="sidebar-menu">
          <Link to="/" className={activePath === "/" ? "active" : ""} style={{ textDecoration: 'none' }}>
            <li style={{
              transition: 'background-color 0.3s, color 0.3s, width 0.3s, height 0.3s, border-radius 0.3s',
              display: 'flex',
              alignItems: 'center',
              padding: '8px',
              borderRadius: isCollapsed && activePath === "/" ? '50%' : '8px',
              border: activePath === "/" ? '2px solid #5038bc' : 'none',
              width: isCollapsed && activePath === "/" ? '40px' : 'auto',
              height: isCollapsed && activePath === "/" ? '40px' : 'auto',
              justifyContent: isCollapsed && activePath === "/" ? 'center' : 'flex-start',
              margin: isCollapsed && activePath === "/" ? '0 auto' : '0'
            }}>
              <LayoutDashboard size={16} style={{ width: '16px', height: '16px', marginRight: isCollapsed ? '0' : '8px' }} />
              {!isCollapsed && <span style={{ color: activePath === "/" ? '#343A40' : '#6C757D', fontSize: '14px', fontWeight: '500' }}>Dashboard</span>}
            </li>
          </Link>
          <Link to="/evaluation" className={activePath === "/evaluation" ? "active" : ""} style={{ textDecoration: 'none' }}>
            <li style={{
              transition: 'background-color 0.3s, color 0.3s, width 0.3s, height 0.3s, border-radius 0.3s',
              display: 'flex',
              alignItems: 'center',
              padding: '8px',
              borderRadius: isCollapsed && activePath === "/evaluation" ? '50%' : '8px',
              border: activePath === "/evaluation" ? '2px solid #5038bc' : 'none',
              width: isCollapsed && activePath === "/evaluation" ? '40px' : 'auto',
              height: isCollapsed && activePath === "/evaluation" ? '40px' : 'auto',
              justifyContent: isCollapsed && activePath === "/evaluation" ? 'center' : 'flex-start',
              margin: isCollapsed && activePath === "/evaluation" ? '0 auto' : '0'
            }}>
              <FileText size={16} style={{ width: '16px', height: '16px', marginRight: isCollapsed ? '0' : '8px' }} />
              {!isCollapsed && <span style={{ color: activePath === "/evaluation" ? '#343A40' : '#6C757D', fontSize: '14px', fontWeight: '500' }}>Evaluation</span>}
            </li>
          </Link>
          <Link to="/moderation-queue" className={activePath === "/moderation-queue" ? "active" : ""} style={{ textDecoration: 'none' }}>
            <li style={{
              transition: 'background-color 0.3s, color 0.3s, width 0.3s, height 0.3s, border-radius 0.3s',
              display: 'flex',
              alignItems: 'center',
              padding: '8px',
              borderRadius: isCollapsed && activePath === "/moderation-queue" ? '50%' : '8px',
              border: activePath === "/moderation-queue" ? '2px solid #5038bc' : 'none',
              width: isCollapsed && activePath === "/moderation-queue" ? '40px' : 'auto',
              height: isCollapsed && activePath === "/moderation-queue" ? '40px' : 'auto',
              justifyContent: isCollapsed && activePath === "/moderation-queue" ? 'center' : 'flex-start',
              margin: isCollapsed && activePath === "/moderation-queue" ? '0 auto' : '0'
            }}>
              <ShieldCheck size={16} style={{ width: '16px', height: '16px', marginRight: isCollapsed ? '0' : '8px' }} />
              {!isCollapsed && <span style={{ color: activePath === "/moderation-queue" ? '#343A40' : '#6C757D', fontSize: '14px', fontWeight: '500' }}>Moderation Queue</span>}
            </li>
          </Link>
          <Link to="/user-management" className={activePath === "/user-management" ? "active" : ""} style={{ textDecoration: 'none' }}>
            <li style={{
              transition: 'background-color 0.3s, color 0.3s, width 0.3s, height 0.3s, border-radius 0.3s',
              display: 'flex',
              alignItems: 'center',
              padding: '8px',
              borderRadius: isCollapsed && activePath === "/user-management" ? '50%' : '8px',
              border: activePath === "/user-management" ? '2px solid #5038bc' : 'none',
              width: isCollapsed && activePath === "/user-management" ? '40px' : 'auto',
              height: isCollapsed && activePath === "/user-management" ? '40px' : 'auto',
              justifyContent: isCollapsed && activePath === "/user-management" ? 'center' : 'flex-start',
              margin: isCollapsed && activePath === "/user-management" ? '0 auto' : '0'
            }}>
              <Users size={16} style={{ width: '16px', height: '16px', marginRight: isCollapsed ? '0' : '8px' }} />
              {!isCollapsed && <span style={{ color: activePath === "/user-management" ? '#343A40' : '#6C757D', fontSize: '14px', fontWeight: '500' }}>User Management</span>}
            </li>
          </Link>
          <Link to="/settings" className={activePath === "/settings" ? "active" : ""} style={{ textDecoration: 'none' }}>
            <li style={{
              transition: 'background-color 0.3s, color 0.3s, width 0.3s, height 0.3s, border-radius 0.3s',
              display: 'flex',
              alignItems: 'center',
              padding: '8px',
              borderRadius: isCollapsed && activePath === "/settings" ? '50%' : '8px',
              border: activePath === "/settings" ? '2px solid #5038bc' : 'none',
              width: isCollapsed && activePath === "/settings" ? '40px' : 'auto',
              height: isCollapsed && activePath === "/settings" ? '40px' : 'auto',
              justifyContent: isCollapsed && activePath === "/settings" ? 'center' : 'flex-start',
              margin: isCollapsed && activePath === "/settings" ? '0 auto' : '0'
            }}>
              <Settings size={16} style={{ width: '16px', height: '16px', marginRight: isCollapsed ? '0' : '8px' }} />
              {!isCollapsed && <span style={{ color: activePath === "/settings" ? '#343A40' : '#6C757D', fontSize: '14px', fontWeight: '500' }}>Settings</span>}
            </li>
          </Link>
          <Link to="/api-access" className={activePath === "/api-access" ? "active" : ""} style={{ textDecoration: 'none' }}>
            <li style={{
              transition: 'background-color 0.3s, color 0.3s, width 0.3s, height 0.3s, border-radius 0.3s',
              display: 'flex',
              alignItems: 'center',
              padding: '8px',
              borderRadius: isCollapsed && activePath === "/api-access" ? '50%' : '8px',
              border: activePath === "/api-access" ? '2px solid #5038bc' : 'none',
              width: isCollapsed && activePath === "/api-access" ? '40px' : 'auto',
              height: isCollapsed && activePath === "/api-access" ? '40px' : 'auto',
              justifyContent: isCollapsed && activePath === "/api-access" ? 'center' : 'flex-start',
              margin: isCollapsed && activePath === "/api-access" ? '0 auto' : '0'
            }}>
              <Key size={16} style={{ width: '16px', height: '16px', marginRight: isCollapsed ? '0' : '8px' }} />
              {!isCollapsed && <span style={{ color: activePath === "/api-access" ? '#343A40' : '#6C757D', fontSize: '14px', fontWeight: '500' }}>API Access</span>}
            </li>
          </Link>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
