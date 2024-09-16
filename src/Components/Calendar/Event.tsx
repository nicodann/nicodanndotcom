import React, { ReactNode } from "react";

type event = {
  id: string;
  start: {
    dateTime: string;
    timeZone: string;
  }
  summary: string;
  location:string;
}

const keywords: {[key:string]:string} = {
  'Tania Gill Quartet': "https://taniagill.bandcamp.com/"
}

const addHyperlinks = (text: string) => {
  let returnedText: string | ReactNode = text;
  for (const keyword in keywords) {
    if (text.includes(keyword)) {
      returnedText = <a href={keywords[keyword]}>{keyword}</a>
  }
  }
  return returnedText;
}

export default function Event({event}:{event:event}) {
  return (
    <div id="event" key={event.id}>
      <p id="date">{new Date(event.start.dateTime).toDateString()}</p>
      {/* <p id="time">{new Date(event.start.dateTime).toLocaleTimeString("en-US",{fractionalSecondDigits:undefined})}</p> */}
      <p id="summary">
        {addHyperlinks(event.summary)}
      </p>
      <p id="location">{event.location}</p>
    </div>
  )
}
