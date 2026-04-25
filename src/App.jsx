import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Layout from './pages/layout'
import Website from './pages/website'
import AllActuality from './pages/actuality/allActuality'
import AllBanque from './pages/establishment/banque/allBanque'
import AllEtablissement from './pages/establishment/establissement/allEtablissement'
import AllHotel from './pages/establishment/hotel/allHotel'

// Petit composant interne pour gérer le scroll auto vers les #ID
const ScrollHandler = () => {
  const { hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [hash]);
  return null;
};

const App = () => {
  return (
    <BrowserRouter>
      <ScrollHandler />
      <ToastContainer position='bottom-left' autoClose={3000}/>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Website/>}/>
          <Route path='all_actuality' element={<AllActuality/>}/>
          <Route path='all_banques' element={<AllBanque/>}/>
          <Route path='all_etablissement' element={<AllEtablissement/>}/>
          <Route path='all_hotel' element={<AllHotel/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App