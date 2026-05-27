import "../../Styles/Calendar.scss";
// import { useSortedEvents } from "../../Hooks/useSortedEvents";
import YearBlock from "../YearBlock";
import { useEvents } from "../../Hooks/useEvents";
import { useState } from "react";

function CalendarPast() {
  const [pastEventDisplayLimit, setPastEventDisplayLimit] = useState(10);

  const { passedEvents, passedYears } = useEvents(pastEventDisplayLimit);

  return (
    <div id="calendar">
      <h3>Past Performances</h3>
      <YearBlock events={passedEvents} years={passedYears} />

      <p
        className="link"
        onClick={() => setPastEventDisplayLimit((prev) => prev + 10)}
        style={{ fontStyle: "italic" }}
      >
        display more...
      </p>
    </div>
  );
}

export default CalendarPast;
