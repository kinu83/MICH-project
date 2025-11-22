import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/tasks/create/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/tasks/create/"!</div>;
}
