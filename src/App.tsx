import './App.css'
import {Navigate, Route, Routes} from "react-router-dom";
import {ROUTES} from "./models/roates.ts";
import {HomePage} from "./components/HomePage/HomePage.tsx";
function App() {

  return (
      <div className={'hello w-screen h-screen overflow-hidden bg-[#FFFFFF] font-raleway'}>
        <Routes>
          <Route path={ROUTES.HOME} element={<HomePage/>}/>
          <Route path={''} element={<Navigate to={ROUTES.HOME}/>}/>
          <Route path={'/'} element={<Navigate to={ROUTES.HOME}/>}/>
        </Routes>
      </div>
  )
}

export default App
