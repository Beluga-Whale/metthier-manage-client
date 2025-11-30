"use client";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "./ui/dialog";
import FormInputField from "./FormInput/FormInputField";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useState } from "react";
import { CreateTaskDto, TaskStatus } from "@/typesDTO/taskDTO";
import FormSelectField from "./FormInput/FormSelectField";
import { useCreateTask } from "@/services/taskServices";
import { SquarePlus } from "lucide-react";

type DialogCreateTaskProps = {
  btn: boolean;
};

const formSchema = z.object({
  title: z.string().min(1, { message: "title is required." }),
  description: z.string().min(1, { message: "title is required." }),
  status: z.enum(TaskStatus, {
    message: "Status is required",
  }),
});

const DialogCreateTask = ({ btn }: DialogCreateTaskProps) => {
  const [open, setOpen] = useState(false);

  const { mutateAsync: mutateCreateTask } = useCreateTask();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      status: TaskStatus.TO_DO,
    },
  });

  const handleSubmitTask = async (values: z.infer<typeof formSchema>) => {
    try {
      const payload: CreateTaskDto = {
        title: values.title,
        description: values.description,
        status: values.status,
      };
      await mutateCreateTask(payload)
        .then(() => {
          toast.success("Create Success");

          setOpen(false);
          form.reset();
        })
        .catch((error: any) => {
          toast.error(error);
        });
    } catch (err) {
      console.error("Error : ", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="mx-auto w-full">
        {btn ? (
          <SquarePlus
            className="sm:hidden text-slate-500 hover:text-violet-400 cursor-pointer"
            size={24}
          />
        ) : (
          <Button
            variant="outline"
            className=" max-w-[20.6rem] h-[5rem] bg-violet-400 text-white hover:bg-violet-500 hover:text-white cursor-pointer"
          >
            Add New Task
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="p-3 bg-slate-50" aria-describedby="dialog-desc">
        <DialogHeader>
          <DialogTitle>Create Task</DialogTitle>
          <DialogDescription className="sr-only">
            Form for creating a new task
          </DialogDescription>
        </DialogHeader>
        <FormProvider {...form}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit(handleSubmitTask)();
            }}
            className="space-y-5"
          >
            <FormInputField
              control={form.control}
              name="title"
              label="Title"
              placeholder="Task Title"
            />
            <FormInputField
              control={form.control}
              name="description"
              label="Description"
              placeholder="Task Description"
            />
            <FormSelectField
              control={form.control}
              name="status"
              label="Task Status"
              options={[
                { label: "To Do", value: TaskStatus.TO_DO },
                { label: "In Progress", value: TaskStatus.IN_PROGRESS },
                { label: "Done", value: TaskStatus.DONE },
              ]}
            />
            <DialogFooter>
              <Button type="submit" className="w-full">
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};
export default DialogCreateTask;
