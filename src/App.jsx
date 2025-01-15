// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './Pages/Home';
import CreatePost from './Pages/CreatePost';
import PostDetails from './Pages/PostDetails';
import AccountPage from "./Pages/AccountPage.jsx";
import LoginPage from "./Pages/LoginPage.jsx";

function App() {
  return (
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Header />
          <div className="flex">
            <Sidebar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create-post" element={<CreatePost />} />
                <Route path="/post/:postId" element={<PostDetails />} />
                <Route path="/create-account" element={<AccountPage />} />
                <Route path="/login" element={<LoginPage />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
  );
}

export default App;