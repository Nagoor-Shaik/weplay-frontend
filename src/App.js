import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import VenuesPage from './pages/VenuesPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import BookingPage from './pages/BookingPage';
import HomePage from './pages/HomePage';
import './App.css';

function BottomNav() {
    const location = useLocation();
    const links = [
        { path: '/', label: 'Home', icon: '🏠' },
        { path: '/venues', label: 'Book', icon: '🏟️' },
        { path: '/login', label: 'Me', icon: '👤' },
        { path: '/register', label: 'Join', icon: '➕' },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-gray-700 flex justify-around py-3 z-50">
            {links.map(link => (
                <Link key={link.path} to={link.path}
                      className={`flex flex-col items-center text-xs gap-1
            ${location.pathname === link.path
                          ? 'text-primary' : 'text-gray-400'}`}>
                    <span className="text-xl">{link.icon}</span>
                    <span>{link.label}</span>
                </Link>
            ))}
        </div>
    );
}

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-dark text-white pb-20">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/venues" element={<VenuesPage />} />
                    <Route path="/booking/:id" element={<BookingPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                </Routes>
                <BottomNav />
            </div>
        </Router>
    );
}

export default App;