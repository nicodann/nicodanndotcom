import { useState } from "react";
import Event from "./Event";
import '../Styles/Calendar.scss';
import { useSortedEvents } from "../Hooks/useSortedEvents";

function Calendar() {
  const [displayMore, setDisplayMore] = useState(false);

  const {
    upcomingEvents,
    passedEvents,
    upcomingYears,
    passedYears
  } = useSortedEvents();  
  
  return (
    <div id="calendar">
      <h2>Calendar</h2>
      <h3>Upcoming</h3>
      {upcomingYears.map((year,i) => (
        <div id="year-box" key={i}>
          <h4>
            {year}
          </h4>
          {upcomingEvents?.map(event => {
            return new Date(event.start.dateTime).getFullYear() === year && (
              <Event event={event} key={event.id} />
            )        
          })}
        </div>)
      )}
      <br/>
      <h3>Past</h3>
      {passedYears.map((year,i) => (
        <div id="year-box" key={i}>
        <h4>
          {year}
        </h4>
        {passedEvents?.map(event => {
          return new Date(event.start.dateTime).getFullYear() === year && (
            <Event event={event} key={event.id} />
          )        
        })}
      </div>
      ))}
      {passedEvents?.map((event, i) => {
          return !displayMore 
            ? i < 10 && <Event event={event} key={event.id} />
            : <Event event={event} key={event.id} />              
      })}
      <p
        className="link"
        onClick={() => !displayMore ? setDisplayMore(true) : setDisplayMore(false)}        
      >
        {!displayMore ? "display more..." : "display less..."}
      </p>
   </div>
  )
};

export default Calendar;