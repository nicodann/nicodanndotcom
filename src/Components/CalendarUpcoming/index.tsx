import "../../Styles/Calendar.scss";
import YearBlock from "../YearBlock";
import { useEvents } from "../../Hooks/useEvents";

function CalendarUpcoming() {
  const { upcomingEvents, upcomingYears } = useEvents();

  return (
    <div id="calendar">
      <h3>Upcoming Gigs</h3>
      {upcomingYears.length !== 0 && upcomingEvents ? (
        <YearBlock events={upcomingEvents} years={upcomingYears} />
      ) : (
        <p style={{ fontStyle: "italic" }}>
          Check back soon or join the mailing list!
        </p>
      )}
    </div>
  );
}

export default CalendarUpcoming;
