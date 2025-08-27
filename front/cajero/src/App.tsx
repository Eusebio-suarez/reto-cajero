import { Route, Routes } from "react-router-dom"
import { Cajero } from "./components/pages/cajero"
import Admin from "./components/pages/Admin"
import { NavBar } from "./components/layouts/NavBar"

export const App = () => {
  return (
    <>
      <NavBar></NavBar>
      <Routes>
          <Route path='/' element={<Cajero/>}></Route>
          <Route path='/admin' element={<Admin/>}></Route>
      </Routes>
    </>
  )
}
