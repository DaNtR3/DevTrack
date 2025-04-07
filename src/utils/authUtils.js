import api from "../services/api";

export const verifyToken = async () => {
  try {
    const response = await api.verifyToken();
    if (response.data.success) {
      return { isAuthenticated: true, user: response.data.user }; // Return authentication status and user data
    } else {
      return { isAuthenticated: false }; // Return unauthenticated status
    }
  } catch (err) {
    if (err.response?.status === 401) {
      // Token is invalid or expired
      throw err; // Re-throw the error so it can be handled by the calling function
    }
    console.error("Token verification failed:", err);
    throw err; // Re-throw other errors as well
  }
};
