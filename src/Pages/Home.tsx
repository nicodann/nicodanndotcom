import '../App.scss';
import Bio from '../Components/Bio';
import Calendar from "../Components/Calendar";


export default function Home() {
  return (
    <div id="app_wrap">
      <div
          id="left_side"
        >
          <header id='main-app-heading'>
            <div className="relatively-positioned-container">
              <h1>Nico Dann drums</h1>
            </div>
          </header>
          <Calendar />
        </div> 
        <Bio />
    </div>
  )
}
