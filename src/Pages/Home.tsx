import "../App.scss";
// import TruncatedBio from '../Components/TruncatedBio';
import useWindowDimensions from "../Hooks/useWindowWidth";
import { useEffect, useState } from "react";
// import Bio from '../Components/Bio';
import Calendar from "../Components/Calendar";
import Bio from "../Components/Bio";
import CalendarUpcoming from "../Components/CalendarUpcoming";
import CalendarPast from "../Components/CalendarPast";

export default function Home() {
  const windowSize = useWindowDimensions();
  const [columnNumber, setColumnNumber] = useState<number>();
  useEffect(() => {
    if (windowSize === "base" || windowSize === "sm") {
      setColumnNumber(1);
    } else {
      setColumnNumber(2);
    }
  }, [windowSize]);
  return (
    <div id="app_wrap">
      <div id="hero_section_wrap">
        <div className="left_side_column">
          <header id="main-app-heading">
            <h1>Nico Dann drums</h1>
          </header>
          {columnNumber === 1 ? (
            <>
              <Bio /> <Calendar />
            </>
          ) : (
            <CalendarUpcoming />
          )}
        </div>
        {columnNumber === 2 && (
          <div className="right_side_column">
            <img src="/images/nico_headshot.jpg" alt="Nico Dann jazz drums" />
            <a id="lessons_link" href="https://lessons.nicodann.com">
              {"→ Take drum lessons with Nico!"}
            </a>
            {/* Scroll indicator */}
            <div id="scroll_indicator">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(120,170,130,0.5)"
                strokeWidth="2"
              >
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </div>
          </div>
        )}
      </div>
      {columnNumber === 2 && (
        <div id="section_wrap">
          <div className="left_side_column">
            <CalendarPast />
          </div>
          <div className="right_side_column">
            <Bio />
          </div>
        </div>
      )}
    </div>
  );
}
