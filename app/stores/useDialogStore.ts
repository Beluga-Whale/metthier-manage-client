// stores/useCounterStore.ts
import { Task, TaskStatus } from "@/typesDTO/taskDTO";
import { create } from "zustand";

interface DialogState {
  toggleEdit: boolean;
  taskDetail: Task | undefined;
  statusTask: TaskStatus | undefined;
  setToggleEdit: (open: boolean) => void;
  setTaskDetail: (task: Task) => void;
  setStatusTask: (status: TaskStatus | undefined) => void;
  reset: () => void;
}

export const useDialogStore = create<DialogState>((set) => ({
  toggleEdit: false,
  taskDetail: undefined,
  statusTask: undefined,
  setToggleEdit: (open: boolean) =>
    set(() => ({
      toggleEdit: open,
    })),
  setTaskDetail: (task: Task) =>
    set(() => ({
      taskDetail: task,
    })),
  setStatusTask: (status) => set({ statusTask: status }),
  reset: () => set({ toggleEdit: false, taskDetail: undefined }),
}));
