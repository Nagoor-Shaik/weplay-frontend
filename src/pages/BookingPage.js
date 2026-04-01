import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createBooking, getVenueById } from '../services/api';
import { motion } from 'framer-motion';

function BookingPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [venue, setVenue] = useState(null);
    const [booking, setBooking] = useState({
        userId: 1,
        venueId: id,
        bookingDate: '',
        startTime: '',
        endTime: ''
    });
    const [confirmed, setConfirmed] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        getVenueById(id)
            .then(res => setVenue(res.data))
            .catch(() => {});
    }, [id]);

    const handleChange = (e) => {
        setBooking({ ...booking, [e.target.name]: e.target.value });
    };

    const handleBooking = () => {
        createBooking(booking)
            .then(res => {
                setConfirmed(res.data);
                setMessage('Booking confirmed!');
            })
            .catch(() => setMessage('Booking failed.'));
    };

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
                <h1 className="text-white text-2xl font-bold">
                    {venue ? venue.name : 'Book a Venue'}
                </h1>
            </motion.div>

            {/* Venue Info */}
            {venue && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="p-4 rounded-2xl mb-6"
                    style={{backgroundColor: '#1E1E2E'}}>
                    <div className="flex items-center gap-3">
                        <span className="text-4xl">
                            {venue.sport === 'Badminton' ? '🏸' :
                                venue.sport === 'Football' ? '⚽' :
                                    venue.sport === 'Cricket' ? '🏏' : '🏀'}
                        </span>
                        <div>
                            <h2 className="text-white font-bold">{venue.name}</h2>
                            <p className="text-gray-400 text-sm">📍 {venue.location}</p>
                            <p className="text-teal-400 font-bold">${venue.pricePerHour}/hr</p>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Booking Form */}
            {!confirmed ? (
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="flex flex-col gap-4">

                    <div>
                        <p className="text-gray-400 text-sm mb-2">Select Date</p>
                        <input
                            name="bookingDate"
                            type="date"
                            value={booking.bookingDate}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl text-white outline-none"
                            style={{backgroundColor: '#1E1E2E'}}
                        />
                    </div>

                    <div>
                        <p className="text-gray-400 text-sm mb-2">Start Time</p>
                        <input
                            name="startTime"
                            type="time"
                            value={booking.startTime}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl text-white outline-none"
                            style={{backgroundColor: '#1E1E2E'}}
                        />
                    </div>

                    <div>
                        <p className="text-gray-400 text-sm mb-2">End Time</p>
                        <input
                            name="endTime"
                            type="time"
                            value={booking.endTime}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl text-white outline-none"
                            style={{backgroundColor: '#1E1E2E'}}
                        />
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handleBooking}
                        className="w-full py-4 rounded-2xl text-white font-bold text-lg mt-2"
                        style={{backgroundColor: '#00BCD4'}}>
                        Book Now
                    </motion.button>

                    {message && (
                        <p className="text-red-400 text-center">{message}</p>
                    )}
                </motion.div>
            ) : (
                /* Success Screen */
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 80 }}
                    className="flex flex-col items-center justify-center pt-10 text-center">

                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-white text-3xl font-bold mb-2">
                        Transaction Successful!!!!
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-teal-400 text-xl mb-6">
                        Have a good game!!!
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, rotate: -10 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        transition={{ delay: 0.6, type: 'spring' }}
                        className="relative mb-8">
                        <div className="w-48 h-48 rounded-3xl flex flex-col items-center justify-center p-4"
                             style={{backgroundColor: '#FF6B6B'}}>
                            <div className="absolute w-44 h-44 rounded-3xl"
                                 style={{backgroundColor: '#FF8E53', transform: 'rotate(6deg)', zIndex: -1}}/>
                            <div className="absolute w-44 h-44 rounded-3xl"
                                 style={{backgroundColor: '#4CAF50', transform: 'rotate(-6deg)', zIndex: -2}}/>
                            <p className="text-white font-bold text-lg">
                                {venue?.name}
                            </p>
                            <p className="text-white text-sm mt-1">
                                {confirmed.bookingDate}
                            </p>
                            <p className="text-white text-sm">
                                {confirmed.startTime} - {confirmed.endTime}
                            </p>
                            <p className="text-white font-bold mt-2">
                                Total: ${confirmed.totalPrice}
                            </p>
                        </div>
                    </motion.div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/')}
                        className="px-8 py-4 rounded-full text-white font-bold"
                        style={{backgroundColor: '#00BCD4'}}>
                        Back to home
                    </motion.button>
                </motion.div>
            )}
        </div>
    );
}

export default BookingPage;