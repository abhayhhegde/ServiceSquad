import React from 'react';

const STATUS_CONFIG = {
    pending: { label: 'Pending', classes: 'bg-amber-100 text-amber-800 border-amber-200' },
    accepted: { label: 'Accepted', classes: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
    completed: { label: 'Completed', classes: 'bg-blue-100 text-blue-800 border-blue-200' },
    cancelled: { label: 'Cancelled', classes: 'bg-red-100 text-red-800 border-red-200' },
    verified: { label: 'Verified', classes: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
    new: { label: 'New', classes: 'bg-purple-100 text-purple-800 border-purple-200' },
};

export default function StatusBadge({ status, className = '' }) {
    const config = STATUS_CONFIG[status] || { label: status, classes: 'bg-gray-100 text-gray-800 border-gray-200' };
    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${config.classes} ${className}`}>
            {config.label}
        </span>
    );
}
