import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from './ui/Toast';
import api from '../api/client';

function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    setError('');

    try {
      await api.post('/register', { username, password, email, phone });
      toast.success('Account created! Please sign in.');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="card p-8 animate-fade-in">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Create your account</h1>
            <p className="text-gray-500 mt-1">Join ServiceSquad today</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 animate-slide-down">
              {error}
            </div>
          )}

          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <label htmlFor="username" className="label">Username</label>
              <input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="username" placeholder="Choose a username" className="input-field" required disabled={loading} />
            </div>
            <div>
              <label htmlFor="email" className="label">Email</label>
              <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" placeholder="you@example.com" className="input-field" required disabled={loading} />
            </div>
            <div>
              <label htmlFor="phone" className="label">Phone Number</label>
              <input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" placeholder="+91 XXXXX XXXXX" className="input-field" required disabled={loading} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="password" className="label">Password</label>
                <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" placeholder="••••••••" className="input-field" required disabled={loading} />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="label">Confirm</label>
                <input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} autoComplete="new-password" placeholder="••••••••" className="input-field" required disabled={loading} />
              </div>
            </div>

            <button type="submit" className="btn-primary w-full" disabled={loading}>
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                  Creating account...
                </span>
              ) : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{' '}
            <a href="/login" className="font-medium text-brand-600 hover:text-brand-700">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
