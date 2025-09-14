import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../ui/Button';
import Input from '../ui/Input';

const RegisterForm = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const { register: registerUser, loading, error } = useAuth();
    const navigate = useNavigate();
    const [registerError, setRegisterError] = useState('');

    const password = watch('password');

    const onSubmit = async (data) => {
        setRegisterError('');
        const { confirmPassword, ...userData } = data;

        const result = await registerUser(userData);

        if (result.success) {
            navigate('/dashboard');
        } else {
            setRegisterError(result.error);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="bg-white px-8 py-10 shadow-lg rounded-lg">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
                    <p className="text-gray-600 mt-2">Join Lead Management System</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="First Name"
                            required
                            {...register('firstName', {
                                required: 'First name is required'
                            })}
                            error={errors.firstName?.message}
                        />

                        <Input
                            label="Last Name"
                            required
                            {...register('lastName', {
                                required: 'Last name is required'
                            })}
                            error={errors.lastName?.message}
                        />
                    </div>

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

                    <Input
                        label="Confirm Password"
                        type="password"
                        required
                        {...register('confirmPassword', {
                            required: 'Please confirm your password',
                            validate: value =>
                                value === password || 'Passwords do not match'
                        })}
                        error={errors.confirmPassword?.message}
                    />

                    {(registerError || error) && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                            {registerError || error}
                        </div>
                    )}

                    <Button
                        type="submit"
                        className="w-full"
                        loading={loading}
                    >
                        Create Account
                    </Button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="text-blue-600 hover:text-blue-500 font-medium">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;