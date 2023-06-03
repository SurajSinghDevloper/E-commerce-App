import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './containers/Home';
import Signin from './containers/Signin';
import Signup from './containers/Signup';
// import Index from './components/Header/Index'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* <Route element={<Index />} /> */}
          <Route path="/" exact element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}


export default App;
