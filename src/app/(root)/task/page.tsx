import { TaskEl } from "@/app/components_Task/Task";
import Navbar from "@/app/components_Calendar/Navbar";

export default function Task() {
  return (
    <div className="flex">
      <Navbar />
      <TaskEl />
    </div>
  );
}
