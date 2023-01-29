import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navigate from './components/Navigate';
import Favorite from './components/Favorite';
import { ModalState } from './context/ModalContext';

function App() {
  return (
    <>
      <ModalState>
        <Navigate />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/favorites' element={<Favorite />} />
        </Routes>
      </ModalState>
    </>
  );
}

export default App;
