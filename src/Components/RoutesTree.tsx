import { Routes, Route } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";


export default function RoutesTree() {
  return (
    <div>
      <Routes>
        <Route path='/'>
          <Home/>
        </Route>
      </Routes>
    </div>
  )
}
