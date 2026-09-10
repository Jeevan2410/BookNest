import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Eye, EyeOff } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useApp();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
    navigate('/account');
  };

  return (
    <div className="min-h-screen pt-24 pb-20 flex items-center justify-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md mx-auto px-4">
        <div className="text-center mb-8">
          <BookOpen className="w-8 h-8 text-primary mx-auto mb-3" />
          <h1 className="text-heading-2 font-serif text-ink mb-2">Welcome back</h1>
          <p className="text-ink-muted">Sign in to your BookNest account.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-ink mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:border-primary"
              placeholder="you@email.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:border-primary pr-12"
                placeholder="••••••••"
                required
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-muted">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-ink-light">
              <input type="checkbox" className="rounded border-border" />
              Remember me
            </label>
            <a href="#" className="text-sm text-primary hover:underline">Forgot password?</a>
          </div>
          <button type="submit" className="w-full py-3 bg-ink text-cream font-medium rounded-full hover:bg-primary transition-colors">
            Sign In
          </button>
        </form>

        <p className="text-center text-sm text-ink-muted mt-6">
          Don't have an account? <Link to="/signup" className="text-primary font-medium hover:underline">Sign up</Link>
        </p>
      </motion.div>
    </div>
  );
}

export function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const { signup } = useApp();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) return;
    signup(name, email, password);
    navigate('/account');
  };

  return (
    <div className="min-h-screen pt-24 pb-20 flex items-center justify-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md mx-auto px-4">
        <div className="text-center mb-8">
          <BookOpen className="w-8 h-8 text-primary mx-auto mb-3" />
          <h1 className="text-heading-2 font-serif text-ink mb-2">Join BookNest</h1>
          <p className="text-ink-muted">Start your reading journey today.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-ink mb-1">Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:border-primary" placeholder="Your name" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-1">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:border-primary" placeholder="you@email.com" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-1">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:border-primary" placeholder="••••••••" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-1">Confirm Password</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:border-primary" placeholder="••••••••" required />
          </div>
          <label className="flex items-start gap-2 text-sm text-ink-light">
            <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-0.5 rounded border-border" required />
            <span>I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a></span>
          </label>
          <button type="submit" className="w-full py-3 bg-ink text-cream font-medium rounded-full hover:bg-primary transition-colors">
            Create Account
          </button>
        </form>

        <p className="text-center text-sm text-ink-muted mt-6">
          Already have an account? <Link to="/login" className="text-primary font-medium hover:underline">Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
}
