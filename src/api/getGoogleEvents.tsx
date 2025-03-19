import sortEvents from "../lib/sortEvents";
import { eventsStateType } from "../types/calendarTypes";
import { gapi } from "gapi-script";

type getEventsType = (
  calendarID:string, 
  apiKey:string, 
  setEvents: React.Dispatch<React.SetStateAction<eventsStateType>>,
  pastEventsDisplayLimit: number
) => void;

export const getGoogleEvents: getEventsType = (
  calendarID, 
  apiKey, 
  setEvents,
  pastEventsDisplayLimit
) => { 
  gapi.load("client", () => {
  gapi.client.init({apiKey: apiKey});
  gapi.client.load("https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest")
    .then(() => {
      gapi.client.calendar.events.list({
        calendarId: calendarID,
        maxResults: 1000,
        singleEvents: true,
        orderBy: "startTime",
        timeMin: new Date(0).toISOString() // Include all events, past and future
      }).then((response) => {
        console.log("response:", response.result.items); 
        response.result.items && setEvents(sortEvents(response.result.items, pastEventsDisplayLimit))
      });
    })
    .catch((error) => {
      console.error("Error loading Google Calendar API with discovery document:", error);
    });
  })
}