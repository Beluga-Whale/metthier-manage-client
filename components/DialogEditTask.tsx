"use client";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import FormInputField from "./FormInput/FormInputField";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { toast } from "react-toastify";

import { useEffect } from "react";
import { useDialogStore } from "@/app/stores/useDialogStore";
import FormSelectField from "./FormInput/FormSelectField";
import { TaskStatus, UpdateTaskDto } from "@/typesDTO/taskDTO";
import { useUpdateTask } from "@/services/taskServices";

const formSchema = z.object({
  title: z.string().min(1, { message: "title is required." }),
  description: z.string().min(1, { message: "title is required." }),
  status: z.enum(TaskStatus, {
    message: "Status is required",
  }),
});

const DialogEditTask = () => {
  const { toggleEdit, taskDetail, setToggleEdit, setTaskDetail, reset } =
    useDialogStore();

  const { mutateAsync: mutateUpdateTask } = useUpdateTask();

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
      const payload: UpdateTaskDto = {
        title: values.title,
        description: values.description,
        status: values.status,
      };

      await mutateUpdateTask({
        id: taskDetail?.id ?? 0,
        body: payload,
      })
        .then(() => {
          toast.success("Update Success");
          reset();
          form.reset();
        })
        .catch((error: any) => {
          toast.error(error);
        });
    } catch (err) {
      console.error("Error : ", err);
    }
  };

  useEffect(() => {
    if (taskDetail) {
      form.reset({
        title: taskDetail.title ?? "",
        description: taskDetail.description ?? "",
        status: taskDetail.status,
      });
    }
  }, [taskDetail, form]);

  return (
    <Dialog
      open={toggleEdit}
      onOpenChange={(open) => {
        setToggleEdit(open);
        if (!open) {
          reset();
          form.reset();
        }
      }}
    >
      <DialogTrigger asChild className="mx-auto w-full"></DialogTrigger>
      <DialogContent className="p-3 bg-slate-50">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
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
export default DialogEditTask;
