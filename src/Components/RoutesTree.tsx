import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Store from "../Pages/Store/Store"


export default function RoutesTree() {
  return (
    <div>
      {/* <Home /> */}
      <Routes>
        <Route path='/store' element={<Store />} />

        <Route path='/' element={<Home/>} />
      </Routes>
    </div>
  )
}
