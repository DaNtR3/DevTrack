// src/App.js
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignIn from "./components/public/SignIn";
import SignUp from "./components/public/SignUp";
import Spinner from "./components/utils/Spiner";
import NotFound from "./components/public/404";
import Home from "./components/Home";
/* Importing components for Users */
import Users from "./components/Users/Users";
import CreateUsers from "./components/Users/Create-user";
import DeleteUsers from "./components/Users/Delete-user";
import ModifyUsers from "./components/Users/Modify-user";
import ResetPassword from "./components/Users/Reset-user-password";
/* Importing components for Roles */
import Roles from "./components/Roles/Roles";
import CreateRoles from "./components/Roles/Create-role";
import DeleteRoles from "./components/Roles/Delete-role";
import ModifyRoles from "./components/Roles/Modify-role";
/* Importing components for Teams */
import Teams from "./components/Teams/Teams";
import CreateTeams from "./components/Teams/Create-team";
import DeleteTeams from "./components/Teams/Delete-team";
import ModifyTeams from "./components/Teams/Modify-team";
/* Importing components for Projects */
import Projects from "./components/Projects/Projects";
import CreateProjects from "./components/Projects/Create-project";
import DeleteProjects from "./components/Projects/Delete-project";
import ModifyProjects from "./components/Projects/Modify-project";
/* Importing components for Tasks */
import Tasks from "./components/Tasks/Tasks";
import CreateTasks from "./components/Tasks/Create-task";
import DeleteTasks from "./components/Tasks/Delete-task";
import ModifyTasks from "./components/Tasks/Modify-task";
/* Importing components for Goals */
import Goals from "./components/Goals/Goals";
import CreateGoals from "./components/Goals/Create-goal";
import DeleteGoals from "./components/Goals/Delete-goal";
import ModifyGoals from "./components/Goals/Modify-goal";
/* Importing components for Dashboard */
import ProjectDashboard from "./components/Dashboards/project_dashboard";
import TaskDashboard from "./components/Dashboards/task_dashboard";
import GoalDashboard from "./components/Dashboards/goal_dashboard";
import UserDashboard from "./components/Dashboards/user_dashboard";
import TeamDashboard from "./components/Dashboards/team_dashboard";
import RoleDashboard from "./components/Dashboards/role_dashboard";
import TaskFilteredDashboard from "./components/Dashboards/task_dashboard_Filtered";

