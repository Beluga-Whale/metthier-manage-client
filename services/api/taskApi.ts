import { Task, TaskResponseDto, UpdateTaskDto } from "@/typesDTO/taskDTO";
import axios from "axios";
const apiUrl: string = process.env.NEXT_PUBLIC_PORT || "";

export const getAllTasks = async (): Promise<TaskResponseDto[]> => {
  try {
    const result = await axios.get(`${apiUrl}/tasks`, {
      withCredentials: true,
    });

    return result?.data?.data;
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
