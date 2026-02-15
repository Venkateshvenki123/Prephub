import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            const response = await axios.post('http://localhost:8000/api/auth/login', formData);
            if (response.data.success) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                navigate('/dashboard');
            }
        } catch (error) {
            const errorMessage = error.response?.data?.detail || 'Login failed';
            setError(errorMessage);
        }
        setLoading(false);
    };

    return (
        <div className="container" style={{ maxWidth: '500px', margin: '4rem auto', padding: '2rem' }}>
            <div className="card" style={{ padding: '2.5rem' }}>
                <h2 style={{ 
                    fontSize: '2rem',
                    color: '#60a5fa',
                    marginBottom: '2rem',
                    textAlign: 'center'
                }}>
                    Login to PrepHub
                </h2>

                {error && (
                    <div style={{
                        padding: '1rem',
                        marginBottom: '1.5rem',
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid #ef4444',
                        borderRadius: '0.375rem',
                        color: '#fca5a5'
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                        <label style={{ color: '#e2e8f0', marginBottom: '0.5rem', display: 'block' }}>
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                backgroundColor: '#1e293b',
                                border: '1px solid #475569',
                                borderRadius: '0.375rem',
                                color: '#e2e8f0',
                                fontSize: '1rem',
                                boxSizing: 'border-box'
                            }}
                        />
                    </div>

                    <div>
                        <label style={{ color: '#e2e8f0', marginBottom: '0.5rem', display: 'block' }}>
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                backgroundColor: '#1e293b',
                                border: '1px solid #475569',
                                borderRadius: '0.375rem',
                                color: '#e2e8f0',
                                fontSize: '1rem',
                                boxSizing: 'border-box'
                            }}
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        style={{
                            padding: '0.75rem 1.5rem',
                            backgroundColor: loading ? '#64748b' : '#3b82f6',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '0.375rem',
                            fontSize: '1rem',
                            fontWeight: '600',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            transition: 'background-color 0.2s',
                            marginTop: '0.5rem'
                        }}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <p style={{ 
                    marginTop: '2rem', 
                    textAlign: 'center', 
                    color: '#94a3b8' 
                }}>
                    Don't have account?{' '}
                    <a 
                        href="/register"
                        style={{ 
                            color: '#60a5fa',
                            textDecoration: 'none',
                            fontWeight: '600'
                        }}
                    >
                        Register here
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;
