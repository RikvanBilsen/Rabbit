// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const LoginAccount = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loggedInUser, setLoggedInUser] = useState(null); 
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = Cookies.get('loggedInUser');
        if (storedUser) {
            setLoggedInUser(JSON.parse(storedUser));
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const loginDetails = {
            email,
            password,
        };

        try {
            const response = await fetch('https://localhost:44319/api/account/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginDetails),
            });
        
            if (response.ok) {
                const data = await response.json();
        
                const loggedInUser = {
                    email: data.email,
                    userName: data.userName,
                    userId: data.userId, 
                };    
                setLoggedInUser(loggedInUser);
                
                Cookies.set('loggedInUser', JSON.stringify(loggedInUser), { expires: 7 });
        
                navigate('/');
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || 'Invalid credentials');
            }
        } catch (error) {
            setErrorMessage('An error occurred. Please try again.');
        }        
    };

    const handleLogout = () => {
        setLoggedInUser(null);
        Cookies.remove('loggedInUser'); 
    };

    return (
        <div className="max-w-2xl mx-auto py-8 px-4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                {loggedInUser ? (
                    <div className="text-center">
                        <h1 className="text-xl font-semibold mb-4">
                            You are logged in as <span className="text-orange-500">{loggedInUser.userName}</span>
                        </h1>
                        <button
                            onClick={handleLogout}
                            className="px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors"
                        >
                            Logout
                        </button>
                    </div>
                ) : (

                    <>
                        <h1 className="text-xl font-semibold mb-6">Login to Your Account</h1>
                        <form onSubmit={handleSubmit}>
                            {/* Email Input */}
                            <div className="mb-6">
                                <label className="block text-gray-700">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    required
                                />
                            </div>

                            {/* Password Input */}
                            <div className="mb-6">
                                <label className="block text-gray-700">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    required
                                />
                            </div>

                            {/* Error Message */}
                            {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

                            {/* Submit Button */}
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors"
                                >
                                    Login
                                </button>
                            </div>
                        </form>

                        {/* Register Redirect */}
                        <p className="mt-4 text-center text-gray-600">
                            Don’t have an account?{' '}
                            <Link to="/create-account" className="text-orange-500 hover:underline">
                                Register here
                            </Link>
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};

export default LoginAccount;
