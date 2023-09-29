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
      <p>{new Date(event.start.dateTime).toDateString()}</p>
      <p>
        {event.summary}
      </p>
      <p>{event.location}</p>
    </div>
  )
}
