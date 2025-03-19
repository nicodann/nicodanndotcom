import { EventWithStartTimeAndSummary } from "../types/calendarTypes";

function hasDateTimeAndSummary(event: gapi.client.calendar.Event): event is EventWithStartTimeAndSummary {
  return (event as EventWithStartTimeAndSummary).start?.dateTime !== undefined && (event as EventWithStartTimeAndSummary).summary !== undefined
}

export default function sortEvents(events: gapi.client.calendar.Event[], pastEventsDisplayLimit: number) {

  // SORT EVENTS INTO PASSED AND UPCOMING

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
  
  // SORT UPCOMING EVENTS IN ASCENDING ORDER (OLDEST FIRST)
  upcomingEvents.sort((a,b) => {
    if (a.start?.dateTime && b.start?.dateTime && new Date(a.start.dateTime) > new Date(b.start.dateTime)) {
      return 1
    } else {
      return -1
    }          
  })
  
  // sort PASSED events IN DESCENDING ORDER, (most recent first)
  passedEvents.sort((a,b) => {
    if (a.start?.dateTime && b.start?.dateTime && new Date(a.start.dateTime) > new Date(b.start.dateTime)) {
      return -1
    } else {
      return 1
    }          
  })

  // LIMIT PASSED EVENTS AMOUNT
  passedEvents.splice(pastEventsDisplayLimit)

  // EXTRACT YEARS FROM EVENT LISTS
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
  
  const upcomingYears = getYears(upcomingEvents)
  
  const passedYears = getYears(passedEvents)
  
  return { upcomingEvents, passedEvents, upcomingYears, passedYears }
}