import React from 'react';
import { Link } from 'react-router-dom';

export default function EmptyState({ icon, title, description, actionLabel, actionTo, onAction }) {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center animate-fade-in">
            {icon && <div className="text-5xl mb-4">{icon}</div>}
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
            {description && <p className="text-gray-500 text-sm max-w-sm mb-6">{description}</p>}
            {actionLabel && actionTo && (
                <Link to={actionTo} className="btn-primary">{actionLabel}</Link>
            )}
            {actionLabel && onAction && (
                <button onClick={onAction} className="btn-primary">{actionLabel}</button>
            )}
        </div>
    );
}
