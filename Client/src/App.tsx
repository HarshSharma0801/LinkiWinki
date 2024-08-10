import { Routes , Route } from "react-router"
import Home from "./Components/Home"
import View from "./Components/View"
function App() {

  return (
   <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/view" element={<View/>}/>

   </Routes>
  )
}

export default App
