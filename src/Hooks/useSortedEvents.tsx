import { useEffect, useState } from 'react'
import { useEvents } from './useEvents';
import { GoogleEventType } from '../types/calendar';

export const useSortedEvents = () => {
  const events = useEvents();

  const [upcomingEvents, setUpcomingEvents] = useState<GoogleEventType[]>();
  const [passedEvents, setPassedEvents] = useState<GoogleEventType[]>();
  const [upcomingYears, setUpcomingYears] = useState<number[]>([]);
  const [passedYears, setPassedYears] = useState<number[]>([]);

  // useEffect(() => {
  //   console.log("upcomingEvents:",upcomingEvents)
  // }, [upcomingEvents]);

  // useEffect(() => {
  //   console.log("passedEvents:",passedEvents)
  // }, [passedEvents]);

  // useEffect(() => {
  //   console.log("upcomingYears:",upcomingYears)
  // }, [upcomingYears]);

  // useEffect(() => {
  //   console.log("passedYears:",passedYears)
  // }, [passedYears]);

  useEffect(() => {
    if (events) {
      console.log("events:",events)
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

  return {
    upcomingEvents: upcomingEvents,
    passedEvents: passedEvents,
    upcomingYears: upcomingYears,
    passedYears: passedYears
  }
}
