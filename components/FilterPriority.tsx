"use client";
import { useDialogStore } from "@/app/stores/useDialogStore";
import { TaskStatus } from "@/typesDTO/taskDTO";
import { Menubar, MenubarMenu, MenubarTrigger } from "./ui/menubar";

const FilterStatus = () => {
  const { statusTask, setStatusTask } = useDialogStore();

  const statusList = [
    {
      label: "All",
      value: null,
    },
    {
      label: "To Do",
      value: TaskStatus.TO_DO,
    },
    {
      label: "In Progress",
      value: TaskStatus.IN_PROGRESS,
    },
    {
      label: "Done",
      value: TaskStatus.DONE,
    },
  ];

  const handleSelect = (value: TaskStatus | null) => {
    setStatusTask(value);
  };

  return (
    <div>
      <Menubar className="bg-slate-50 border-none">
        {statusList.map((item, index) => (
          <MenubarMenu key={index}>
            <MenubarTrigger
              className={`cursor-pointer text-black hover:text-violet-500 transition-all duration-200 ${
                statusTask === item.value ? "text-violet-500 bg-slate-200" : ""
              }`}
              onClick={() => handleSelect(item.value)}
            >
              {item.label}
            </MenubarTrigger>
          </MenubarMenu>
        ))}
      </Menubar>
    </div>
  );
};

export default FilterStatus;
