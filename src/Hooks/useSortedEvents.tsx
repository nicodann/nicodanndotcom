import { useEffect, useState } from 'react'
// import { useEvents } from './useEvents';
import { GoogleEventType } from '../types/calendarTypes';
import { getGoogleEvents } from '../api/getGoogleEvents';

export const useSortedEvents = () => {
  // const events = useEvents();
  const calendarID = process.env.REACT_APP_CALENDAR_ID;  
  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
  // const events = getGoogleEvents(calendarID, apiKey)

  const [upcomingEvents, setUpcomingEvents] = useState<GoogleEventType[]>();
  const [passedEvents, setPassedEvents] = useState<GoogleEventType[]>();
  const [upcomingYears, setUpcomingYears] = useState<number[]>([]);
  const [passedYears, setPassedYears] = useState<number[]>([]);
  const [pastEventDisplayLimit, setPastEventDisplayLimit] = useState(10);

  
  // SET UPCOMING EVENTS
  // useEffect(() => {
  //   if (events) {
  //     const upcomingEvents = events.filter(event => new Date(event.start.dateTime) > new Date() )
  //     upcomingEvents.sort((a,b) => {
  //       if (new Date(a.start.dateTime) > new Date(b.start.dateTime)) {
  //         return 1
  //       } else {
  //         return -1
  //       }          
  //     })
  //     setUpcomingEvents(upcomingEvents)
  //   }
  // },[])

  // SET PAST EVENTS
  // useEffect(() => {
  //   if (events) {
  //     // Filter out passed events from complete list
  //     const passedEvents = events.filter(event => new Date(event.start.dateTime) < new Date() )
  //     // sort events, most recent first
  //     passedEvents.sort((a,b) => {
  //       if (new Date(a.start.dateTime) > new Date(b.start.dateTime)) {
  //         return -1
  //       } else {
  //         return 1
  //       }          
  //     })
  //     const paginatedEvents = passedEvents.slice(0, pastEventDisplayLimit)
  //     console.log(paginatedEvents)
  //     setPassedEvents(paginatedEvents)
  //   }
  // },[events, pastEventDisplayLimit])


  // FUNCTION TO EXTRACT YEARS FROM EVENT LIST
  const getYears = (eventArray:GoogleEventType[]) => {
    const years: number[] = [];
    eventArray.map(event => {
      const eventYear = new Date(event.start.dateTime).getFullYear();
      !years.includes(eventYear) && years.push(eventYear)
    })
    return years;
  }

  // SETS YEARS FOR UPCOMING EVENTS
  // useEffect(() => {
  //   upcomingEvents && setUpcomingYears(getYears(upcomingEvents))
  // }, [upcomingEvents]);

  
  // // SETS YEARS FOR PAST EVENTS
  // useEffect(() => {
  //   passedEvents && setPassedYears(getYears(passedEvents))
  // }, [passedEvents]);

  return {
    upcomingEvents: upcomingEvents,
    passedEvents: passedEvents,
    upcomingYears: upcomingYears,
    passedYears: passedYears,
    setPastEventDisplayLimit: setPastEventDisplayLimit,
  }
}