import PasswordReset from "./components/public/PasswordReset";
import ProtectedRoutes from "./components/utils/ProtectedRoutes";
import "./styles/App.css";
import { verifyToken } from "./utils/authUtils"; // Import the utility function

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = loading state
  const [isLoading, setIsLoading] = useState(true); // Loading state for authentication check
  const [sessionExpired, setSessionExpired] = useState(false); // State for session expiration message
  const [wasAuthenticated, setWasAuthenticated] = useState(
    () => JSON.parse(localStorage.getItem("wasAuthenticated")) || false // Retrieve from localStorage
  );
  const [roleID, setRoleID] = useState(null);
  

  const checkAuthentication = async () => {
    let result = null; // Declare a variable to store the result
    try {
      result = await verifyToken(); // Call the utility function
      setIsAuthenticated(result.isAuthenticated); // Update the state based on the result
      if (result.isAuthenticated) {
        setWasAuthenticated(true); // Update the state
        localStorage.setItem("wasAuthenticated", true); // Persist to localStorage
        setRoleID(result.user.roleID); // Extract and store the roleID
      }
    } catch (error) {
      if (error.response?.status === 401 && wasAuthenticated) {
        // Token expired or invalid
        setSessionExpired(true); // Set session expired state
        setIsAuthenticated(false); // Mark as not authenticated

        // Hide the message after 5 seconds
        setTimeout(() => {
          setSessionExpired(false); // Hide the message
        }, 2000); // 2000 milliseconds = 2 seconds
      } else {
        console.error("Error verifying token:", error);
      }
    } finally {
      setIsLoading(false); // Set loading to false after the check
      if (result != null){
        return result.user.id;
      }
    }
  };

  useEffect(() => {
    checkAuthentication(); // Check token validity on component mount

    // Optional: Set up an interval to periodically check token validity
    const interval = setInterval(() => {
      checkAuthentication();
    }, 600000); // Check every 10 minutes

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  if (isLoading) {
    // Show a loading spinner or placeholder while checking authentication
    return <Spinner />;
  }

  return (
    <Router>
      <div className="App">
        {sessionExpired && (
          <div className="session-expired-overlay">
            <div className="session-expired-message">
              <h1>Tu sesión ha expirado</h1>
              <p>Por favor, ingresa tus datos nuevamente.</p>
            </div>
          </div>
        )}
        <Routes>
          {!isAuthenticated ? (
            // Public routes
            <>
              <Route
                path="/signin"
                element={
                  <SignIn
                    setIsAuthenticated={setIsAuthenticated}
                    checkAuthentication={checkAuthentication}
                  />
                } // Pass the function
              />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/reset-password" element={<PasswordReset />} />
              <Route path="*" element={<Navigate to="/signin" />} />{" "}
              {/* Redirect to SignIn */}
            </>
          ) : (
            <>
              {/* Protected routes */}
              <Route
                element={<ProtectedRoutes isAuthenticated={isAuthenticated} />}
              >
                
                <Route path="/home" element={<Home roleID={roleID} checkAuthentication={checkAuthentication}/>} />
                {/* User routes */}
                <Route path="/users" element={<Users roleID={roleID} checkAuthentication={checkAuthentication}/>} />
                <Route path="/users/create" element={<CreateUsers roleID={roleID} checkAuthentication={checkAuthentication} />} />
                <Route path="/users/delete" element={<DeleteUsers roleID={roleID} checkAuthentication={checkAuthentication}/>} />
                <Route path="/users/modify" element={<ModifyUsers roleID={roleID} checkAuthentication={checkAuthentication}/>} />
                <Route path="/users/reset-password" element={<ResetPassword roleID={roleID} checkAuthentication={checkAuthentication}/>} />
                {/* Role routes */}
                <Route path="/roles" element={<Roles roleID={roleID} checkAuthentication={checkAuthentication}/>} />
                <Route path="/roles/create" element={<CreateRoles roleID={roleID} checkAuthentication={checkAuthentication}/>} />
                <Route path="/roles/delete" element={<DeleteRoles roleID={roleID} checkAuthentication={checkAuthentication}/>} />
                <Route path="/roles/modify" element={<ModifyRoles roleID={roleID} checkAuthentication={checkAuthentication}/>} />
                {/* Teams routes */}
                <Route path="/teams" element={<Teams roleID={roleID} checkAuthentication={checkAuthentication}/>} />
                <Route path="/teams/create" element={<CreateTeams roleID={roleID} checkAuthentication={checkAuthentication}/>} />
                <Route path="/teams/delete" element={<DeleteTeams roleID={roleID} checkAuthentication={checkAuthentication}/>} />
                <Route path="/teams/modify" element={<ModifyTeams roleID={roleID} checkAuthentication={checkAuthentication}/>} />
                {/* Project routes */}
                <Route path="/projects" element={<Projects roleID={roleID} checkAuthentication={checkAuthentication}/>} />
                <Route path="/projects/create" element={<CreateProjects roleID={roleID} checkAuthentication={checkAuthentication}/>} />
                <Route path="/projects/delete" element={<DeleteProjects roleID={roleID} checkAuthentication={checkAuthentication}/>} />
                <Route path="/projects/modify" element={<ModifyProjects roleID={roleID} checkAuthentication={checkAuthentication}/>} />
                {/* Tasks routes */}
                <Route path="/tasks" element={<Tasks roleID={roleID} checkAuthentication={checkAuthentication}/>} />
                <Route path="/tasks/create" element={<CreateTasks roleID={roleID} checkAuthentication={checkAuthentication}/>} />
                <Route path="/tasks/delete" element={<DeleteTasks roleID={roleID} checkAuthentication={checkAuthentication}/>} />
                <Route path="/tasks/modify" element={<ModifyTasks roleID={roleID} checkAuthentication={checkAuthentication}/>} />
                {/* Goals routes */}
                <Route path="/goals" element={<Goals roleID={roleID} checkAuthentication={checkAuthentication}/>} />
                <Route path="/goals/create" element={<CreateGoals roleID={roleID} checkAuthentication={checkAuthentication}/>} />
                <Route path="/goals/delete" element={<DeleteGoals roleID={roleID} checkAuthentication={checkAuthentication}/>} />
                <Route path="/goals/modify" element={<ModifyGoals roleID={roleID} checkAuthentication={checkAuthentication}/>} />
                {/* Dashboard routes */}
                <Route path="/projects/show" element={<ProjectDashboard roleID={roleID} checkAuthentication={checkAuthentication}/>} />
                <Route path="/tasks/show" element={<TaskDashboard roleID={roleID} checkAuthentication={checkAuthentication}/>} />
                <Route path="/goals/show" element={<GoalDashboard roleID={roleID} checkAuthentication={checkAuthentication}/>} />
                <Route path="/users/show" element={<UserDashboard roleID={roleID} checkAuthentication={checkAuthentication}/>} />
                <Route path="/teams/show" element={<TeamDashboard roleID={roleID} checkAuthentication={checkAuthentication}/>} />
                <Route path="/roles/show" element={<RoleDashboard roleID={roleID} checkAuthentication={checkAuthentication}/>} />
                <Route path="/tasks/filtered-tasks" element={<TaskFilteredDashboard roleID={roleID} checkAuthentication={checkAuthentication}/>} />
              </Route>
              <Route path="*" element={<NotFound />} />
              {/* Catch-all for authenticated users */}
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
