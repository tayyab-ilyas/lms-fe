import React, { useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Edit, Trash2, Plus } from 'lucide-react';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import LeadForm from './LeadForm';
import FilterPanel from './FilterPanel';
import { useLeads } from '../../hooks/useLeads';
import { LEAD_SOURCES, LEAD_STATUSES, PAGINATION_SIZES } from '../../utils/constants';

const LeadsGrid = () => {
    const {
        leads,
        loading,
        error,
        pagination,
        filters,
        createLead,
        updateLead,
        deleteLead,
        handlePageChange,
        handlePageSizeChange,
        handleFiltersChange,
        clearFilters,
    } = useLeads();

    const [selectedLead, setSelectedLead] = useState(null);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [formLoading, setFormLoading] = useState(false);

    const columnDefs = useMemo(() => [
        {
            headerName: 'Name',
            field: 'first_name',
            valueGetter: (params) => `${params.data.first_name} ${params.data.last_name}`,
            sortable: true,
            filter: true,
            flex: 1,
        },
        {
            headerName: 'Email',
            field: 'email',
            sortable: true,
            filter: true,
            flex: 1,
        },
        {
            headerName: 'Company',
            field: 'company',
            sortable: true,
            filter: true,
            flex: 1,
        },
        {
            headerName: 'Phone',
            field: 'phone',
            sortable: true,
            flex: 1,
        },
        {
            headerName: 'City',
            field: 'city',
            sortable: true,
            flex: 1,
        },
        {
            headerName: 'Source',
            field: 'source',
            sortable: true,
            cellRenderer: (params) => {
                const source = LEAD_SOURCES.find(s => s.value === params.value);
                return source ? source.label : params.value;
            },
            flex: 1,
        },
        {
            headerName: 'Status',
            field: 'status',
            sortable: true,
            cellRenderer: (params) => {
                const status = LEAD_STATUSES.find(s => s.value === params.value);
                const statusLabel = status ? status.label : params.value;

                const statusColors = {
                    new: 'bg-blue-100 text-blue-800',
                    contacted: 'bg-yellow-100 text-yellow-800',
                    qualified: 'bg-green-100 text-green-800',
                    lost: 'bg-red-100 text-red-800',
                    won: 'bg-purple-100 text-purple-800',
                };

                return React.createElement('span', {
                    className: `px-2 py-1 text-xs font-medium rounded-full ${statusColors[params.value] || 'bg-gray-100 text-gray-800'}`
                }, statusLabel);
            },
            flex: 1,
        },
        {
            headerName: 'Score',
            field: 'score',
            sortable: true,
            type: 'numericColumn',
            cellRenderer: (params) => `${params.value}/100`,
            flex: 0.8,
        },
        {
            headerName: 'Value',
            field: 'lead_value',
            sortable: true,
            type: 'numericColumn',
            cellRenderer: (params) => `$${params.value.toLocaleString()}`,
            flex: 1,
        },
        {
            headerName: 'Qualified',
            field: 'is_qualified',
            sortable: true,
            cellRenderer: (params) => params.value ? '✅' : '❌',
            flex: 0.8,
        },
        {
            headerName: 'Created',
            field: 'created_at',
            sortable: true,
            cellRenderer: (params) => new Date(params.value).toLocaleDateString(),
            flex: 1,
        },
        {
            headerName: 'Actions',
            cellRenderer: (params) => {
                return React.createElement('div', {
                    className: 'flex space-x-2'
                }, [
                    React.createElement('button', {
                        key: 'edit',
                        className: 'px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 hover:bg-blue-200',
                        onClick: (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleEditLead(params.data);
                        }
                    }, 'Edit'),
                    React.createElement('button', {
                        key: 'delete',
                        className: 'px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800 hover:bg-red-200',
                        onClick: (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleDeleteClick(params.data);
                        }
                    }, 'Delete')
                ]);
            },
            flex: 1,
            sortable: false,
            filter: false,
        }
    ], []);

    const gridOptions = {
        defaultColDef: {
            resizable: true,
            sortable: true,
        },
        pagination: false,
        suppressPaginationPanel: true,
        theme: 'legacy',
    };

    const onGridReady = (params) => {
        // const gridContainer = params.api.getGridOption('getRowNode');

        // document.addEventListener('click', (e) => {
        //     if (e.target.closest('.edit-btn')) {
        //         const id = e.target.closest('.edit-btn').dataset.id;
        //         const lead = leads.find(l => l._id === id);
        //         handleEditLead(lead);
        //     }

        //     if (e.target.closest('.delete-btn')) {
        //         const id = e.target.closest('.delete-btn').dataset.id;
        //         const lead = leads.find(l => l._id === id);
        //         handleDeleteClick(lead);
        //     }
        // });
    };

    const handleCreateLead = () => {
        console.log('Create lead clicked');
        setSelectedLead(null);
        setIsFormModalOpen(true);
    };

    const handleEditLead = (lead) => {
        console.log('Edit lead clicked:', lead);
        setSelectedLead(lead);
        setIsFormModalOpen(true);
    };

    const handleDeleteClick = (lead) => {
        console.log('Delete lead clicked:', lead);
        setSelectedLead(lead);
        setIsDeleteModalOpen(true);
    };

    const handleFormSubmit = async (formData) => {
        setFormLoading(true);

        try {
            let result;
            if (selectedLead) {
                result = await updateLead(selectedLead._id, formData);
            } else {
                result = await createLead(formData);
            }

            if (result.success) {
                setIsFormModalOpen(false);
                setSelectedLead(null);
            }
        } catch (error) {
            console.error('Form submission error:', error);
        } finally {
            setFormLoading(false);
        }
    };

    const handleDeleteConfirm = async () => {
        if (selectedLead) {
            const result = await deleteLead(selectedLead._id);
            if (result.success) {
                setIsDeleteModalOpen(false);
                setSelectedLead(null);
            }
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Leads</h1>
                    <p className="text-gray-600">Manage your leads and track their progress</p>
                </div>
                <Button
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleCreateLead();
                    }}
                    className="flex items-center space-x-2"
                >
                    <Plus className="w-4 h-4" />
                    <span>Add Lead</span>
                </Button>
            </div>

            <div className="flex items-center justify-between">
                <FilterPanel
                    filters={filters}
                    onFiltersChange={handleFiltersChange}
                    onClearFilters={clearFilters}
                />

                <div className="text-sm text-gray-600">
                    Showing {leads.length} of {pagination.total} leads
                </div>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            )}

            <div className="bg-white rounded-lg shadow">
                <div className="ag-theme-alpine" style={{ height: '600px' }}>
                    <AgGridReact
                        columnDefs={columnDefs}
                        rowData={leads}
                        gridOptions={gridOptions}
                        loading={loading}
                        onGridReady={onGridReady}
                    />
                </div>

                <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
                    <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-700">Rows per page:</span>
                        <select
                            value={pagination.limit}
                            onChange={(e) => handlePageSizeChange(parseInt(e.target.value))}
                            className="border border-gray-300 rounded px-3 py-1 text-sm"
                        >
                            {PAGINATION_SIZES.map(size => (
                                <option key={size} value={size}>{size}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-700">
                            Page {pagination.page} of {pagination.totalPages}
                        </span>

                        <div className="flex space-x-2">
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={pagination.page <= 1}
                                onClick={() => handlePageChange(pagination.page - 1)}
                            >
                                Previous
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={pagination.page >= pagination.totalPages}
                                onClick={() => handlePageChange(pagination.page + 1)}
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                isOpen={isFormModalOpen}
                onClose={() => setIsFormModalOpen(false)}
                title={selectedLead ? 'Edit Lead' : 'Create New Lead'}
                size="lg"
            >
                <LeadForm
                    lead={selectedLead}
                    onSubmit={handleFormSubmit}
                    onCancel={() => setIsFormModalOpen(false)}
                    loading={formLoading}
                />
            </Modal>

            <Modal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                title="Delete Lead"
                size="sm"
            >
                <div className="space-y-4">
                    <p className="text-gray-600">
                        Are you sure you want to delete the lead for{' '}
                        <strong>{selectedLead?.first_name} {selectedLead?.last_name}</strong>?
                        This action cannot be undone.
                    </p>
                    <div className="flex space-x-4">
                        <Button
                            variant="danger"
                            onClick={handleDeleteConfirm}
                            loading={loading}
                        >
                            Delete
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => setIsDeleteModalOpen(false)}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default LeadsGrid;