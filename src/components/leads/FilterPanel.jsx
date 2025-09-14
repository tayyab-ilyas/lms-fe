import React, { useState } from 'react';
import { Filter, X } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { LEAD_SOURCES, LEAD_STATUSES, FILTER_OPERATORS } from '../../utils/constants';

const FilterPanel = ({ filters, onFiltersChange, onClearFilters }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeFilters, setActiveFilters] = useState(filters);

    const handleFilterChange = (field, operator, value) => {
        const newFilters = {
            ...activeFilters,
            [field]: { operator, value }
        };
        setActiveFilters(newFilters);
    };

    const handleRemoveFilter = (field) => {
        const newFilters = { ...activeFilters };
        delete newFilters[field];
        setActiveFilters(newFilters);
    };

    const handleApplyFilters = () => {
        onFiltersChange(activeFilters);
        setIsOpen(false);
    };

    const handleClearAll = () => {
        setActiveFilters({});
        onClearFilters();
        setIsOpen(false);
    };

    const activeFilterCount = Object.keys(activeFilters).length;

    return (
        <div className="relative">
            <Button
                variant="outline"
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2"
            >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
                {activeFilterCount > 0 && (
                    <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-1">
                        {activeFilterCount}
                    </span>
                )}
            </Button>

            {isOpen && (
                <div className="absolute top-full left-0 mt-2 w-96 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    <div className="p-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-medium">Filters</h3>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setIsOpen(false)}
                            >
                                <X className="w-4 h-4" />
                            </Button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Status
                                </label>
                                <select
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    value={activeFilters.status?.value || ''}
                                    onChange={(e) =>
                                        e.target.value
                                            ? handleFilterChange('status', 'equals', e.target.value)
                                            : handleRemoveFilter('status')
                                    }
                                >
                                    <option value="">All Statuses</option>
                                    {LEAD_STATUSES.map(status => (
                                        <option key={status.value} value={status.value}>
                                            {status.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Source
                                </label>
                                <select
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    value={activeFilters.source?.value || ''}
                                    onChange={(e) =>
                                        e.target.value
                                            ? handleFilterChange('source', 'equals', e.target.value)
                                            : handleRemoveFilter('source')
                                    }
                                >
                                    <option value="">All Sources</option>
                                    {LEAD_SOURCES.map(source => (
                                        <option key={source.value} value={source.value}>
                                            {source.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <Input
                                    label="Company"
                                    placeholder="Filter by company..."
                                    value={activeFilters.company?.value || ''}
                                    onChange={(e) =>
                                        e.target.value
                                            ? handleFilterChange('company', 'contains', e.target.value)
                                            : handleRemoveFilter('company')
                                    }
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Score Range
                                </label>
                                <div className="flex space-x-2">
                                    <input
                                        type="number"
                                        placeholder="Min"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                        value={activeFilters.score?.value?.min || ''}
                                        onChange={(e) => {
                                            const min = parseInt(e.target.value);
                                            const max = activeFilters.score?.value?.max;
                                            if (!isNaN(min) || max) {
                                                handleFilterChange('score', 'between', {
                                                    min: isNaN(min) ? 0 : min,
                                                    max: max || 100
                                                });
                                            } else {
                                                handleRemoveFilter('score');
                                            }
                                        }}
                                    />
                                    <input
                                        type="number"
                                        placeholder="Max"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                        value={activeFilters.score?.value?.max || ''}
                                        onChange={(e) => {
                                            const max = parseInt(e.target.value);
                                            const min = activeFilters.score?.value?.min;
                                            if (!isNaN(max) || min) {
                                                handleFilterChange('score', 'between', {
                                                    min: min || 0,
                                                    max: isNaN(max) ? 100 : max
                                                });
                                            } else {
                                                handleRemoveFilter('score');
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex space-x-2 mt-6">
                            <Button onClick={handleApplyFilters}>
                                Apply Filters
                            </Button>
                            <Button variant="outline" onClick={handleClearAll}>
                                Clear All
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilterPanel;