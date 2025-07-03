import CalendarEl from "@/app/components_Calendar/Calendar";
import Navbar from "@/app/components_Calendar/Navbar";
import { PageWrapper } from "@/app/shared/PageWrapper";

export default function Home() {
  return (
    <div className="flex flex-col lg:flex-row">
      {/* <PageWrapper> */}
        <Navbar />
        <CalendarEl />
      {/* </PageWrapper> */}
    </div>
  );
}
