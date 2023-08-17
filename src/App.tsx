import './App.css';
import { Calendar } from './components/Calendar';

function App() {
  return (
    
    //
      <div
        className="App"
      >
        <header id='main-app-heading'>
          Nico Dann drums
        </header>
        <Calendar />
        <iframe
          title='calendar'
          src={"https://calendar.google.com/calendar/embed?height=200&wkst=1&bgcolor=black&ctz=America%2FToronto&showTitle=0&showNav=0&showDate=0&showPrint=0&showTabs=0&showTz=0&mode=AGENDA&showCalendars=0&src=bmljb2Rhbm5kcnVtc0BnbWFpbC5jb20&color=%237986CB"} 
          style={{
            // border:"solid 1px #777"
            borderWidth:0, 
            resize: "both", 
            overflowX: "scroll"
          }}
          width="400px" 
          height="400px" 
          frameBorder="0" 
          scrolling="no"
        ></iframe>
      </div>

    
  );
}

export default App;
