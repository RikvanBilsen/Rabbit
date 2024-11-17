import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./Components/Header.jsx";
import Leftsidebar from "./Components/LeftSidebar.jsx";
import Homepage from "./Pages/Homepage.jsx";

function App() {
  return (
    <Router>
      <div className="app-layout">
        <Header />
        <Leftsidebar />
        <Routes>
          <Route path="/" element={<Homepage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
