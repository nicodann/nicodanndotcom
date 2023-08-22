import { useState, useEffect } from "react";
import { gapi } from "gapi-script";
import Event from "./Event";
import '../Styles/Calendar.css';
import { EventType } from "../types/calendar";

function Calendar() {
  const calendarID = process.env.REACT_APP_CALENDAR_ID;  
  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
  const [events, setEvents] = useState<EventType[]>();
  const [upcomingEvents, setUpcomingEvents] = useState<EventType[]>();
  const [passedEvents, setPassedEvents] = useState<EventType[]>();
  const [displayMore, setDisplayMore] = useState(false);

  const getEvents: (calendarID:string, apiKey:string) => void  = (calendarID, apiKey) => {

    const initiate = () => {
      gapi.client
        .init({apiKey: apiKey})
        .then(() => {
          return gapi.client.request({
            path: `https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events`
          })
        })
        .then(
          (response) => {
            console.log("response.result.items:",response.result.items[0])
            const serverEvents = response.result.items;
            setEvents(serverEvents);
          },
          err => {
            return [false, err]
          }
        )
    }


   gapi.load("client", initiate)

  };

  
  useEffect(() => {
      // const events = getEvents(calendarID, apiKey)
      // setEvents(events)
      getEvents(calendarID, apiKey)
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

  // events && console.log("events[0].start:",events[0].start)
  
  return (
    <div id="calendar">
      <h2>Calendar</h2>
      <h3>Upcoming</h3>
      {upcomingEvents?.map(event => {
        return (
          <Event event={event} key={event.id} />
        )        
      })}

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