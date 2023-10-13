import './App.scss';
import Calendar from "../Components/Calendar";


export default function Home() {
  return (
    <div
        className="App"
      >
        <header id='main-app-heading'>
          <div className="relatively-positioned-container">
            {/* <div id="floating-circle"/> */}
            <h1>Nico Dann drums</h1>
          </div>
        </header>
        <Calendar />
      </div> 
  )
}
