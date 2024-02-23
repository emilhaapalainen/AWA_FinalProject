import Home from './pages/Home';
import Welcome from './pages/Welcome';
import Dashboard from './pages/Dashboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/welcome" element={<Welcome/>} />
    </Routes>

    </BrowserRouter>
  );
}

export default App;
