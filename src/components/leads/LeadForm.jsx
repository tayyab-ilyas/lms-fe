import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { LEAD_SOURCES, LEAD_STATUSES } from '../../utils/constants';

const LeadForm = ({ lead, onSubmit, onCancel, loading }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    useEffect(() => {
        if (lead) {
            reset({
                first_name: lead.first_name,
                last_name: lead.last_name,
                email: lead.email,
                phone: lead.phone,
                company: lead.company,
                city: lead.city,
                state: lead.state,
                source: lead.source,
                status: lead.status,
                score: lead.score,
                lead_value: lead.lead_value,
                is_qualified: lead.is_qualified,
            });
        }
    }, [lead, reset]);

    const handleFormSubmit = (data) => {
        const formattedData = {
            ...data,
            score: parseInt(data.score),
            lead_value: parseFloat(data.lead_value),
            is_qualified: data.is_qualified === 'true' || data.is_qualified === true,
        };
        onSubmit(formattedData);
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
                <div className="grid grid-cols-2 gap-4">
                    <Input
                        label="First Name"
                        required
                        {...register('first_name', {
                            required: 'First name is required'
                        })}
                        error={errors.first_name?.message}
                    />

                    <Input
                        label="Last Name"
                        required
                        {...register('last_name', {
                            required: 'Last name is required'
                        })}
                        error={errors.last_name?.message}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
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
                        label="Phone"
                        required
                        {...register('phone', {
                            required: 'Phone is required'
                        })}
                        error={errors.phone?.message}
                    />
                </div>
            </div>

            <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Company Information</h3>
                <Input
                    label="Company"
                    required
                    {...register('company', {
                        required: 'Company is required'
                    })}
                    error={errors.company?.message}
                />

                <div className="grid grid-cols-2 gap-4 mt-4">
                    <Input
                        label="City"
                        required
                        {...register('city', {
                            required: 'City is required'
                        })}
                        error={errors.city?.message}
                    />

                    <Input
                        label="State"
                        required
                        {...register('state', {
                            required: 'State is required'
                        })}
                        error={errors.state?.message}
                    />
                </div>
            </div>

            <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Lead Details</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Source <span className="text-red-500">*</span>
                        </label>
                        <select
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            {...register('source', {
                                required: 'Source is required'
                            })}
                        >
                            <option value="">Select Source</option>
                            {LEAD_SOURCES.map(source => (
                                <option key={source.value} value={source.value}>
                                    {source.label}
                                </option>
                            ))}
                        </select>
                        {errors.source && (
                            <p className="text-sm text-red-600 mt-1">{errors.source.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Status <span className="text-red-500">*</span>
                        </label>
                        <select
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            {...register('status', {
                                required: 'Status is required'
                            })}
                        >
                            <option value="">Select Status</option>
                            {LEAD_STATUSES.map(status => (
                                <option key={status.value} value={status.value}>
                                    {status.label}
                                </option>
                            ))}
                        </select>
                        {errors.status && (
                            <p className="text-sm text-red-600 mt-1">{errors.status.message}</p>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                    <Input
                        label="Score (0-100)"
                        type="number"
                        min="0"
                        max="100"
                        required
                        {...register('score', {
                            required: 'Score is required',
                            min: { value: 0, message: 'Score must be at least 0' },
                            max: { value: 100, message: 'Score cannot exceed 100' }
                        })}
                        error={errors.score?.message}
                    />

                    <Input
                        label="Lead Value ($)"
                        type="number"
                        min="0"
                        step="0.01"
                        required
                        {...register('lead_value', {
                            required: 'Lead value is required',
                            min: { value: 0, message: 'Lead value must be positive' }
                        })}
                        error={errors.lead_value?.message}
                    />
                </div>

                <div className="mt-4">
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            {...register('is_qualified')}
                        />
                        <span className="text-sm font-medium text-gray-700">Qualified Lead</span>
                    </label>
                </div>
            </div>

            <div className="flex space-x-4 pt-6 border-t border-gray-200">
                <Button type="submit" loading={loading}>
                    {lead ? 'Update Lead' : 'Create Lead'}
                </Button>
                <Button variant="outline" onClick={onCancel}>
                    Cancel
                </Button>
            </div>
        </form>
    );
};

export default LeadForm;