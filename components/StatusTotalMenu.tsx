import { useGetAllTasks } from "@/services/taskServices";
import { TaskStatus } from "@/typesDTO/taskDTO";
import { Tally1 } from "lucide-react";

const StatusTotalMenu = () => {
  const { data: taskData, isLoading, isError } = useGetAllTasks();

  const taskAll = taskData?.length;
  const taskInprogress = taskData?.filter(
    (item) => item.status == TaskStatus.IN_PROGRESS
  );
  const taskComplete = taskData?.filter(
    (item) => item.status == TaskStatus.DONE
  );
  const taskTodo = taskData?.filter((item) => item.status == TaskStatus.TO_DO);
  const title = [
    {
      title: "Total Tasks",
      count: taskAll,
      color: "text-purple-400",
    },
    {
      title: "In Progress",
      count: taskInprogress?.length,
      color: "text-blue-400",
    },
    {
      title: "To Do Tasks",
      count: taskTodo?.length,
      color: "text-green-400",
    },
    {
      title: "Completed",
      count: taskComplete?.length,
      color: "text-orange-400",
    },
  ];
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching profile</p>;
  return (
    <div className="grid grid-cols-2 gap-4 ">
      {title.map((item, index) => (
        <div className="flex flex-col" key={index}>
          <p className="text-lg text-gray-400">{item.title}:</p>
          <div className="flex items-center">
            <span>
              <Tally1 className={item.color} size={40} />
            </span>
            <p className="text-2xl">{item.count}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
export default StatusTotalMenu;
