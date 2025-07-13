import CalendarEl from "@/app/components_Calendar/Calendar";

export default function Calendar() {
  console.log("render calendar");
  return (
    <div className="flex flex-col lg:flex-row ">
      <CalendarEl />
    </div>
  );
}
