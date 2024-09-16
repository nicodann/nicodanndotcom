import { GoogleEventType } from "../../types/calendar";
import Event from "./Event";

type YearBlockProps = {
  events: GoogleEventType[];
  years: number[];
}

export default function YearBlock(props: YearBlockProps) {
  const { events, years } = props;
  return (
    <>
      {years.map((year,i) => (
        <div id="year-box" key={i}>
          <h4>
            {year}
          </h4>
          {events.map(event => {
            return new Date(event.start.dateTime).getFullYear() === year && (
              <Event event={event} key={event.id} />
            )        
          })}
        </div>
        )
      )}
    </>
  )
}
