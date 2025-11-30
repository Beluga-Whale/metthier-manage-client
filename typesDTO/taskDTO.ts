// NOTE - Enum
export enum TaskStatus {
  TO_DO = "TO_DO",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}

// NOTE - Task
export interface Task {
  id: number;
  title: string;
  description: string | null;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

// NOTE -Create DTO
export interface CreateTaskDto {
  title: string;
  description?: string;
  status: TaskStatus;
}

// NOTE -Update DTO
export interface UpdateTaskDto {
  title?: string;
  description?: string;
  status?: TaskStatus;
}

// NOTE -Response DTO (สำหรับ API response)
export type TaskResponseDto = Task;
