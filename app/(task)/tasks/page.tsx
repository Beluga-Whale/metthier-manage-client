"use client";

import CardTask from "@/components/CardTask";
import DialogEditTask from "@/components/DialogEditTask";
import { useGetAllTasks } from "@/services/taskServices";
import { TaskResponseDto } from "@/typesDTO/taskDTO";

const page = () => {
  const { data: listTasks } = useGetAllTasks();
  return (
    <div className="flex-8 p-4 bg-gray-100 rounded-tl-xl rounded-tr-xl overflow-y-auto max-h-screen ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-10 mx-auto">
        {listTasks?.map((task: TaskResponseDto) => (
          <CardTask key={task.id} task={task} />
        ))}
        <DialogEditTask />
      </div>
    </div>
  );
};

export default page;
