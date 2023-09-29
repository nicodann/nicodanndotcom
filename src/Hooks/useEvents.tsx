import { EventType } from '@testing-library/react';
import { useState } from 'react'

export const useEvents = () => {
  const calendarID = process.env.REACT_APP_CALENDAR_ID;  
  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
  const [events, setEvents] = useState<EventType[]>();
  return (
    <div>useEvents</div>
  )
}
