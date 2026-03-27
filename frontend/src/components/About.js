import React from 'react';
import SectionHeader from './ui/SectionHeader';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <SectionHeader title="About ServiceSquad" subtitle="Your trusted marketplace for professional home services" />

      <div className="prose prose-gray max-w-none space-y-8">
        <div className="card p-6">
          <p className="text-gray-600 leading-relaxed">
            <strong className="text-gray-900">ServiceSquad</strong> is a smart home services platform that connects customers with skilled professionals such as electricians, plumbers, carpenters, painters, gardeners, mechanics, and more. It simplifies finding reliable home services through a secure digital platform.
          </p>
          <p className="text-gray-600 leading-relaxed mt-3">
            Users can book services easily, track real-time service status, and receive email notifications at every stage. Service providers can register, showcase their expertise, and manage service requests through a dedicated dashboard.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">🎯 Our Mission</h3>
            <p className="text-sm text-gray-600">To simplify home service management by providing a reliable, secure, and transparent platform for customers and professionals.</p>
          </div>
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">🔭 Our Vision</h3>
            <p className="text-sm text-gray-600">To become a trusted digital ecosystem for home services with seamless user experiences.</p>
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Why Choose ServiceSquad?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {['Easy & fast booking', 'Verified professionals', 'Real-time tracking', 'Secure authentication', 'Dedicated dashboards', 'Email notifications'].map(item => (
              <div key={item} className="flex items-center gap-2 text-sm text-gray-600">
                <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">For Customers</h3>
            <ol className="space-y-2">
              {['Sign up and log in', 'Select the required service', 'Book a provider', 'Track service status', 'Receive email notifications'].map((step, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                  <span className="flex-shrink-0 w-6 h-6 bg-brand-100 text-brand-700 rounded-full flex items-center justify-center text-xs font-bold">{i + 1}</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">For Providers</h3>
            <ol className="space-y-2">
              {['Register as a provider', 'Add service & experience details', 'Accept or decline requests', 'Complete services', 'Grow your opportunities'].map((step, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                  <span className="flex-shrink-0 w-6 h-6 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-xs font-bold">{i + 1}</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
