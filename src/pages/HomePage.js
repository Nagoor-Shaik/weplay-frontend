import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function HomePage() {
    const sports = [
        { name: 'Badminton', emoji: '🏸', delay: 0.1 },
        { name: 'Foot Ball', emoji: '⚽', delay: 0.2 },
        { name: 'Volley Ball', emoji: '🏐', delay: 0.3 },
        { name: 'Basket Ball', emoji: '🏀', delay: 0.4 },
    ];

    const quickActions = [
        { icon: '🕐', label: 'Book Again' },
        { icon: '📅', label: 'My Calendar' },
        { icon: '👥', label: 'Groups' },
        { icon: '🎁', label: 'Offers' },
    ];

    return (
        <div className="min-h-screen px-4 pt-8"
             style={{backgroundColor: '#0D0D0D'}}>

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className="flex items-center gap-4 mb-6">
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-14 h-14 rounded-full border-2 border-teal-400 overflow-hidden bg-teal-200 flex items-center justify-center text-2xl cursor-pointer">
                    👤
                </motion.div>
                <div>
                    <p className="text-gray-400 text-sm">Welcome back</p>
                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="text-white text-xl"
                        style={{fontFamily: 'cursive'}}>
                        Hey Champ, Let's go!
                    </motion.h1>
                </div>
            </motion.div>

            {/* Weekly Goal Button */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, type: 'spring', stiffness: 80 }}>
                <Link to="/venues"
                      className="flex items-center justify-between mb-8 px-6 py-4 rounded-full"
                      style={{backgroundColor: '#2A2A2A'}}>
                    <span className="text-white font-medium">
                        Set a Weekly Goal
                    </span>
                    <span className="text-white text-xl font-bold">›</span>
                </Link>
            </motion.div>

            {/* Recents Label */}
            <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-white font-bold text-lg mb-4">
                Recents
            </motion.h2>

            {/* Sport Cards */}
            <div className="flex flex-col gap-3 mb-6">
                {sports.map((sport) => (
                    <motion.div
                        key={sport.name}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                            delay: sport.delay * 1.5,
                            type: 'spring',
                            stiffness: 60
                        }}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}>
                        <Link to="/venues"
                              className="flex items-center justify-between px-5 py-4 rounded-2xl block"
                              style={{backgroundColor: '#C8F0D8'}}>
                            <div>
                                <h3 className="text-gray-800 font-bold text-lg">
                                    {sport.name}
                                </h3>
                                <p className="text-gray-600 text-sm">Check Now</p>
                            </div>
                            <span className="text-5xl">{sport.emoji}</span>
                        </Link>
                    </motion.div>
                ))}
            </div>

            {/* Quick Actions */}
            <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-white font-bold text-lg mb-4">
                Quick Actions
            </motion.h2>

            <div className="grid grid-cols-2 gap-3 mb-24">
                {quickActions.map((item, index) => (
                    <motion.div
                        key={item.label}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ backgroundColor: '#1E3A6E' }}
                        whileTap={{ backgroundColor: '#2A4A8E' }}
                        transition={{ duration: 0.1 }}
                        className="flex flex-col items-center justify-center gap-2 p-6 rounded-2xl cursor-pointer"
                        style={{backgroundColor: '#1A2A4A'}}>
                        <span className="text-3xl">{item.icon}</span>
                        <span className="text-white text-sm">{item.label}</span>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

export default HomePage;