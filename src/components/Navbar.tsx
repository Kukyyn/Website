import { useState, useEffect } from 'react';
import { Menu, X, Sword, Map, Coins, Users } from 'lucide-react';

const links = [
  { label: 'Mapa', href: '#mapa', icon: Map },
  { label: 'Ekonomika', href: '#ekonomika', icon: Coins },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-stone-950/95 backdrop-blur-md border-b border-stone-800 shadow-2xl'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-8 h-8 bg-forest-500 rounded-sm flex items-center justify-center pixel-border group-hover:bg-forest-400 transition-colors">
              <span className="font-minecraft text-[8px] text-white leading-none">K</span>
            </div>
            <span className="font-minecraft text-xs text-stone-100 hidden sm:block tracking-tight">
              KukyynSMP
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {links.map(({ label, href, icon: Icon }) => (
              <a
                key={href}
                href={href}
                className="flex items-center gap-2 px-4 py-2 rounded text-stone-400 hover:text-stone-100 hover:bg-stone-800/60 transition-all duration-150 text-sm font-medium"
              >
                <Icon size={15} />
                {label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-2 bg-stone-900 border border-stone-700 rounded px-3 py-1.5">
              <div className="w-2 h-2 rounded-full bg-forest-400 animate-pulse" />
              <span className="text-xs text-stone-300 font-medium font-mono">mc.kukyyn.cz</span>
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText('mc.kukyyn.cz');
              }}
              className="mc-button bg-forest-600 hover:bg-forest-500 text-white text-xs px-4 py-2 rounded"
            >
              Kopírovat IP
            </button>
          </div>

          <button
            className="md:hidden p-2 text-stone-400 hover:text-stone-100 transition-colors"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-stone-950/98 backdrop-blur-md border-t border-stone-800">
          <div className="px-4 py-4 space-y-1">
            {links.map(({ label, href, icon: Icon }) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-3 py-3 rounded text-stone-300 hover:text-white hover:bg-stone-800 transition-all text-sm font-medium"
              >
                <Icon size={16} />
                {label}
              </a>
            ))}
            <div className="pt-3 border-t border-stone-800">
              <div className="flex items-center gap-2 bg-stone-900 border border-stone-700 rounded px-3 py-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-forest-400 animate-pulse" />
                <span className="text-xs text-stone-300 font-mono">mc.kukyyn.cz</span>
              </div>
              <button
                onClick={() => { navigator.clipboard.writeText('mc.kukyyn.cz'); setOpen(false); }}
                className="w-full mc-button bg-forest-600 text-white text-sm py-2.5 rounded font-medium"
              >
                Kopírovat IP adresu
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
