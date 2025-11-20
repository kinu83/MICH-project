import { createFileRoute } from "@tanstack/react-router";
import { Home } from "../components/Home/Home";

export const Route = createFileRoute("/")({
  component: Home,
});
