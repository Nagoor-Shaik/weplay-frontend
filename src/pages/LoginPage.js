import React, { useState } from 'react';
import { loginUser } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        loginUser({ email, password })
            .then(response => {
                localStorage.setItem('token', response.data);
                localStorage.setItem('userEmail', email);
                setMessage('Login successful!');
                setTimeout(() => navigate('/'), 1000);
            })
            .catch(() => {
                setMessage('Login failed. Check credentials.');
            });
    };

    return (
        <div className="min-h-screen flex flex-col px-6 pt-10"
             style={{backgroundColor: '#0D0D0D'}}>

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="mb-10">
                <h1 className="text-white text-3xl mb-1"
                    style={{fontFamily: 'cursive'}}>
                    Welcome Buddy.
                </h1>
                <h2 className="text-white font-bold text-xl mt-4">
                    Log In
                </h2>
            </motion.div>

            {/* Inputs */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="flex flex-col gap-4 mb-6">
                <input
                    type="email"
                    placeholder="User name"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-5 py-4 rounded-2xl text-gray-700 outline-none text-base"
                    style={{backgroundColor: '#E8E8E8'}}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-5 py-4 rounded-2xl text-gray-700 outline-none text-base"
                    style={{backgroundColor: '#E8E8E8'}}
                />
            </motion.div>

            {/* Login Button */}
            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleLogin}
                className="w-full py-4 rounded-2xl text-white font-bold text-lg mb-6"
                style={{backgroundColor: '#2A2A2A'}}>
                Log In
            </motion.button>

            {/* Divider */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="flex items-center gap-4 mb-6">
                <div className="flex-1 h-px bg-gray-700"></div>
                <span className="text-gray-500">or</span>
                <div className="flex-1 h-px bg-gray-700"></div>
            </motion.div>

            {/* Sign In Label */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mb-4">
                <h3 className="text-white font-bold text-lg">Sign In</h3>
            </motion.div>

            {/* Social Buttons */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="flex gap-6">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-3 text-white text-lg">
                    <span className="text-2xl">🇬</span>
                    <span>Google</span>
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-3 text-white text-lg">
                    <span className="text-2xl">📘</span>
                    <span>Facebook</span>
                </motion.button>
            </motion.div>

            {/* Message */}
            {message && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`mt-6 text-center font-medium ${
                        message.includes('successful')
                            ? 'text-teal-400' : 'text-red-400'
                    }`}>
                    {message}
                </motion.p>
            )}
        </div>
    );
}

export default LoginPage;