import '../App.scss';
import TruncatedBio from '../Components/TruncatedBio';
import Calendar from "../Components/Calendar";


export default function Home() {
  return (
    <div id="app_wrap">
        <header id='main-app-heading'>
          {/* <div className="relatively-positioned-container"> */}
            <h1>Nico Dann drums</h1>
          {/* </div> */}
        </header>
        <TruncatedBio />
        <Calendar />
    </div>
  )
}
