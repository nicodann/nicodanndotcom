import { eventsStateType, EventWithStartTimeAndSummary } from "../types/calendarTypes";
import { gapi } from "gapi-script";
// import {google} from "googleapis";
// const calendar = google.calendar("v3");
// import { getGoogleEventInstances } from "./getGoogleEventInstances";

type getEventsType = (
  calendarID:string, 
  apiKey:string, 
  setEvents: React.Dispatch<React.SetStateAction<eventsStateType>>
) => void;

export const getGoogleEvents: getEventsType = (
  calendarID, 
  apiKey, 
  setEvents
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
        response.result.items && setEvents(sortEvents(response.result.items))
      });
    })
    .catch((error) => {
      console.error("Error loading Google Calendar API with discovery document:", error);
    });
  })
}

function hasDateTimeAndSummary(event: gapi.client.calendar.Event): event is EventWithStartTimeAndSummary {
  return (event as EventWithStartTimeAndSummary).start?.dateTime !== undefined && (event as EventWithStartTimeAndSummary).summary !== undefined
}

const sortEvents = (events: gapi.client.calendar.Event[]) => {

  const upcomingEvents: EventWithStartTimeAndSummary[] = [];
  const passedEvents: EventWithStartTimeAndSummary[] =[]
  for (const event of events) {
    if (hasDateTimeAndSummary(event)) {
      if (new Date(event.start.dateTime) > new Date()) {
        upcomingEvents.push(event)
      } else {
        passedEvents.push(event)
      }
    }
  }
  
  // FUNCTION TO EXTRACT YEARS FROM EVENT LIST
  const getYears = (eventArray:EventWithStartTimeAndSummary[]) => {
    const years: number[] = [];
    eventArray.forEach(event => {
      if (event.start?.dateTime) {
        const eventYear = new Date(event.start.dateTime).getFullYear();
        !years.includes(eventYear) && years.push(eventYear)
      }
    })
    return years;
  }

  upcomingEvents.sort((a,b) => {
    if (a.start?.dateTime && b.start?.dateTime && new Date(a.start.dateTime) > new Date(b.start.dateTime)) {
      return 1
    } else {
      return -1
    }          
  })

  // sort events, most recent first
  passedEvents.sort((a,b) => {
    if (a.start?.dateTime && b.start?.dateTime && new Date(a.start.dateTime) > new Date(b.start.dateTime)) {
      return -1
    } else {
      return 1
    }          
  })
  
  const upcomingYears = getYears(upcomingEvents)
  
  const passedYears = getYears(passedEvents)
  
  return { upcomingEvents, passedEvents, upcomingYears, passedYears }
}
//   events
//     .filter(event =>  event.start && event.start.dateTime && new Date(event.start.dateTime) > new Date() )
    

// }


// events
//   .filter(event => event.start?.dateTime && new Date(event.start.dateTime) < new Date() )
// // sort events, most recent first
//   .sort((a,b) => {
//   if (a.start?.dateTime && b.start?.dateTime && new Date(a.start.dateTime) > new Date(b.start.dateTime)) {
//     return -1
//   } else {
//     return 1
//   }          
// })