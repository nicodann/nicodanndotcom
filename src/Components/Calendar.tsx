import { useState, useEffect } from "react";
import Event from "./Event";
import '../Styles/Calendar.scss';
import { GoogleEventType } from "../types/calendar";
import { getGoogleEvents } from "../Utils/getGoogleEvents";
import { useEvents } from "../Hooks/useEvents";

function Calendar() {
  const calendarID = process.env.REACT_APP_CALENDAR_ID;  
  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
  const [events, setEvents] = useState<GoogleEventType[]>();
  const [upcomingEvents, setUpcomingEvents] = useState<GoogleEventType[]>();
  const [passedEvents, setPassedEvents] = useState<GoogleEventType[]>();
  const [displayMore, setDisplayMore] = useState(false);

  
  useEffect(() => {
      getGoogleEvents(calendarID, apiKey, setEvents)
    },[apiKey, calendarID]);

    useEffect(() => {
      if (events) {
        const upcomingEvents = events.filter(event => new Date(event.start.dateTime) > new Date() )
        upcomingEvents.sort((a,b) => {
          if (new Date(a.start.dateTime) > new Date(b.start.dateTime)) {
            return 1
          } else {
            return -1
          }          
        })
        setUpcomingEvents(upcomingEvents)
      }
    },[events])

    useEffect(() => {
      if (events) {
        const passedEvents = events.filter(event => new Date(event.start.dateTime) < new Date() )
        passedEvents.sort((a,b) => {
          if (new Date(a.start.dateTime) > new Date(b.start.dateTime)) {
            return -1
          } else {
            return 1
          }          
        })
        setPassedEvents(passedEvents)
      }
    },[events])

  console.log("useEvents:",useEvents())
  
  return (
    <div id="calendar">
      <h2>Calendar</h2>
      <h3>Upcoming</h3>
      {upcomingEvents?.map(event => {
        return (
          <Event event={event} key={event.id} />
        )        
      })}
      <br/>
      <h3>Past</h3>
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