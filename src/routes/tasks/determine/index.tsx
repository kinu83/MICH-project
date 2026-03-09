import { createFileRoute } from "@tanstack/react-router";
import { TaskDetermine } from "../../../components/Tasks/Determine/taskDetermine";

export const Route = createFileRoute("/tasks/determine/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <TaskDetermine />;
}
