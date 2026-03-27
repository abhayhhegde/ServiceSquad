import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProviderCard({ provider, service }) {
    const navigate = useNavigate();
    const yearsLabel = provider.experience === 1 ? 'year' : 'years';
    const isExperienced = provider.experience >= 5;

    const handleBook = () => {
        navigate(`/booking/${encodeURIComponent(provider.email)}/${service}`);
    };

    return (
        <div className="card p-6 flex flex-col items-center text-center group animate-fade-in">
            {/* Avatar */}
            <div className="relative mb-4">
                {provider.image ? (
                    <img
                        src={`data:image/png;charset=utf8;base64,${provider.image}`}
                        alt={`${provider.username || 'Provider'}`}
                        className="w-20 h-20 rounded-full object-cover border-2 border-gray-200 group-hover:border-brand-400 transition-colors"
                    />
                ) : (
                    <div className="w-20 h-20 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 text-2xl font-bold">
                        {(provider.username || 'P').charAt(0).toUpperCase()}
                    </div>
                )}
                {/* Badges */}
                {isExperienced && (
                    <span className="absolute -bottom-1 -right-1 bg-amber-400 text-amber-900 text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white">
                        ★ Pro
                    </span>
                )}
            </div>

            {/* Info */}
            <h3 className="text-base font-semibold text-gray-900 mb-1">{provider.username || 'Service Provider'}</h3>
            <p className="text-sm text-gray-500 mb-3">{provider.experience} {yearsLabel} experience</p>

            {/* Trust Signals */}
            <div className="flex flex-wrap justify-center gap-1.5 mb-4">
                <span className="inline-flex items-center gap-1 text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    Verified
                </span>
                {isExperienced && (
                    <span className="inline-flex items-center gap-1 text-xs text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                        ★ Experienced
                    </span>
                )}
            </div>

            {/* Location */}
            <p className="text-xs text-gray-400 mb-4 flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                {provider.address}
            </p>

            {/* CTA */}
            <button onClick={handleBook} className="btn-primary w-full text-sm">
                Request Service
            </button>

            {/* What happens next */}
            <p className="text-[11px] text-gray-400 mt-2">Provider will confirm within 24h</p>
        </div>
    );
}
