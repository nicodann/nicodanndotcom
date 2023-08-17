import { useState, useEffect } from "react";
import { gapi } from "gapi-script";

function Calendar() {
  //@ts-ignore
  const calendarID: string = process.env.REACT_APP_CALENDAR_ID;
  //@ts-ignore
  const apiKey: string = process.env.REACT_APP_GOOGLE_API_KEY;

  const [events, setEvents] = useState([])

  const getEvents = (calendarI: string, apiKey: string) => {

    const initiate = () => {
      gapi.client.init({apiKey: apiKey})
        .then(() => {
          return gapi.client.request({
            path: `https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events`
          })
        })
        .then(
          response => {
            const events = response.result.items;
            return events
          },
          err => {
            return [false, err]
          }
        )
    }

    gapi.load("client", initiate)

  }

  useEffect(() => {
    const events = getEvents(calendarID, apiKey)
    //@ts-ignore
    setEvents(events)
  },[])

  return (
   <div id="calendar">
    Calendar
      <ul>
        {events?.map(event => (
          <li key={event.id}>
            {/* <Event description={event.summary} />
             */}
             {event.summary}
          </li>
        ))}
      </ul>
   </div>
  )
};

export default Calendar;