import React, { useState } from 'react';
import api from '../api/client';
import { useNavigate } from 'react-router-dom';
import { useToast } from './ui/Toast';
import SectionHeader from './ui/SectionHeader';

const Become = () => {
  const [service, setService] = useState('');
  const [experience, setExperience] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const emailResponse = await api.get(`/check-email/${email}`);
      if (emailResponse.data.exists) {
        setError('This email is already registered as a provider.');
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append('service', service);
      formData.append('experience', experience);
      formData.append('address', address);
      formData.append('email', email);
      if (image) {
        formData.append('image', image);
      }

      await api.post('/become-service-provider', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success('You are now a service provider! 🎉');
      navigate(`/services/${service.toLowerCase()}`);
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const services = ['Electrician', 'Carpenter', 'Plumber', 'Janitor', 'Mason', 'Gardener', 'Mechanic', 'Painter'];

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <SectionHeader title="Become a Provider" subtitle="Join our marketplace and start receiving service requests" />

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 animate-slide-down">
          {error}
        </div>
      )}

      <div className="card p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="service" className="label">Service Category</label>
            <select id="service" value={service} onChange={(e) => setService(e.target.value)} className="input-field" required disabled={loading}>
              <option value="" disabled>Select a service</option>
              {services.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="experience" className="label">Experience (years)</label>
            <input id="experience" type="number" min="0" value={experience} onChange={(e) => setExperience(e.target.value)} className="input-field" placeholder="e.g. 3" required disabled={loading} />
          </div>
          <div>
            <label htmlFor="address" className="label">Service Area</label>
            <input id="address" type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="input-field" placeholder="e.g. Bengaluru, Karnataka" required disabled={loading} />
          </div>
          <div>
            <label htmlFor="email" className="label">Contact Email</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" placeholder="your.email@example.com" required disabled={loading} />
          </div>
          <div>
            <label htmlFor="image" className="label">Profile Photo <span className="text-gray-400 font-normal">(max 64kb)</span></label>
            <input id="image" type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} className="input-field file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:bg-brand-50 file:text-brand-700 file:cursor-pointer" disabled={loading} />
          </div>

          <button type="submit" className="btn-primary w-full" disabled={loading}>
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                Registering...
              </span>
            ) : 'Register as Provider'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Become;
