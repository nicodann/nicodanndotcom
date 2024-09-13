import '../App.scss';
import TruncatedBio from '../Components/TruncatedBio';
import Calendar from "../Components/Calendar";
import useWindowDimensions from '../Hooks/useWindowWidth';
import { useEffect, useState } from 'react';
import Bio from '../Components/Bio';


export default function Home() {
  const windowSize = useWindowDimensions();
  console.log("windowSize:",windowSize)
  const [columnNumber, setColumnNumber] = useState<number>()
  useEffect(() => {
    if (windowSize === 'base' || windowSize === 'sm') {
      setColumnNumber(1)
    } else {
      setColumnNumber(2)
    }
  }, [windowSize]);
  return (
    <div id="app_wrap">
      <div id="left_side_column">
        <header id='main-app-heading'>
            <h1>Nico Dann drums</h1>
        </header>
        {columnNumber === 1 &&
          <TruncatedBio />
        }
        <Calendar />
      </div>
      {columnNumber === 2 &&
        <div id="right_side_column">
          <Bio />
          <img src="/images/nico_headshot.jpg" alt="Nico Dann jazz drums" />
        </div>
      }
    </div>
  )
}
