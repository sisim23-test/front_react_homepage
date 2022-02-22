import './App.css';

import Header from './component/common/Header';
import Footer from './component/common/Footer';
import Side from './component/common/Side';
import Home from './Home';
import Login from './component/member/Login';

import {Route, Routes, BrowserRouter} from 'react-router-dom';
import BoardList from './component/board/BoardList';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div id='container'>
          <Header />
          <Side />
          <div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/member/login/" element={<Login />} />
              <Route path="/board/list" element={<BoardList />} />
            
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
