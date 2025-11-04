"use client"
import CalendarEl from "@/app/components_Calendar/Calendar";
import { Tasklistsection } from "@/app/components_Calendar/Tasklistsection";
import { useScreenType } from "@/app/hooks/useScreenType";


export default function Calendar() {
  const screenType = useScreenType();
 
  return (
    <div className="flex flex-col lg:flex-row  ">
      <div className=" flex h-full flex-col overflow-y-auto ">
      <CalendarEl />
      </div>
      
      {screenType === 'desktop' &&(
        <div className="flex h-full w-[260px]">
        <Tasklistsection/>
      </div>
      )}
      
     </div>
 );
}