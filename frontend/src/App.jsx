import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
// Import other pages when created

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {/* Add more routes as you create pages */}
        {/* <Route path="/deforestation" element={<Deforestation />} /> */}
        {/* <Route path="/landfill" element={<Landfill />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;