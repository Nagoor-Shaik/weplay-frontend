import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Auth
export const registerUser = (userData) =>
    api.post('/auth/register', userData);

export const loginUser = (credentials) =>
    api.post('/auth/login', credentials);

// Venues
export const getAllVenues = () =>
    api.get('/venues');

export const getVenueById = (id) =>
    api.get(`/venues/${id}`);

export const getVenuesBySport = (sport) =>
    api.get(`/venues/sport/${sport}`);

// Bookings
export const createBooking = (booking) =>
    api.post('/bookings', booking);

export const getBookingsByUser = (userId) =>
    api.get(`/bookings/user/${userId}`);

export default api;