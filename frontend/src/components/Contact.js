import React, { useState } from 'react';
import SectionHeader from './ui/SectionHeader';
import { useToast } from './ui/Toast';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.success('Thank you! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
      setLoading(false);
    }, 800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <SectionHeader title="Contact Us" subtitle="Have questions or feedback? We'd love to hear from you." />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Contact Info */}
        <div className="lg:col-span-2 space-y-4">
          {[
            { icon: '📧', label: 'Email', value: 'support@servicesquad.com' },
            { icon: '📍', label: 'Location', value: 'India' },
          ].map(item => (
            <div key={item.label} className="card p-4 flex items-center gap-4">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider">{item.label}</p>
                <p className="text-sm font-medium text-gray-900">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="lg:col-span-3">
          <div className="card p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="label">Your Name</label>
                <input id="name" type="text" name="name" value={formData.name} onChange={handleChange} className="input-field" placeholder="John Doe" required disabled={loading} />
              </div>
              <div>
                <label htmlFor="email" className="label">Your Email</label>
                <input id="email" type="email" name="email" value={formData.email} onChange={handleChange} className="input-field" placeholder="you@example.com" required disabled={loading} />
              </div>
              <div>
                <label htmlFor="message" className="label">Message</label>
                <textarea id="message" name="message" rows="5" value={formData.message} onChange={handleChange} className="input-field resize-none" placeholder="How can we help?" required disabled={loading} />
              </div>
              <button type="submit" className="btn-primary w-full" disabled={loading}>
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
