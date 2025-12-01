import { createFileRoute } from "@tanstack/react-router";
import { TaskList } from "../../../components/Tasks/Create/TaskList";

export const Route = createFileRoute("/tasks/create/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <TaskList />;
}
