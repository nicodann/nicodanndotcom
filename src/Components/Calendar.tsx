import { useState, useEffect } from "react";
import Event from "./Event";
import '../Styles/Calendar.scss';
import { GoogleEventType } from "../types/calendar";
import { useEvents } from "../Hooks/useEvents";
import { useSortedEvents } from "../Hooks/useSortedEvents";

function Calendar() {
  // const calendarID = process.env.REACT_APP_CALENDAR_ID;  
  // const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
  // const [events, setEvents] = useState<GoogleEventType[]>();
  const [upcomingEvents, setUpcomingEvents] = useState<GoogleEventType[]>();
  const [passedEvents, setPassedEvents] = useState<GoogleEventType[]>();
  const [upcomingYears, setUpcomingYears] = useState<number[]>([]);
  const [passedYears, setPassedYears] = useState<number[]>([]);
  const [displayMore, setDisplayMore] = useState(false);

  const events = useEvents()

  useSortedEvents();

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

  const getYears = (eventArray:GoogleEventType[]) => {
    const years: number[] = [];
    eventArray.map(event => {
      const eventYear = new Date(event.start.dateTime).getFullYear();
      !years.includes(eventYear) && years.push(eventYear)
    })
    return years;
  }

  useEffect(() => {
    upcomingEvents && setUpcomingYears(getYears(upcomingEvents))
  }, [upcomingEvents]);

  useEffect(() => {
    passedEvents && setPassedYears(getYears(passedEvents))
  }, [passedEvents]);

  
  
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