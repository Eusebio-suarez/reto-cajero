import { Route, Routes } from "react-router-dom"
import { Cajero } from "./components/pages/cajero"
import { NavBar } from "./components/layouts/NavBar"
import { Inicio } from "./components/pages/Inicio"
import Admin from "./components/pages/Admin"

export const App = () => {
  return (
    <>
      <NavBar></NavBar>
      <Routes>
          <Route path="/" element={<Inicio/>}></Route>
          <Route path='/cajero' element={<Cajero/>}></Route>
          <Route path='/admin' element={<Admin/>}></Route>
      </Routes>
    </>
  )
}
