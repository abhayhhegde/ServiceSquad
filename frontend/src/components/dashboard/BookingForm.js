import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/client';
import { useToast } from '../ui/Toast';
import SectionHeader from '../ui/SectionHeader';

function BookingForm() {
  const { providerId, serviceType } = useParams();
  const providerEmail = decodeURIComponent(providerId);
  const navigate = useNavigate();
  const toast = useToast();

  const [formData, setFormData] = useState({
    booking_date: '',
    booking_time: '',
    address: '',
    description: ''
  });

  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchProviderDetails = async () => {
      try {
        const response = await api.get(`/providers/${providerEmail}`);
        setProvider(response.data);
      } catch (err) {
        setError('Failed to load provider details.');
      } finally {
        setLoading(false);
      }
    };
    fetchProviderDetails();
  }, [providerEmail]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    setError('');

    try {
      await api.post('/bookings', {
        provider_id: providerId,
        service_type: serviceType,
        ...formData
      });
      setSuccess(true);
      toast.success('Booking confirmed! Check your email for details.');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create booking. Please try again.');
      setSubmitLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="animate-spin h-8 w-8 border-4 border-brand-600 border-t-transparent rounded-full mx-auto" />
        <p className="text-gray-500 mt-3">Loading booking form...</p>
      </div>
    );
  }

  if (!provider) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <p className="text-red-600">Provider not found. Please go back and try again.</p>
        <button onClick={() => navigate(-1)} className="btn-secondary mt-4">Go Back</button>
      </div>
    );
  }

  // Success confirmation screen
  if (success) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center animate-fade-in">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
        <p className="text-gray-500 mb-2">Your request has been sent to <strong>{provider.username}</strong></p>
        <div className="card p-4 text-left text-sm space-y-1 mb-6 max-w-xs mx-auto">
          <p><span className="text-gray-400">Service:</span> <span className="font-medium text-gray-900">{serviceType}</span></p>
          <p><span className="text-gray-400">Date:</span> <span className="font-medium text-gray-900">{new Date(formData.booking_date).toLocaleDateString('en-GB')}</span></p>
          <p><span className="text-gray-400">Time:</span> <span className="font-medium text-gray-900">{formData.booking_time}</span></p>
        </div>
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-700">What happens next?</h3>
          <div className="flex flex-col gap-2 text-sm text-gray-500 items-start max-w-xs mx-auto">
            <span className="flex items-center gap-2"><span className="w-5 h-5 bg-brand-100 text-brand-700 rounded-full text-xs flex items-center justify-center font-bold">1</span> Provider reviews your request</span>
            <span className="flex items-center gap-2"><span className="w-5 h-5 bg-brand-100 text-brand-700 rounded-full text-xs flex items-center justify-center font-bold">2</span> You'll get an email confirmation</span>
            <span className="flex items-center gap-2"><span className="w-5 h-5 bg-brand-100 text-brand-700 rounded-full text-xs flex items-center justify-center font-bold">3</span> Track status in your dashboard</span>
          </div>
        </div>
        <div className="mt-8 flex gap-3 justify-center">
          <button onClick={() => navigate('/dashboard')} className="btn-primary">Go to Dashboard</button>
          <button onClick={() => navigate('/servicepage')} className="btn-secondary">Browse More</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <SectionHeader title={`Book ${serviceType} Service`} subtitle="Fill in your details and we'll connect you with the provider" />

      {/* Provider info card */}
      <div className="card p-4 mb-6 flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 font-bold text-lg flex-shrink-0">
          {(provider.username || 'P').charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-900 truncate">{provider.username}</p>
          <p className="text-sm text-gray-500">{serviceType} Professional</p>
        </div>
        <span className="inline-flex items-center gap-1 text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full flex-shrink-0">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
          Verified
        </span>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 animate-slide-down">
          {error}
        </div>
      )}

      <div className="card p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="booking_date" className="label">Service Date</label>
              <input type="date" id="booking_date" name="booking_date" value={formData.booking_date} onChange={handleChange} min={new Date().toISOString().split('T')[0]} className="input-field" required disabled={submitLoading} />
            </div>
            <div>
              <label htmlFor="booking_time" className="label">Service Time</label>
              <input type="time" id="booking_time" name="booking_time" value={formData.booking_time} onChange={handleChange} className="input-field" required disabled={submitLoading} />
            </div>
          </div>

          <div>
            <label htmlFor="address" className="label">Service Address</label>
            <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} placeholder="Enter the address where service is needed" className="input-field" required disabled={submitLoading} />
          </div>

          <div>
            <label htmlFor="description" className="label">Description of Work <span className="text-gray-400 font-normal">(optional)</span></label>
            <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows="4" placeholder="Describe what you need help with so the provider can prepare..." className="input-field resize-none" disabled={submitLoading} />
          </div>

          <div className="pt-2">
            <button type="submit" className="btn-primary w-full" disabled={submitLoading}>
              {submitLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                  Confirming Booking...
                </span>
              ) : 'Confirm Booking'}
            </button>
            <p className="text-xs text-gray-400 text-center mt-2">No payment required. Provider will confirm within 24 hours.</p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BookingForm;