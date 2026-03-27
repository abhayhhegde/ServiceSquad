import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api/client';
import SectionHeader from '../ui/SectionHeader';
import ProviderCard from '../ui/ProviderCard';
import { CardSkeleton } from '../ui/LoadingSkeleton';
import EmptyState from '../ui/EmptyState';

function ServiceProviderList() {
    const { service } = useParams();
    const [providers, setProviders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProviders = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await api.get(`/service-providers/${service}`);
                setProviders(response.data);
            } catch (err) {
                setError(`Failed to load ${service} providers. Please try again.`);
            } finally {
                setLoading(false);
            }
        };
        fetchProviders();
    }, [service]);

    const serviceTitle = service.charAt(0).toUpperCase() + service.slice(1);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <SectionHeader
                title={`${serviceTitle} Services`}
                subtitle={`Browse verified ${service} professionals and book with confidence`}
            />

            {/* Trust bar */}
            <div className="flex flex-wrap items-center gap-4 mb-8 text-xs text-gray-500">
                <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                    All providers verified
                </span>
                <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-brand-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" /></svg>
                    Response within 24 hours
                </span>
                <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    Free to book, no upfront cost
                </span>
            </div>

            {loading && <CardSkeleton count={6} />}

            {error && (
                <div className="card p-6 text-center">
                    <p className="text-red-600 mb-3">{error}</p>
                    <button onClick={() => window.location.reload()} className="btn-secondary text-sm">Try Again</button>
                </div>
            )}

            {!loading && !error && providers.length === 0 && (
                <EmptyState
                    icon="🔍"
                    title={`No ${serviceTitle} providers yet`}
                    description={`Be the first ${service} provider on ServiceSquad! Register in minutes.`}
                    actionLabel="Become a Provider"
                    actionTo="/become"
                />
            )}

            {!loading && !error && providers.length > 0 && (
                <>
                    <p className="text-sm text-gray-400 mb-4">{providers.length} provider{providers.length !== 1 ? 's' : ''} available</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {providers.map((provider, index) => (
                            <ProviderCard key={provider.id || index} provider={provider} service={service} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default ServiceProviderList;
