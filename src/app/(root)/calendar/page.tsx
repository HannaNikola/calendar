import CalendarEl from "@/app/components_Calendar/Calendar";
import { Filter } from "@/app/components_Calendar/Filter";


export default function Calendar() {
 
  return (
    <div className="flex flex-col lg:flex-row ">
      <div className=" flex flex-col">
      {/* < Filter/> */}
      <CalendarEl />
      </div>
     </div>
 );
}
