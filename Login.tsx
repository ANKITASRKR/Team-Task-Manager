import { useState } from 'react';
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { Mail, Lock, LogIn, Chrome } from 'lucide-react';
import { motion } from 'motion/react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <img 
          src="https://lh3.googleusercontent.com/aida/ADBb0ujKT97MkAL3yhbmss4BMaXmL5aAyYoLpmz91NLpqksNRQgg8dQj99hXtW6UZ21RWZJrZiFYVcflXXbhMLxoHlYqYYshdvYYrNQz_ng7s-AOItlMuvwGDJI8op8Qo_X6mnmNe2TyWV93AxpXH4JdEFqSmXYz9B5Z5M67R-Ian1n0AyZfdJqiUDg1lZSk1WfdHufbW5f6Rze3Kjfi10vxR6PUU1oQCGZGBnoLTc0YAQlcrksKAxkV-V38DxU-xTcNkg4mRzDa6JHRVtE" 
          className="w-full h-full object-cover grayscale"
          alt=""
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="z-10 w-full max-w-[440px]"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="bg-primary p-3 rounded-2xl mb-4 shadow-sm">
            <LogIn className="w-8 h-8 text-on-primary" />
          </div>
          <h1 className="text-3xl font-bold text-primary tracking-tight">TeamTask</h1>
          <p className="text-on-surface-variant font-medium mt-1">Professional Work Management</p>
        </div>

        <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-on-surface mb-1">Welcome back</h2>
            <p className="text-on-surface-variant text-sm">Please enter your credentials to access your workspace.</p>
          </div>

          <form onSubmit={handleEmailLogin} className="space-y-6">
            <div className="space-y-1">
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-outline" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-surface-container-low border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                  placeholder="name@company.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Password</label>
                <a href="#" className="text-xs font-bold text-primary hover:underline">Forgot password?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-outline" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-surface-container-low border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && <p className="text-error text-sm font-medium">{error}</p>}

            <button 
              type="submit"
              className="w-full bg-primary text-on-primary py-3 px-4 rounded-xl font-bold hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              Sign In
            </button>
          </form>

          <div className="relative my-6 text-center">
            <div className="absolute inset-y-1/2 w-full border-t border-outline-variant"></div>
            <span className="relative bg-surface-container-lowest px-4 text-xs font-bold uppercase text-on-surface-variant">Or continue with</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={handleGoogleLogin}
              className="flex items-center justify-center gap-2 py-3 px-4 border border-outline-variant rounded-xl bg-surface-container-low hover:bg-surface-container-high transition-all text-sm font-medium"
            >
              <Chrome className="w-5 h-5" />
              Google
            </button>
            <button className="flex items-center justify-center gap-2 py-3 px-4 border border-outline-variant rounded-xl bg-surface-container-low hover:bg-surface-container-high transition-all text-sm font-medium">
              SSO
            </button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-on-surface-variant">
            Don't have an account? 
            <a href="#" className="text-primary font-bold hover:underline ml-1">Sign up for a new account</a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
