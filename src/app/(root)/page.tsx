
import CalendarEl from "../components/Calendar";
import Navbar from "../components/Navbar";
import { PageWrapper } from "../shared/PageWrapper";

export default function Home() {
  return (
    <div className="flex">
      <PageWrapper>
      <Navbar/>
     <CalendarEl/>
     </PageWrapper>
    </div>
  );
}
