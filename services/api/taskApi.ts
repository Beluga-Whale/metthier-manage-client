import {
  CreateTaskDto,
  Task,
  TaskResponseDto,
  TaskStatus,
  UpdateTaskDto,
} from "@/typesDTO/taskDTO";
import axios from "axios";
const apiUrl: string = process.env.NEXT_PUBLIC_PORT || "";

export const getAllTasks = async (
  status?: TaskStatus
): Promise<TaskResponseDto[]> => {
  try {
    const result = await axios.get(`${apiUrl}/tasks?status=${status ?? ""}`, {
      withCredentials: true,
    });

    return result?.data?.data;
  } catch (error) {
    throw error;
  }
};

export const createTask = async (body: CreateTaskDto) => {
  try {
    const result = await axios.post(`${apiUrl}/tasks`, body, {
      withCredentials: true,
    });
    return result?.data;
  } catch (error) {
    throw error;
  }
};

export const updateTask = async (id: number, body: UpdateTaskDto) => {
  try {
    const result = await axios.put(`${apiUrl}/tasks/${id}`, body, {
      withCredentials: true,
    });
    return result?.data?.data;
  } catch (error) {
    throw error;
  }
};

export const deleteTask = async (id: number) => {
  try {
    const result = await axios.delete(`${apiUrl}/tasks/${id}`, {
      withCredentials: true,
    });
    return result?.data;
  } catch (error) {
    throw error;
  }
};
