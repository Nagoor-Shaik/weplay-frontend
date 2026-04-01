import React, { useState } from 'react';
import { registerUser } from '../services/api';

function RegisterPage() {
    const [formData, setFormData] = useState({
        name: '', email: '', password: '', phone: ''
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = () => {
        registerUser(formData)
            .then(response => {
                setMessage(response.data);
            })
            .catch(error => {
                setMessage('Registration failed. Try again.');
            });
    };

    return (
        <div style={{ padding: '40px', maxWidth: '400px', margin: 'auto' }}>
            <h1>Register</h1>
            {['name', 'email', 'password', 'phone'].map(field => (
                <input
                    key={field}
                    type={field === 'password' ? 'password' : 'text'}
                    name={field}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={formData[field]}
                    onChange={handleChange}
                    style={{ display: 'block', width: '100%',
                        padding: '10px', marginBottom: '10px' }}
                />
            ))}
            <button
                onClick={handleRegister}
                style={{ backgroundColor: '#1B6B7B', color: 'white',
                    padding: '10px 20px', border: 'none',
                    borderRadius: '5px', cursor: 'pointer' }}
            >
                Register
            </button>
            {message && <p>{message}</p>}
        </div>
    );
}

export default RegisterPage;