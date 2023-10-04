import React, { useEffect, useState } from 'react'
import { useEvents } from './useEvents';
import { GoogleEventType } from '../types/calendar';

export const useSortedEvents = () => {
  const events = useEvents();

  const [upcomingEvents, setUpcomingEvents] = useState<GoogleEventType[]>();
  const [passedEvents, setPassedEvents] = useState<GoogleEventType[]>();
  const [upcomingYears, setUpcomingYears] = useState<number[]>([]);
  const [passedYears, setPassedYears] = useState<number[]>([]);
  

  const [state, setState] = useState({
    upcomingEvents:[],
    passedEvents:[],
    upcomingYears:[],
    passedYears:[],
  })

  useEffect(() => {
    console.log("state:",state)
  }, [state]);

  const changeHandler = (e: any) => {
    // setState({...state, [e.target.name]: e.target.value})
    setState(prevValues => {
      return {...prevValues, [e.target.name]: e.target.value}
    })
  }

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
      // changeHandler(upcomingEvents)
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

  return (
    <div>useSortedEvents</div>
  )
}
