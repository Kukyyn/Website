import { useState } from 'react';
import { X, Mail, Lock, Eye, EyeOff, Loader2, LogIn, UserPlus } from 'lucide-react';
import { supabase } from '../lib/supabase';

type Tab = 'signin' | 'signup';

type Props = {
  onClose: () => void;
};

export default function AuthModal({ onClose }: Props) {
  const [tab, setTab] = useState<Tab>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      if (tab === 'signup') {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setSuccess('Účet vytvořen! Nyní jsi přihlášen.');
        setTimeout(onClose, 1500);
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        onClose();
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Něco se pokazilo.';
      if (msg.includes('Invalid login credentials')) {
        setError('Nesprávný e-mail nebo heslo.');
      } else if (msg.includes('User already registered')) {
        setError('Tento e-mail je již zaregistrován. Přihlaš se.');
      } else if (msg.includes('Password should be')) {
        setError('Heslo musí mít alespoň 6 znaků.');
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="absolute inset-0 bg-stone-950/80 backdrop-blur-sm" />

      <div className="relative w-full max-w-md bg-stone-900 border border-stone-700 rounded-2xl shadow-2xl pixel-border animate-fade-in overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-forest-600 rounded-sm flex items-center justify-center pixel-border">
              <span className="font-minecraft text-[8px] text-white leading-none">K</span>
            </div>
            <span className="font-minecraft text-xs text-stone-200">KukyynSMP</span>
          </div>
          <button
            onClick={onClose}
            className="text-stone-500 hover:text-stone-200 transition-colors p-1 rounded"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-stone-800">
          {(['signin', 'signup'] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => { setTab(t); setError(null); setSuccess(null); }}
              className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors ${
                tab === t
                  ? 'text-forest-400 border-b-2 border-forest-400 bg-forest-950/30'
                  : 'text-stone-500 hover:text-stone-300'
              }`}
            >
              {t === 'signin' ? <LogIn size={14} /> : <UserPlus size={14} />}
              {t === 'signin' ? 'Přihlásit se' : 'Registrovat se'}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4">
          <div>
            <label className="block text-stone-400 text-xs font-medium mb-1.5">E-mail</label>
            <div className="relative">
              <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="hrac@kukyyn.cz"
                className="w-full bg-stone-800 border border-stone-700 rounded-lg pl-9 pr-4 py-2.5 text-sm text-stone-100 placeholder-stone-600 focus:outline-none focus:border-forest-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-stone-400 text-xs font-medium mb-1.5">Heslo</label>
            <div className="relative">
              <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                placeholder="••••••••"
                className="w-full bg-stone-800 border border-stone-700 rounded-lg pl-9 pr-10 py-2.5 text-sm text-stone-100 placeholder-stone-600 focus:outline-none focus:border-forest-500 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300 transition-colors"
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            {tab === 'signup' && (
              <p className="text-stone-600 text-xs mt-1">Minimálně 6 znaků.</p>
            )}
          </div>

          {error && (
            <div className="bg-red-950/60 border border-red-800 rounded-lg px-4 py-2.5 text-red-400 text-xs">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-forest-950/60 border border-forest-700 rounded-lg px-4 py-2.5 text-forest-400 text-xs">
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mc-button bg-forest-700 hover:bg-forest-600 text-white py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : tab === 'signin' ? (
              <>
                <LogIn size={15} />
                Přihlásit se
              </>
            ) : (
              <>
                <UserPlus size={15} />
                Vytvořit účet
              </>
            )}
          </button>

          <p className="text-center text-stone-600 text-xs pt-1">
            {tab === 'signin' ? (
              <>Nemáš účet?{' '}
                <button type="button" onClick={() => setTab('signup')} className="text-forest-400 hover:text-forest-300 transition-colors">
                  Zaregistruj se
                </button>
              </>
            ) : (
              <>Už máš účet?{' '}
                <button type="button" onClick={() => setTab('signin')} className="text-forest-400 hover:text-forest-300 transition-colors">
                  Přihlaš se
                </button>
              </>
            )}
          </p>
        </form>
      </div>
    </div>
  );
}
