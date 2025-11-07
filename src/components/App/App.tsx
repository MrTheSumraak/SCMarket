import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import { Auth } from '../Auth/auth';
import { Auction } from '../pages/Auction/auction';

function App() {
  const location = useLocation();
  const backgroundLocation = location.state?.background;
  return (
    <>
      <div>
        <Routes location={backgroundLocation || location}>
          <Route path='/auth' element={<Auth />} />
          <Route path='/market' element={<Auction />} />
        </Routes>
      </div>
    </>
  )
}

export default App
