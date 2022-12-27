import React from 'react'
import Header from './Components/Header/Header'
import Sidebar from './Components/Sidebar/Sidebar'
import routes from "./routes"
import "./App.css"
import { useRoutes } from 'react-router-dom'
import ModalProvider, { ModalContext } from './Contexts/ContextModal/ContextModal'

export default function App() {


  let router = useRoutes(routes)
  return (
    <>
      <Header className="header"/>
    <div className='main'>

      <div className="sidebar">
      <Sidebar className="sidebar-component" />
      </div>
    <ModalProvider>
      <div className="left">
       {router}
      </div>
    </ModalProvider>
    </div>
    </>
  )
}
