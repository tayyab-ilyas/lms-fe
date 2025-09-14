import { useState, useEffect, useCallback } from 'react';
import { leadsAPI } from '../services/api';

export const useLeads = () => {
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 20,
        total: 0,
        totalPages: 0,
    });
    const [filters, setFilters] = useState({});
    const fetchLeads = useCallback(async (params = {}) => {
        try {
            setLoading(true);
            setError(null);

            const requestParams = {
                page: params.page || 1,
                limit: params.limit || 20,
                filters: params.filters || {},
            };

            const response = await leadsAPI.getLeads(requestParams);

            setLeads(response.data.data);
            setPagination({
                page: response.data.page,
                limit: response.data.limit,
                total: response.data.total,
                totalPages: response.data.totalPages,
            });

            return { success: true, data: response.data };
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to fetch leads';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    }, []);

    const createLead = async (leadData) => {
        try {
            setLoading(true);
            const response = await leadsAPI.createLead(leadData);

            await fetchLeads();

            return { success: true, data: response.data };
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to create lead';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    const updateLead = async (id, leadData) => {
        try {
            setLoading(true);
            const response = await leadsAPI.updateLead(id, leadData);

            setLeads(prevLeads =>
                prevLeads.map(lead =>
                    lead._id === id ? response.data.data : lead
                )
            );

            return { success: true, data: response.data };
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to update lead';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    const deleteLead = async (id) => {
        try {
            setLoading(true);
            await leadsAPI.deleteLead(id);

            setLeads(prevLeads => prevLeads.filter(lead => lead._id !== id));

            setPagination(prev => ({
                ...prev,
                total: prev.total - 1,
                totalPages: Math.ceil((prev.total - 1) / prev.limit)
            }));

            return { success: true };
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to delete lead';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (page) => {
        setPagination(prev => ({ ...prev, page }));
        fetchLeads({ page });
    };

    const handlePageSizeChange = (limit) => {
        setPagination(prev => ({ ...prev, limit, page: 1 }));
        fetchLeads({ page: 1, limit });
    };

    const handleFiltersChange = (newFilters) => {
        setFilters(newFilters);
        setPagination(prev => ({ ...prev, page: 1 }));
        fetchLeads({ page: 1, filters: newFilters });
    };

    const clearFilters = () => {
        setFilters({});
        setPagination(prev => ({ ...prev, page: 1 }));
        fetchLeads({ page: 1, filters: {} });
    };

    useEffect(() => {
        fetchLeads();
    }, []);

    return {
        leads,
        loading,
        error,
        pagination,
        filters,
        fetchLeads,
        createLead,
        updateLead,
        deleteLead,
        handlePageChange,
        handlePageSizeChange,
        handleFiltersChange,
        clearFilters,
    };
};