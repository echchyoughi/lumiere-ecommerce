import React, { useState } from 'react';
import { X, Lock, Mail, User } from 'lucide-react';
import { api } from '../services/api';
import { useToast } from '../context/ToastContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isRegister) {
        const res = await api.register(name, email, password);
        if (res.success) {
          localStorage.setItem('lumiere_token', res.token);
          showToast(`Welcome to LUMIÈRE, ${res.user.name}!`);
          onClose();
        }
      } else {
        const res = await api.login(email, password);
        if (res.success) {
          localStorage.setItem('lumiere_token', res.token);
          showToast(`Welcome back, ${res.user.name}!`);
          onClose();
        }
      }
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Authentication failed';
      showToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 3000,
        background: 'rgba(0,0,0,0.75)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-focus)',
          borderRadius: 'var(--radius-md)',
          width: '100%',
          maxWidth: '440px',
          padding: '32px',
          boxShadow: 'var(--shadow-md)',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            color: 'var(--text-muted)'
          }}
        >
          <X size={20} />
        </button>

        <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '6px', textAlign: 'center' }}>
          {isRegister ? 'Create LUMIÈRE Account' : 'Welcome Back'}
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', textAlign: 'center', marginBottom: '24px' }}>
          {isRegister
            ? 'Join LUMIÈRE for exclusive rewards, order tracking, and private drops.'
            : 'Log in with your email address and password.'}
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {isRegister && (
            <div>
              <label style={{ fontSize: '13px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                Full Name
              </label>
              <div style={{ position: 'relative' }}>
                <User size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '14px' }} />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  required={isRegister}
                  style={{
                    width: '100%',
                    padding: '12px 14px 12px 42px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-sm)',
                    color: '#fff'
                  }}
                />
              </div>
            </div>
          )}

          <div>
            <label style={{ fontSize: '13px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '14px' }} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                style={{
                  width: '100%',
                  padding: '12px 14px 12px 42px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  color: '#fff'
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '13px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '14px' }} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{
                  width: '100%',
                  padding: '12px 14px 12px 42px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  color: '#fff'
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            style={{ width: '100%', marginTop: '8px', padding: '14px' }}
          >
            {loading ? 'Processing...' : isRegister ? 'Register' : 'Sign In'}
          </button>
        </form>

        <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '14px', color: 'var(--text-muted)' }}>
          {isRegister ? 'Already have an account?' : "Don't have an account yet?"}{' '}
          <button
            onClick={() => setIsRegister(!isRegister)}
            style={{ color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'underline' }}
          >
            {isRegister ? 'Sign In' : 'Register Now'}
          </button>
        </div>
      </div>
    </div>
  );
};
