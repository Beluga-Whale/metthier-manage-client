// import { TaskDto } from "@/types";
import { Task, TaskStatus } from "@/typesDTO/taskDTO";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { SquarePen } from "lucide-react";
import { Trash2 } from "lucide-react";
import { useDialogStore } from "@/app/stores/useDialogStore";

import Swal from "sweetalert2";
import { useDeleteTask } from "@/services/taskServices";
dayjs.extend(relativeTime);
type CardTaskProps = {
  task: Task;
};

const CardTask = ({ task }: CardTaskProps) => {
  const { setToggleEdit, setTaskDetail } = useDialogStore();
  const { mutateAsync: deleteMutation } = useDeleteTask();

  const statusConfig = {
    TO_DO: { label: "To Do", color: "text-slate-500 bg-slate-100" },
    IN_PROGRESS: { label: "In Progress", color: "text-blue-600 bg-blue-100" },
    DONE: { label: "Completed", color: "text-green-600 bg-green-100" },
  };
  const { label, color } = statusConfig[task.status];
  const handleDelete = () => {
    Swal.fire({
      title: `Delete ${task?.title} `,
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation(task?.id ?? 0).then(() => {
          Swal.fire({
            title: "Deleted!",
            text: "Your Task has been deleted.",
            icon: "success",
          });
        });
      }
    });
  };

  return (
    <>
      <Card className="w-full max-w-[20.6rem] mx-auto h-[16.2rem] bg-slate-50 ">
        <CardHeader>
          <CardTitle>{task?.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col justify-between h-full">
          <p>{task?.description}</p>
          <div className="flex items-center justify-between">
            <p className="text-sm">{dayjs(task?.createdAt).fromNow()}</p>
            <span
              className={`${color} text-xs px-2 py-1 rounded-full font-medium`}
            >
              {label}
            </span>
            <div className="flex items-center gap-2 ">
              <SquarePen
                className="text-yellow-300 cursor-pointer "
                size={24}
                onClick={() => {
                  setToggleEdit(true);
                  setTaskDetail(task);
                }}
              />
              <Trash2
                className="text-red-500 cursor-pointer"
                size={24}
                data-testid="Delete task"
                aria-label={`Delete task`}
                onClick={() => handleDelete()}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
export default CardTask;
