
import { useEffect, useState } from 'react'
import { getGoogleEvents } from '../Utils/getGoogleEvents';
import { GoogleEventType } from '../types/calendar';

export const useEvents = () => {
  const calendarID = process.env.REACT_APP_CALENDAR_ID;  
  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
  const [events, setEvents] = useState<GoogleEventType[]>();

  useEffect(() => {
    getGoogleEvents(calendarID, apiKey, setEvents)
  },[apiKey, calendarID]);
  
  return events
}

export const useSortedEvents = () => {
  const [sortedEvents, setSortedEvents] = useState<{[key:number]:GoogleEventType[]}>({})
  const calendarID = process.env.REACT_APP_CALENDAR_ID;  
  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
  const [events, setEvents] = useState<GoogleEventType[]>();

  useEffect(() => {
    getGoogleEvents(calendarID, apiKey, setEvents)
  },[apiKey, calendarID]);

  useEffect(() => {
    events && 
    events.map((event:GoogleEventType) => {
      // console.log("event.start:",new Date(event.start.dateTime).getFullYear())
      const eventYear = new Date(event.start.dateTime).getFullYear();
      // console.log(!sortedEvents[eventYear])
      // if (!sortedEvents[eventYear]) {sortedEvents[eventYear] = [event]}
      !sortedEvents[eventYear] ? (sortedEvents[eventYear] = [event]) : sortedEvents[eventYear].push(event)
    })
  }, [events]);
  return sortedEvents
}
