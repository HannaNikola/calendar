import Navbar from "@/app/components_Calendar/Navbar";
import { Test } from "@/app/components_settings/test";

export default function Settings() {
  return (
    <div className="flex flex-col sm:flex-row">
      <Navbar />
      <Test />
    </div>
  );
}
