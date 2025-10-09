import CalendarEl from "@/app/components_Calendar/Calendar";


export default function Calendar() {
 
  return (
    <div className="flex flex-col lg:flex-row  ">
      <div className=" flex h-full flex-col overflow-y-auto ">
      <CalendarEl />
      </div>
     </div>
 );
}