import { EventType } from '@testing-library/react';
import { useEffect, useState } from 'react'

export const useEvents = () => {
  const calendarID = process.env.REACT_APP_CALENDAR_ID;  
  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
  const [events, setEvents] = useState<EventType[]>();

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
    getEvents(calendarID, apiKey)
  },[apiKey, calendarID]);
  
  return events
}
