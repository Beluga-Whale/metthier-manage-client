// stores/useCounterStore.ts
import { Task } from "@/typesDTO/taskDTO";
import { create } from "zustand";

interface DialogState {
  toggleEdit: boolean;
  taskDetail: Task | undefined;
  setToggleEdit: (open: boolean) => void;
  setTaskDetail: (task: Task) => void;
  reset: () => void;
}

export const useDialogStore = create<DialogState>((set) => ({
  toggleEdit: false,
  taskDetail: undefined,
  setToggleEdit: (open: boolean) =>
    set(() => ({
      toggleEdit: open,
    })),
  setTaskDetail: (task: Task) =>
    set(() => ({
      taskDetail: task,
    })),
  reset: () => set({ toggleEdit: false, taskDetail: undefined }),
}));
