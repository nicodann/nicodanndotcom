import './App.scss';
import Calendar from './Components/Calendar';
import RoutesTree from './Components/RoutesTree';

export default function App() {
  return (
      <div
        className="App"
      >
        <RoutesTree/>
        {/* <header id='main-app-heading'>
          <div className="relatively-positioned-container">
            <h1>Nico Dann drums</h1>
          </div>
        </header>
        <Calendar /> */}
      </div> 

    
  );
}
