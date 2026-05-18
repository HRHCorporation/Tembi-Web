'use client';
import "@/app/(public)/globals.css";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setError('');
    setLoading(true);

    try {
      const res = await fetch(
        '/api/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type':
              'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (data.success) {
        // Redirect dari API
        window.location.href = data.redirect;

        // Refresh supaya middleware membaca cookie baru
        router.refresh();
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError(
        'Terjadi kesalahan server'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 pt-20">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Admin Login
        </h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {/* EMAIL */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Email
            </label>

            <input
              type="email"
              required
              className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none text-black"
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Password
            </label>

            <input
              type="password"
              required
              className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none text-black"
              value={formData.password}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password:
                    e.target.value,
                })
              }
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading
              ? 'Loading...'
              : 'Masuk'}
          </button>
        </form>
      </div>
    </div>
  );
}