import '../../Styles/Calendar.scss';
// import { useSortedEvents } from "../../Hooks/useSortedEvents";
import YearBlock from "./YearBlock";
import { useEvents } from '../../Hooks/useEvents';
import { useEffect, useState } from 'react';

function Calendar() {

  const [pastEventDisplayLimit, setPastEventDisplayLimit] = useState(10);

  const {
    upcomingEvents,
    passedEvents,
    upcomingYears,
    passedYears, 
  } = useEvents(pastEventDisplayLimit); 


  useEffect(() => {
    console.log("upcomingEvents",upcomingEvents)
  }, [upcomingEvents]);

  useEffect(() => {
    console.log("passedEvents",passedEvents)
  }, [passedEvents]);
  
  return (
    <div id="calendar">
      <h3>Upcoming Gigs</h3>
      {upcomingYears.length !== 0 && upcomingEvents ?
        <YearBlock events={upcomingEvents} years={upcomingYears}/>
        :
        <p style={{fontStyle: "italic"}}>
          Check back soon or join the mailing list!
        </p>
      }
      <h3>Past Performances</h3>
      {/* {passedYears.length !== 0 && passedEvents ? */}
        <YearBlock events={passedEvents} years={passedYears} />
        
        <p
          className="link"
          onClick={() => setPastEventDisplayLimit(prev => prev + 10)} 
          style={{fontStyle: "italic"}}
        >
          display more...
        </p>
      {/* } */}
   </div>
  )
};

export default Calendar;