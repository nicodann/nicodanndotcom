import { EventType } from "../types/calendar";
import { gapi } from "gapi-script";

type getEventsType = (
  calendarID:string, 
  apiKey:string, 
  setEvents: (serverEvents:EventType[]) => void
) => void

export const getEvents: getEventsType = (calendarID, apiKey, setEvents) => {

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
