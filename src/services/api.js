import axios from "axios";

const API_URL = "http://localhost:5000/api";

const api = {
  login: async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, credentials, {
        withCredentials: true, // Include cookies in the login request
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  logout: async () => {
    try {
      const response = await axios.post(
        `${API_URL}/auth/logout`, // Endpoint
        {}, // No request body needed for logout
        {
          withCredentials: true, // Include cookies in the request
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  verifyToken: async () => {
    try {
      const response = await axios.get(`${API_URL}/auth/verify`, {
        withCredentials: true, // Include cookies in the request
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  createUser: async (userdata) => {
    try {
      const response = await axios.post(`${API_URL}/user/create`, userdata);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createRole: async (roleData) => {
    try {
      const response = await axios.post(`${API_URL}/role/create`, roleData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createGoal: async (goalData) => {
    try {
      const response = await axios.post(`${API_URL}/goal/create`, goalData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },


  createProject: async (projectData) => {
    try {
      const response = await axios.post(`${API_URL}/project/create`, projectData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createTask: async (taskData) => {
    try {
      const response = await axios.post(`${API_URL}/task/create`, taskData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createComment: async (commentData) => {
    try {
      const response = await axios.post(`${API_URL}/comment/create`, commentData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },


  modifyProject: async (projectData) => {
    try {
      const response = await axios.post(`${API_URL}/project/modify-project`, projectData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  modifyGoal: async (goalData) => {
    try {
      const response = await axios.post(`${API_URL}/goal/modify-goal`, goalData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  modifyTask: async (TaskData) => {
    try {
      const response = await axios.post(`${API_URL}/task/modify-task`, TaskData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },


  modifyRole: async (roleData) => {
    try {
      const response = await axios.post(`${API_URL}/role/modify-role`, roleData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteRole: async (roleData) => {
    try {
      const response = await axios.post(`${API_URL}/role/delete-role`, roleData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteTask: async (taskData) => {
    try {
      const response = await axios.post(`${API_URL}/task/delete-task`, taskData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteGoal: async (goalData) => {
    try {
      const response = await axios.post(`${API_URL}/goal/delete-goal`, goalData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteProject: async (roleData) => {
    try {
      const response = await axios.post(`${API_URL}/project/delete-project`, roleData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteTeam: async (teamData) => {
    try {
      const response = await axios.post(`${API_URL}/team/delete-team`, teamData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },


  deleteUser: async (userdata) => {
    try {
      const response = await axios.post(`${API_URL}/user/delete-user`, userdata);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createUserWithRole: async (userdata) => {
    try {
      const response = await axios.post(
        `${API_URL}/user/create-with-role`,
        userdata
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  modifyUser: async (userdata) => {
    try {
      const response = await axios.post(
        `${API_URL}/user/modify-user`,
        userdata
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  resetUserPassword: async (userdata) => {
    try {
      const response = await axios.post(
        `${API_URL}/user/reset-password`,
        userdata
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getRoles: async () => {
    try {
      const response = await axios.get(`${API_URL}/role/get`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getCommentsFiltered: async (taskid) => {
    try {
      const response = await axios.post(`${API_URL}/comment/get-comment-filtered`, taskid);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getTasksFiltered: async (projectId) => {
    try {
      const response = await axios.post(`${API_URL}/task/get-task-filtered`, projectId);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getPermissions: async () => {
    try {
      const response = await axios.get(`${API_URL}/permission/get`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getUsers: async () => {
    try {
      const response = await axios.get(`${API_URL}/user/get`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getTeams: async () => {
    try {
      const response = await axios.get(`${API_URL}/team/get`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getProjects: async () => {
    try {
      const response = await axios.get(`${API_URL}/project/get`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getProjectsInfo: async () => {
    try {
      const response = await axios.get(`${API_URL}/project/get-info`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getUsersInfo: async () => {
    try {
      const response = await axios.get(`${API_URL}/user/get-info`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getTasksInfo: async () => {
    try {
      const response = await axios.get(`${API_URL}/task/get-info`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getGoalsInfo: async () => {
    try {
      const response = await axios.get(`${API_URL}/goal/get-info`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getTeamsInfo: async () => {
    try {
      const response = await axios.get(`${API_URL}/team/get-info`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getRolesInfo: async () => {
    try {
      const response = await axios.get(`${API_URL}/role/get-info`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getTasks: async () => {
    try {
      const response = await axios.get(`${API_URL}/task/get`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createTeam: async (teamData) => {
    try {
      const response = await axios.post(`${API_URL}/team/create`, teamData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  modifyTeam: async (teamData) => {
    try {
      const response = await axios.post(`${API_URL}/team/modify-team`, teamData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default api;
