import React from 'react';

export default function SectionHeader({ title, subtitle, className = '' }) {
    return (
        <div className={`mb-8 ${className}`}>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{title}</h1>
            {subtitle && <p className="mt-1 text-gray-500">{subtitle}</p>}
        </div>
    );
}
