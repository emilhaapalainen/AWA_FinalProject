/* Project follows Ania Kubów's tutorial found at https://www.youtube.com/watch?v=Q70IMS-Qnjk */

import Home from './pages/Home';
import Welcome from './pages/Welcome';
import Dashboard from './pages/Dashboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const App = () => {

  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  const authToken = cookies.AuthToken

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>} />
      {authToken && <Route path="/dashboard" element={<Dashboard/>} />}
      {authToken && <Route path="/welcome" element={<Welcome/>} />}
    </Routes>

    </BrowserRouter>
  );
}

export default App;
