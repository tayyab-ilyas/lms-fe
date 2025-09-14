import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../ui/Button';
import Input from '../ui/Input';

const LoginForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { login, loading, error } = useAuth();
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState('');

    const onSubmit = async (data) => {
        setLoginError('');
        const result = await login(data);

        if (result.success) {
            navigate('/dashboard');
        } else {
            setLoginError(result.error);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="bg-white px-8 py-10 shadow-lg rounded-lg">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">Sign In</h2>
                    <p className="text-gray-600 mt-2">Welcome back to Lead Management</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <Input
                        label="Email"
                        type="email"
                        required
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: 'Invalid email address'
                            }
                        })}
                        error={errors.email?.message}
                    />

                    <Input
                        label="Password"
                        type="password"
                        required
                        {...register('password', {
                            required: 'Password is required',
                            minLength: {
                                value: 6,
                                message: 'Password must be at least 6 characters'
                            }
                        })}
                        error={errors.password?.message}
                    />

                    {(loginError || error) && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                            {loginError || error}
                        </div>
                    )}

                    <Button
                        type="submit"
                        className="w-full"
                        loading={loading}
                    >
                        Sign In
                    </Button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-gray-600">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-blue-600 hover:text-blue-500 font-medium">
                            Sign up
                        </Link>
                    </p>
                </div>

                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded">
                    <p className="text-sm text-blue-800 font-medium mb-2">Test Credentials:</p>
                    <p className="text-sm text-blue-700">Email: test@example.com</p>
                    <p className="text-sm text-blue-700">Password: password123</p>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;