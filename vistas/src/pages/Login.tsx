import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import { useAuthStore } from '../store/authStore';
import { Eye, EyeOff, Mail, Lock, Loader2 } from 'lucide-react';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState('');
  
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const user = await api.login(email, password);
      login(user);
      navigate('/admin/bobedas');
    } catch (err) {
      setError('Credenciales inválidas');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <div className="space-y-2 mb-8">
          <h2 className="text-3xl font-bold text-center text-gray-900">
            Bienvenido
          </h2>
          <p className="text-center text-gray-600">
            Ingresa tus credenciales para continuar
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg animate-[shake_0.5s_ease-in-out]">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div className="relative">
              <div className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
                focusedField === 'email' ? 'text-blue-600' : 'text-gray-400'
              }`}>
                <Mail size={20} />
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField('')}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg outline-none transition-all duration-200 ${
                  focusedField === 'email' 
                    ? 'border-blue-600 ring-2 ring-blue-100' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                placeholder="Correo Electrónico"
                required
              />
            </div>

            <div className="relative">
              <div className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
                focusedField === 'password' ? 'text-blue-600' : 'text-gray-400'
              }`}>
                <Lock size={20} />
              </div>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField('')}
                className={`w-full pl-10 pr-12 py-3 border rounded-lg outline-none transition-all duration-200 ${
                  focusedField === 'password' 
                    ? 'border-blue-600 ring-2 ring-blue-100' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                placeholder="Contraseña"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium transition-all duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                <span>Ingresando...</span>
              </>
            ) : (
              <span>Ingresar</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}