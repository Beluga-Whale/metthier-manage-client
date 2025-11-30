import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTask, deleteTask, getAllTasks, updateTask } from "./api/taskApi";
import { TaskStatus, UpdateTaskDto } from "@/typesDTO/taskDTO";

export const getTasksQueryKey = "getTasksQueryKey";

export const useGetAllTasks = (status?: TaskStatus) => {
  return useQuery({
    queryKey: [getTasksQueryKey, status],
    queryFn: () => getAllTasks(status),
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient(); // ใช้ queryClient
  return useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [getTasksQueryKey] });
    },
    onError: (error: Error) => {
      console.error("Create Task Failed:", error.message);
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { id: number; body: UpdateTaskDto }) =>
      updateTask(data?.id, data?.body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [getTasksQueryKey],
      });
      // queryClient.invalidateQueries({
      //   queryKey: [getTasksCompleteQueryKey],
      // });
      // queryClient.invalidateQueries({
      //   queryKey: [getTasksPendingQueryKey],
      // });
      // queryClient.invalidateQueries({
      //   queryKey: [getTasksOverdueQueryKey],
      // });
    },
    onError: (error: Error) => {
      console.error("Update Task Error : ", error.message);
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [getTasksQueryKey],
      });
      // queryClient.invalidateQueries({
      //   queryKey: [getTasksCompleteQueryKey],
      // });
      // queryClient.invalidateQueries({
      //   queryKey: [getTasksPendingQueryKey],
      // });
      // queryClient.invalidateQueries({
      //   queryKey: [getTasksOverdueQueryKey],
      // });
    },
    onError: (error: Error) => {
      console.error("Delete Failed:", error.message);
    },
  });
};
