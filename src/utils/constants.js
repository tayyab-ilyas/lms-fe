export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const LEAD_SOURCES = [
    { value: 'website', label: 'Website' },
    { value: 'facebook_ads', label: 'Facebook Ads' },
    { value: 'google_ads', label: 'Google Ads' },
    { value: 'referral', label: 'Referral' },
    { value: 'events', label: 'Events' },
    { value: 'other', label: 'Other' }
];

export const LEAD_STATUSES = [
    { value: 'new', label: 'New' },
    { value: 'contacted', label: 'Contacted' },
    { value: 'qualified', label: 'Qualified' },
    { value: 'lost', label: 'Lost' },
    { value: 'won', label: 'Won' }
];

export const FILTER_OPERATORS = {
    string: [
        { value: 'equals', label: 'Equals' },
        { value: 'contains', label: 'Contains' }
    ],
    number: [
        { value: 'equals', label: 'Equals' },
        { value: 'gt', label: 'Greater than' },
        { value: 'lt', label: 'Less than' },
        { value: 'between', label: 'Between' }
    ],
    enum: [
        { value: 'equals', label: 'Equals' },
        { value: 'in', label: 'In' }
    ],
    date: [
        { value: 'on', label: 'On' },
        { value: 'before', label: 'Before' },
        { value: 'after', label: 'After' },
        { value: 'between', label: 'Between' }
    ],
    boolean: [
        { value: 'equals', label: 'Equals' }
    ]
};

export const PAGINATION_SIZES = [10, 20, 50, 100];