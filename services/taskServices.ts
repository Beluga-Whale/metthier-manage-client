import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllTasks, updateTask } from "./api/taskApi";
import { UpdateTaskDto } from "@/typesDTO/taskDTO";

export const getTasksQueryKey = "getTasksQueryKey";

export const useGetAllTasks = () => {
  return useQuery({
    queryKey: [getTasksQueryKey],
    queryFn: () => getAllTasks(),
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
