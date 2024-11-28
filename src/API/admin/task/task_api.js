import Instance from "../../Instance";

export const fetchAllTasks = async () => {
  try {
    const response = await Instance.post("/admin/getAllTask");
    return response.data;
  } catch (error) {
    console.error("Error fetching Tasks:", error);
    throw error;
  }
};

export const createTask = async () => {
  try {
    const response = await Instance.post("/admin/createTask");

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Failed to create task: ${response.status}`);
    }
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

export const editTask = async (taskId, updatedTask) => {
  try {
    if (!taskId) {
      throw new Error("Task ID is missing or invalid");
    }

    console.log("Updating task with ID:", taskId);
    console.log("Updated task data:", updatedTask);

    const response = await Instance.put(
      `/admin/editTask/${taskId}`,
      updatedTask
    );

    // Check the response and handle success
    if (response.status === 200) {
      return response.data; // Return updated data on success
    } else {
      throw new Error(`Failed to update task: ${response.status}`);
    }
  } catch (error) {
    console.error("Error editing task:", error);
    throw error;
  }
};

export const deleteTask = async (taskId) => {
  try {
    if (!taskId) {
      throw new Error("Task ID is missing or invalid");
    }
    console.log("Deleting task with ID:", taskId);
    const response = await Instance.delete(`/admin/deleteTask/${taskId}`, {
      id: taskId,
    });
    console.log("Response from server:", response);

    if (response.data.status) {
      return response.data;
    } else {
      throw new Error(response.data.message || "Failed to delete task");
    }
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};