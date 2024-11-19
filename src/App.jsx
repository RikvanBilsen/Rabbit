import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./Components/Header.jsx";
import Homepage from "./Pages/Homepage.jsx";
import CreatePost from './Pages/Createpost.jsx';

function App() {
  return (
    <Router>
      <div className="app-layout">
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/create-post" element={<CreatePost />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
