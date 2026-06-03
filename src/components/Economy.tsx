import { Coins, TrendingUp, TrendingDown, Minus, Package, ShoppingCart, Hammer, Wheat, Trophy } from 'lucide-react';

type Item = {
  name: string;
  category: string;
  price: number;
  change: number;
  unit: string;
  icon: string;
};

const marketItems: Item[] = [
  { name: 'Diamant', category: 'Minerály', price: 320, change: 8.2, unit: 'ks', icon: '💎' },
  { name: 'Netheritový ingot', category: 'Minerály', price: 1850, change: -3.1, unit: 'ks', icon: '⬛' },
  { name: 'Zlatý ingot', category: 'Minerály', price: 45, change: 12.7, unit: 'ks', icon: '🟡' },
  { name: 'Pšenice', category: 'Potraviny', price: 3, change: -1.5, unit: '64ks', icon: '🌾' },
  { name: 'Vařené hovězí', category: 'Potraviny', price: 8, change: 0.0, unit: 'ks', icon: '🥩' },
  { name: 'Dřevo (dubové)', category: 'Stavby', price: 2, change: 4.3, unit: '64ks', icon: '🪵' },
  { name: 'Kámen', category: 'Stavby', price: 1, change: 0.0, unit: '64ks', icon: '🪨' },
  { name: 'Železný ingot', category: 'Minerály', price: 18, change: -2.8, unit: 'ks', icon: '⚙️' },
];

const economyFeatures = [
  {
    icon: ShoppingCart,
    title: 'Hráčský trh',
    desc: 'Nakupuj a prodávej suroviny přímo od ostatních hráčů. Ceny se mění dle nabídky a poptávky.',
    color: 'text-forest-400',
    bg: 'bg-forest-950 border-forest-900',
  },
  {
    icon: Hammer,
    title: 'Řemesla & výroba',
    desc: 'Specializuj se na výrobu. Kováři, farmáři i architekti mají vlastní profese s bonusy.',
    color: 'text-orange-400',
    bg: 'bg-orange-950 border-orange-900',
  },
  {
    icon: Package,
    title: 'Frakční sklady',
    desc: 'Každá frakce má sdílený sklad. Správná správa zásob je klíčem k vítězství ve válce.',
    color: 'text-blue-400',
    bg: 'bg-blue-950 border-blue-900',
  },
  {
    icon: Coins,
    title: 'Zlatá měna',
    desc: 'Ekonomika je postavena na zlatých prutech. Bankovní systém umožňuje půjčky a investice.',
    color: 'text-gold-400',
    bg: 'bg-yellow-950 border-yellow-900',
  },
];

function PriceChange({ change }: { change: number }) {
  if (change === 0) return (
    <span className="flex items-center gap-1 text-stone-500 text-xs">
      <Minus size={10} /> 0%
    </span>
  );
  const isUp = change > 0;
  return (
    <span className={`flex items-center gap-1 text-xs font-medium ${isUp ? 'text-forest-400' : 'text-war-400'}`}>
      {isUp ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
      {isUp ? '+' : ''}{change}%
    </span>
  );
}

export default function Economy() {
  return (
    <section id="ekonomika" className="py-24 bg-stone-950 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-stone-900/20 to-stone-950 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 text-gold-400 text-xs font-semibold tracking-widest uppercase mb-4">
            <Coins size={14} />
            Ekonomika
          </div>
          <h2 className="font-minecraft text-2xl sm:text-3xl text-stone-100 mb-4">
            Trh & <span className="text-gold-400">obchod</span>
          </h2>
          <p className="text-stone-400 max-w-xl mx-auto text-sm leading-relaxed">
            Dynamická hráčská ekonomika s živými cenami. Staň se obchodním magnátem nebo ovládni výrobu.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <div className="bg-stone-900 border border-stone-800 rounded-xl overflow-hidden pixel-border">
            <div className="flex items-center justify-between p-5 border-b border-stone-800">
              <div className="flex items-center gap-2">
                <TrendingUp size={16} className="text-gold-400" />
                <h3 className="text-stone-200 font-semibold text-sm">Tržní ceny</h3>
              </div>
              <span className="text-stone-600 text-xs">Aktualizováno živě</span>
            </div>

            <div className="divide-y divide-stone-800/60">
              {marketItems.map(item => (
                <div key={item.name} className="flex items-center gap-4 px-5 py-3 hover:bg-stone-800/40 transition-colors">
                  <span className="text-xl w-7 text-center flex-shrink-0">{item.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-stone-200 text-sm font-medium truncate">{item.name}</div>
                    <div className="text-stone-600 text-xs">{item.category}</div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-gold-400 font-mono text-sm font-semibold">
                      {item.price}G
                      <span className="text-stone-600 text-xs font-normal">/{item.unit}</span>
                    </div>
                    <PriceChange change={item.change} />
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-stone-900/50 border-t border-stone-800 text-center">
              <p className="text-stone-600 text-xs">Ceny jsou průměrem posledních 24h transakcí na serveru</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-stone-900 border border-stone-800 rounded-xl p-5 pixel-border">
              <h3 className="text-stone-200 font-semibold text-sm mb-4 flex items-center gap-2">
                <Trophy size={14} className="text-gold-400" />
                Top obchodníci
              </h3>
              <div className="space-y-3">
                {[
                  { name: 'Kukyyn', faction: 'GoldenHand', profit: '48,200G', rank: 1 },
                  { name: 'SteelKing', faction: 'Ironforge', profit: '31,500G', rank: 2 },
                  { name: 'LeafMaster', faction: 'Greenleaf', profit: '27,900G', rank: 3 },
                  { name: 'FrostBorn', faction: 'Northkeep', profit: '19,400G', rank: 4 },
                  { name: 'AshRunner', faction: 'RedClaw', profit: '14,100G', rank: 5 },
                ].map(player => (
                  <div key={player.name} className="flex items-center gap-3 p-3 bg-stone-800/50 rounded-lg">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                      player.rank === 1 ? 'bg-yellow-900 text-gold-400' :
                      player.rank === 2 ? 'bg-stone-700 text-stone-300' :
                      player.rank === 3 ? 'bg-orange-950 text-orange-400' :
                      'bg-stone-800 text-stone-500'
                    }`}>
                      #{player.rank}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-stone-200 text-sm font-medium">{player.name}</div>
                      <div className="text-stone-600 text-xs">{player.faction}</div>
                    </div>
                    <div className="text-gold-400 font-mono text-sm font-semibold flex-shrink-0">{player.profit}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Celkové transakce', value: '12,847', sub: 'za posledních 7 dní', color: 'text-forest-400' },
                { label: 'Zlaté v oběhu', value: '2.4M', sub: 'celková ekonomika', color: 'text-gold-400' },
              ].map(stat => (
                <div key={stat.label} className="bg-stone-900 border border-stone-800 rounded-xl p-4 pixel-border">
                  <div className={`font-minecraft text-xl ${stat.color} mb-1`}>{stat.value}</div>
                  <div className="text-stone-300 text-xs font-medium">{stat.label}</div>
                  <div className="text-stone-600 text-xs mt-1">{stat.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {economyFeatures.map(({ icon: Icon, title, desc, color, bg }) => (
            <div key={title} className={`bg-stone-900 border rounded-xl p-5 hover:border-stone-700 transition-colors pixel-border border-stone-800`}>
              <div className={`w-10 h-10 rounded-lg border flex items-center justify-center mb-4 ${bg}`}>
                <Icon size={18} className={color} />
              </div>
              <h4 className="text-stone-200 font-semibold text-sm mb-2">{title}</h4>
              <p className="text-stone-500 text-xs leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
