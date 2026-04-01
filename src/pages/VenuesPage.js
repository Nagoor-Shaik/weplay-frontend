import React, { useState, useEffect } from 'react';
import { getAllVenues } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function VenuesPage() {
    const [venues, setVenues] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        getAllVenues()
            .then(response => {
                setVenues(response.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) return (
        <div className="flex items-center justify-center h-screen"
             style={{backgroundColor: '#0D0D0D'}}>
            <motion.div
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-teal-400 text-xl">
                Loading venues...
            </motion.div>
        </div>
    );

    return (
        <div className="min-h-screen px-4 pt-6"
             style={{backgroundColor: '#0D0D0D'}}>

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex items-center gap-3 mb-6">
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => navigate(-1)}
                    className="text-white text-2xl w-10 h-10 rounded-full flex items-center justify-center"
                    style={{backgroundColor: '#1A1A1A'}}>
                    ←
                </motion.button>
                <h1 className="text-white text-2xl font-bold">Venues</h1>
            </motion.div>

            {/* Venue Cards */}
            <div className="flex flex-col gap-4">
                {venues.map((venue, index) => (
                    <motion.div
                        key={venue.id}
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                            delay: index * 0.15,
                            type: 'spring',
                            stiffness: 70
                        }}
                        whileHover={{
                            scale: 1.02,
                            boxShadow: '0 8px 30px rgba(0,188,212,0.15)'
                        }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => navigate(`/booking/${venue.id}`)}
                        className="flex items-center gap-4 p-4 rounded-2xl cursor-pointer"
                        style={{backgroundColor: '#1E1E2E'}}>

                        {/* Sport Icon */}
                        <motion.div
                            whileHover={{ rotate: 10 }}
                            className="w-20 h-20 rounded-xl flex items-center justify-center text-4xl flex-shrink-0"
                            style={{backgroundColor: '#252840'}}>
                            {venue.sport === 'Badminton' ? '🏸' :
                                venue.sport === 'Football' ? '⚽' :
                                    venue.sport === 'Cricket' ? '🏏' :
                                        venue.sport === 'Basketball' ? '🏀' : '🏆'}
                        </motion.div>

                        {/* Venue Info */}
                        <div className="flex-1">
                            <h2 className="text-white font-bold text-lg">
                                {venue.name}
                            </h2>
                            <p className="text-gray-400 text-sm mt-1">
                                📍 {venue.location}
                            </p>
                            <div className="flex items-center gap-1 mt-2">
                                <span className="text-yellow-400 text-sm">⭐</span>
                                <span className="text-gray-300 text-sm">
                                    4.5 Rating
                                </span>
                            </div>
                        </div>

                        {/* Price + Arrow */}
                        <div className="text-right">
                            <p className="text-teal-400 font-bold text-base">
                                ${venue.pricePerHour}/hr
                            </p>
                            <motion.p
                                animate={{ x: [0, 4, 0] }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: index * 0.3
                                }}
                                className="text-gray-500 text-lg mt-1">
                                ↗
                            </motion.p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

export default VenuesPage;