import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import { Auction } from '../pages/Auction/auction';
import { Auth } from '../pages/Auth/auth';
import { MainPage } from '../pages/Main/main';

function App() {
  const location = useLocation();
  const backgroundLocation = location.state?.background;
  return (
    <>
      <div>
        <Routes location={backgroundLocation || location}>
          <Route path='/main' element={<MainPage />} />
          <Route path='/auth' element={<Auth />} />
          <Route path='/market' element={<Auction />} />
        </Routes>
      </div>
    </>
  )
}

export default App
