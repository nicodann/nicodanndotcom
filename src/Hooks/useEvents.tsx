import { useEffect, useState } from "react";
import { getGoogleEvents } from "../api/getGoogleEvents";
import { eventsStateType } from "../types/calendarTypes";

export const useEvents = (pastEventsDisplayLimit?: number) => {
  const googlePastEventsDisplayLimit = pastEventsDisplayLimit || 10;
  const calendarID = process.env.REACT_APP_CALENDAR_ID;
  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
  const [events, setEvents] = useState<eventsStateType>({
    passedEvents: [],
    upcomingEvents: [],
    upcomingYears: [],
    passedYears: [],
  });
  // const [pastEventDisplayLimit, setPastEventDisplayLimit] = useState(10);

  useEffect(() => {
    getGoogleEvents(
      calendarID,
      apiKey,
      setEvents,
      googlePastEventsDisplayLimit,
    );
  }, [apiKey, calendarID, googlePastEventsDisplayLimit]);

  return events;
};
