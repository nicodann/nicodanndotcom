
import { useEffect, useState } from 'react'
import { getGoogleEvents } from '../api/getGoogleEvents';
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
