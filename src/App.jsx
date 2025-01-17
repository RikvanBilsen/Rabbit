// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Sidebar from './components/Sidebar.jsx';
import Home from './pages/Home.jsx';
import CreatePost from './pages/CreatePost.jsx';
import PostDetails from './pages/PostDetails.jsx';
import AccountPage from "./pages/AccountPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";

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