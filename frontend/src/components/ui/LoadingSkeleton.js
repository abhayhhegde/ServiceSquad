import React from 'react';

export function CardSkeleton({ count = 3 }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="card p-6 space-y-4">
                    <div className="w-20 h-20 rounded-full shimmer-bg animate-shimmer mx-auto" />
                    <div className="h-5 shimmer-bg animate-shimmer rounded w-3/4 mx-auto" />
                    <div className="h-4 shimmer-bg animate-shimmer rounded w-1/2 mx-auto" />
                    <div className="h-4 shimmer-bg animate-shimmer rounded w-2/3 mx-auto" />
                    <div className="h-10 shimmer-bg animate-shimmer rounded w-full" />
                </div>
            ))}
        </div>
    );
}

export function ListSkeleton({ rows = 4 }) {
    return (
        <div className="space-y-4">
            {Array.from({ length: rows }).map((_, i) => (
                <div key={i} className="card p-5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full shimmer-bg animate-shimmer flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                        <div className="h-4 shimmer-bg animate-shimmer rounded w-1/3" />
                        <div className="h-3 shimmer-bg animate-shimmer rounded w-2/3" />
                    </div>
                    <div className="h-6 w-20 shimmer-bg animate-shimmer rounded-full" />
                </div>
            ))}
        </div>
    );
}
