// src/app/register/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      setSuccess(true);
      setTimeout(() => router.push('/login'), 1500);
    } else {
      const data = await res.json();
      setError(data.error || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-8">
        <h1 className="text-2xl text-white font-semibold mb-6 text-center">Create an Account</h1>

        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        {success && <p className="text-green-400 text-sm mb-4 text-center">Registration successful! Redirecting...</p>}

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm text-gray-300 mb-1">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm text-gray-300 mb-1">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded"
          >
            Sign Up
          </button>
        </form>

        <p className="text-gray-400 text-sm mt-6 text-center">
          Already have an account?{' '}
          <a href="/login" className="text-blue-400 hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}