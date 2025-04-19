
import CalendarEl from "../components_Calendar/Calendar";
import Navbar from "../components_Calendar/Navbar";
import { PageWrapper } from "../shared/PageWrapper";


export default function Home() {
  return (
    <div className="flex  ">
      <PageWrapper>
      <Navbar/>
     <CalendarEl/>
     </PageWrapper>
    </div>
  );
}
