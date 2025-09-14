import React from 'react';
import RegisterForm from '../components/auth/RegisterForm';

const RegisterPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <RegisterForm />
        </div>
    );
};

export default RegisterPage;