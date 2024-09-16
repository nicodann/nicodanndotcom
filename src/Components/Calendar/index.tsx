import '../../Styles/Calendar.scss';
import { useSortedEvents } from "../../Hooks/useSortedEvents";
import YearBlock from "./YearBlock";

function Calendar() {

  const {
    upcomingEvents,
    passedEvents,
    upcomingYears,
    passedYears, setPastEventDisplayLimit
  } = useSortedEvents(); 
  
  return (
    <div id="calendar">
      <h3>Upcoming Gigs</h3>
      {upcomingYears.length !== 0 ?
      <YearBlock events={upcomingEvents} years={upcomingYears}/>
      :
      <p style={{fontStyle: "italic"}}>
        Check back soon or join the mailing list!
      </p>
      }
      <h3>Past Performances</h3>
      <YearBlock events={passedEvents} years={passedYears} />
      <p
        className="link"
        onClick={() => setPastEventDisplayLimit(prev => prev + 10)} 
        style={{fontStyle: "italic"}}
      >
        display more...
      </p>
   </div>
  )
};

export default Calendar;