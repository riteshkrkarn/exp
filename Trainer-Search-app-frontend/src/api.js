import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/";

const getAuthHeader = () => {
  const token = localStorage.getItem("access");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Error handler utility function
const handleError = (error, operation) => {
  let errorMessage = `Failed to ${operation}`;

  if (error.response) {
    // Server responded with error status
    const status = error.response.status;
    const data = error.response.data;

    if (status === 401) {
      errorMessage = "Unauthorized. Please login again.";
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      window.location.href = "/";
    } else if (status === 403) {
      errorMessage = "Permission denied.";
    } else if (status === 404) {
      errorMessage = "Resource not found.";
    } else if (status === 400) {
      // Validation errors from server
      if (typeof data === "object") {
        const firstError = Object.values(data)[0];
        errorMessage = Array.isArray(firstError) ? firstError[0] : firstError;
      } else {
        errorMessage = data.detail || "Invalid request.";
      }
    } else if (status === 500) {
      errorMessage = "Server error. Please try again later.";
    } else {
      errorMessage = data.detail || data.message || errorMessage;
    }
  } else if (error.request) {
    // Request made but no response
    errorMessage = "No response from server. Check your connection.";
  } else if (error.message === "Network Error") {
    errorMessage = "Network error. Backend may not be running.";
  }

  console.error(`${operation} error:`, error);
  return errorMessage;
};

export const loginUser = async (username, password) => {
  try {
    if (!username || !password) {
      throw new Error("Username and password are required");
    }
    const response = await axios.post(`${BASE_URL}token/`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error(handleError(error, "login"));
  }
};

export const getTrainers = async (filters = {}) => {
  try {
    const params = new URLSearchParams(filters).toString();
    const response = await axios.get(`${BASE_URL}trainers/?${params}`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    throw new Error(handleError(error, "fetch trainers"));
  }
};

export const addTrainer = async (trainersData) => {
  try {
    // Validate required fields
    const requiredFields = [
      "name",
      "location",
      "email",
      "phone",
      "technology1",
      "technology2",
    ];
    const missingFields = requiredFields.filter(
      (field) => !trainersData[field]
    );

    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
    }

    const response = await axios.post(`${BASE_URL}trainers/`, trainersData, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    throw new Error(handleError(error, "add trainer"));
  }
};

export const updateTrainer = async (id, trainerData) => {
  try {
    if (!id) {
      throw new Error("Trainer ID is required");
    }

    const response = await axios.put(
      `${BASE_URL}trainers/${id}/`,
      trainerData,
      {
        headers: getAuthHeader(),
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(handleError(error, "update trainer"));
  }
};

export const deleteTrainer = async (id) => {
  try {
    if (!id) {
      throw new Error("Trainer ID is required");
    }

    const response = await axios.delete(`${BASE_URL}trainers/${id}/`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    throw new Error(handleError(error, "delete trainer"));
  }
};
