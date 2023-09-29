import React from "react";

type event = {
  id: string;
  start: {
    dateTime: string;
    timeZone: string;
  }
  summary: string;
  location:string;
}

export default function Event({event}:{event:event}) {
  console.log("event:", event)
  return (
    <div id="event" key={event.id}>
      <p id="date">{new Date(event.start.dateTime).toDateString()}</p>
      <p id="summary">
        {event.summary}
      </p>
      <p id="location">{event.location}</p>
    </div>
  )
}
