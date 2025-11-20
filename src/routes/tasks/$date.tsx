import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/tasks/$date")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/tasks/$date"!</div>;
}
