import { useState } from 'react';
import { Map, Info, Layers } from 'lucide-react';

type Faction = {
  id: string;
  name: string;
  color: string;
  borderColor: string;
  textColor: string;
  territory: number;
  players: number;
  capital: string;
  description: string;
};

const factions: Faction[] = [
  {
    id: 'northkeep',
    name: 'Northkeep',
    color: 'bg-blue-900',
    borderColor: 'border-blue-600',
    textColor: 'text-blue-300',
    territory: 28,
    players: 12,
    capital: 'Frostholm',
    description: 'Mocná severní frakce ovládající ledové pláně a bohaté železné doly.',
  },
  {
    id: 'ironforge',
    name: 'Ironforge',
    color: 'bg-orange-900',
    borderColor: 'border-orange-600',
    textColor: 'text-orange-300',
    territory: 22,
    players: 9,
    capital: 'Stonegate',
    description: 'Trpasličí klika specializující se na těžbu a výrobu pokročilých zbraní.',
  },
  {
    id: 'greenleaf',
    name: 'Greenleaf',
    color: 'bg-forest-900',
    borderColor: 'border-forest-600',
    textColor: 'text-forest-300',
    territory: 35,
    players: 15,
    capital: 'Sylvaria',
    description: 'Největší frakce světa, ovládá tropické lesy a je největším výrobcem potravin.',
  },
  {
    id: 'redclaw',
    name: 'RedClaw',
    color: 'bg-war-900',
    borderColor: 'border-war-600',
    textColor: 'text-war-300',
    territory: 18,
    players: 7,
    capital: 'Ashport',
    description: 'Agresivní válečná frakce, neustále expandující a útočící na sousedy.',
  },
  {
    id: 'goldenhand',
    name: 'GoldenHand',
    color: 'bg-yellow-900',
    borderColor: 'border-yellow-600',
    textColor: 'text-yellow-300',
    territory: 15,
    players: 6,
    capital: 'Aurumkeep',
    description: 'Obchodní cech ovládající centrální trhy a zlaté rezervy celého světa.',
  },
  {
    id: 'unclaimed',
    name: 'Volné území',
    color: 'bg-stone-800',
    borderColor: 'border-stone-600',
    textColor: 'text-stone-400',
    territory: 0,
    players: 0,
    capital: '',
    description: 'Neobsazená krajina — ideální pro nové frakce.',
  },
];

type Cell = { faction: string; type: 'land' | 'water' | 'mountain' };

const mapGrid: Cell[][] = [
  [{ faction: 'water', type: 'water' }, { faction: 'water', type: 'water' }, { faction: 'northkeep', type: 'land' }, { faction: 'northkeep', type: 'mountain' }, { faction: 'northkeep', type: 'land' }, { faction: 'northkeep', type: 'land' }, { faction: 'northkeep', type: 'mountain' }, { faction: 'northkeep', type: 'land' }, { faction: 'northkeep', type: 'land' }, { faction: 'unclaimed', type: 'land' }, { faction: 'unclaimed', type: 'land' }, { faction: 'unclaimed', type: 'mountain' }, { faction: 'unclaimed', type: 'land' }, { faction: 'unclaimed', type: 'land' }, { faction: 'water', type: 'water' }, { faction: 'water', type: 'water' }, { faction: 'water', type: 'water' }, { faction: 'water', type: 'water' }],
  [{ faction: 'water', type: 'water' }, { faction: 'northkeep', type: 'land' }, { faction: 'northkeep', type: 'land' }, { faction: 'northkeep', type: 'land' }, { faction: 'northkeep', type: 'land' }, { faction: 'northkeep', type: 'land' }, { faction: 'northkeep', type: 'land' }, { faction: 'northkeep', type: 'mountain' }, { faction: 'unclaimed', type: 'land' }, { faction: 'unclaimed', type: 'land' }, { faction: 'unclaimed', type: 'land' }, { faction: 'unclaimed', type: 'land' }, { faction: 'unclaimed', type: 'land' }, { faction: 'unclaimed', type: 'land' }, { faction: 'unclaimed', type: 'mountain' }, { faction: 'unclaimed', type: 'land' }, { faction: 'water', type: 'water' }, { faction: 'water', type: 'water' }],
  [{ faction: 'northkeep', type: 'land' }, { faction: 'northkeep', type: 'land' }, { faction: 'northkeep', type: 'mountain' }, { faction: 'northkeep', type: 'land' }, { faction: 'northkeep', type: 'land' }, { faction: 'ironforge', type: 'mountain' }, { faction: 'ironforge', type: 'land' }, { faction: 'ironforge', type: 'land' }, { faction: 'ironforge', type: 'land' }, { faction: 'ironforge', type: 'mountain' }, { faction: 'unclaimed', type: 'land' }, { faction: 'unclaimed', type: 'land' }, { faction: 'unclaimed', type: 'land' }, { faction: 'unclaimed', type: 'mountain' }, { faction: 'unclaimed', type: 'land' }, { faction: 'unclaimed', type: 'land' }, { faction: 'unclaimed', type: 'land' }, { faction: 'water', type: 'water' }],
  [{ faction: 'northkeep', type: 'land' }, { faction: 'northkeep', type: 'land' }, { faction: 'northkeep', type: 'land' }, { faction: 'ironforge', type: 'mountain' }, { faction: 'ironforge', type: 'land' }, { faction: 'ironforge', type: 'land' }, { faction: 'ironforge', type: 'mountain' }, { faction: 'ironforge', type: 'land' }, { faction: 'ironforge', type: 'land' }, { faction: 'ironforge', type: 'land' }, { faction: 'goldenhand', type: 'land' }, { faction: 'goldenhand', type: 'land' }, { faction: 'unclaimed', type: 'land' }, { faction: 'unclaimed', type: 'land' }, { faction: 'unclaimed', type: 'land' }, { faction: 'unclaimed', type: 'mountain' }, { faction: 'unclaimed', type: 'land' }, { faction: 'water', type: 'water' }],
  [{ faction: 'water', type: 'water' }, { faction: 'northkeep', type: 'land' }, { faction: 'northkeep', type: 'land' }, { faction: 'ironforge', type: 'land' }, { faction: 'ironforge', type: 'mountain' }, { faction: 'ironforge', type: 'land' }, { faction: 'ironforge', type: 'land' }, { faction: 'goldenhand', type: 'land' }, { faction: 'goldenhand', type: 'land' }, { faction: 'goldenhand', type: 'mountain' }, { faction: 'goldenhand', type: 'land' }, { faction: 'goldenhand', type: 'land' }, { faction: 'goldenhand', type: 'land' }, { faction: 'unclaimed', type: 'land' }, { faction: 'unclaimed', type: 'land' }, { faction: 'unclaimed', type: 'land' }, { faction: 'unclaimed', type: 'land' }, { faction: 'water', type: 'water' }],
  [{ faction: 'water', type: 'water' }, { faction: 'water', type: 'water' }, { faction: 'redclaw', type: 'land' }, { faction: 'redclaw', type: 'land' }, { faction: 'redclaw', type: 'mountain' }, { faction: 'redclaw', type: 'land' }, { faction: 'goldenhand', type: 'land' }, { faction: 'goldenhand', type: 'land' }, { faction: 'goldenhand', type: 'mountain' }, { faction: 'goldenhand', type: 'land' }, { faction: 'greenleaf', type: 'land' }, { faction: 'greenleaf', type: 'land' }, { faction: 'greenleaf', type: 'land' }, { faction: 'unclaimed', type: 'mountain' }, { faction: 'unclaimed', type: 'land' }, { faction: 'unclaimed', type: 'land' }, { faction: 'water', type: 'water' }, { faction: 'water', type: 'water' }],
  [{ faction: 'water', type: 'water' }, { faction: 'redclaw', type: 'land' }, { faction: 'redclaw', type: 'mountain' }, { faction: 'redclaw', type: 'land' }, { faction: 'redclaw', type: 'land' }, { faction: 'redclaw', type: 'land' }, { faction: 'redclaw', type: 'mountain' }, { faction: 'greenleaf', type: 'land' }, { faction: 'greenleaf', type: 'land' }, { faction: 'greenleaf', type: 'mountain' }, { faction: 'greenleaf', type: 'land' }, { faction: 'greenleaf', type: 'land' }, { faction: 'greenleaf', type: 'land' }, { faction: 'greenleaf', type: 'land' }, { faction: 'greenleaf', type: 'mountain' }, { faction: 'unclaimed', type: 'land' }, { faction: 'water', type: 'water' }, { faction: 'water', type: 'water' }],
  [{ faction: 'water', type: 'water' }, { faction: 'redclaw', type: 'land' }, { faction: 'redclaw', type: 'land' }, { faction: 'redclaw', type: 'land' }, { faction: 'redclaw', type: 'mountain' }, { faction: 'unclaimed', type: 'land' }, { faction: 'greenleaf', type: 'land' }, { faction: 'greenleaf', type: 'land' }, { faction: 'greenleaf', type: 'mountain' }, { faction: 'greenleaf', type: 'land' }, { faction: 'greenleaf', type: 'land' }, { faction: 'greenleaf', type: 'land' }, { faction: 'greenleaf', type: 'mountain' }, { faction: 'greenleaf', type: 'land' }, { faction: 'greenleaf', type: 'land' }, { faction: 'unclaimed', type: 'land' }, { faction: 'water', type: 'water' }, { faction: 'water', type: 'water' }],
  [{ faction: 'water', type: 'water' }, { faction: 'water', type: 'water' }, { faction: 'unclaimed', type: 'land' }, { faction: 'unclaimed', type: 'land' }, { faction: 'unclaimed', type: 'mountain' }, { faction: 'unclaimed', type: 'land' }, { faction: 'unclaimed', type: 'land' }, { faction: 'greenleaf', type: 'land' }, { faction: 'greenleaf', type: 'land' }, { faction: 'greenleaf', type: 'land' }, { faction: 'greenleaf', type: 'mountain' }, { faction: 'greenleaf', type: 'land' }, { faction: 'greenleaf', type: 'land' }, { faction: 'greenleaf', type: 'land' }, { faction: 'greenleaf', type: 'land' }, { faction: 'unclaimed', type: 'mountain' }, { faction: 'water', type: 'water' }, { faction: 'water', type: 'water' }],
  [{ faction: 'water', type: 'water' }, { faction: 'water', type: 'water' }, { faction: 'water', type: 'water' }, { faction: 'unclaimed', type: 'land' }, { faction: 'unclaimed', type: 'land' }, { faction: 'unclaimed', type: 'land' }, { faction: 'unclaimed', type: 'mountain' }, { faction: 'unclaimed', type: 'land' }, { faction: 'greenleaf', type: 'land' }, { faction: 'greenleaf', type: 'mountain' }, { faction: 'greenleaf', type: 'land' }, { faction: 'greenleaf', type: 'land' }, { faction: 'unclaimed', type: 'land' }, { faction: 'unclaimed', type: 'land' }, { faction: 'unclaimed', type: 'mountain' }, { faction: 'unclaimed', type: 'land' }, { faction: 'water', type: 'water' }, { faction: 'water', type: 'water' }],
  [{ faction: 'water', type: 'water' }, { faction: 'water', type: 'water' }, { faction: 'water', type: 'water' }, { faction: 'water', type: 'water' }, { faction: 'unclaimed', type: 'land' }, { faction: 'unclaimed', type: 'land' }, { faction: 'unclaimed', type: 'land' }, { faction: 'unclaimed', type: 'mountain' }, { faction: 'unclaimed', type: 'land' }, { faction: 'unclaimed', type: 'land' }, { faction: 'unclaimed', type: 'land' }, { faction: 'unclaimed', type: 'land' }, { faction: 'unclaimed', type: 'mountain' }, { faction: 'unclaimed', type: 'land' }, { faction: 'unclaimed', type: 'land' }, { faction: 'water', type: 'water' }, { faction: 'water', type: 'water' }, { faction: 'water', type: 'water' }],
  [{ faction: 'water', type: 'water' }, { faction: 'water', type: 'water' }, { faction: 'water', type: 'water' }, { faction: 'water', type: 'water' }, { faction: 'water', type: 'water' }, { faction: 'unclaimed', type: 'land' }, { faction: 'unclaimed', type: 'land' }, { faction: 'unclaimed', type: 'land' }, { faction: 'unclaimed', type: 'mountain' }, { faction: 'unclaimed', type: 'land' }, { faction: 'unclaimed', type: 'land' }, { faction: 'water', type: 'water' }, { faction: 'water', type: 'water' }, { faction: 'water', type: 'water' }, { faction: 'water', type: 'water' }, { faction: 'water', type: 'water' }, { faction: 'water', type: 'water' }, { faction: 'water', type: 'water' }],
];

const factionColors: Record<string, string> = {
  northkeep: 'bg-blue-800 hover:bg-blue-700',
  ironforge: 'bg-orange-800 hover:bg-orange-700',
  greenleaf: 'bg-forest-800 hover:bg-forest-700',
  redclaw: 'bg-red-800 hover:bg-red-700',
  goldenhand: 'bg-yellow-800 hover:bg-yellow-700',
  unclaimed: 'bg-stone-700 hover:bg-stone-600',
  water: 'bg-blue-950 hover:bg-blue-950',
};

export default function TerritoryMap() {
  const [selected, setSelected] = useState<Faction | null>(null);
  const [hoveredFaction, setHoveredFaction] = useState<string | null>(null);

  const totalLand = factions.filter(f => f.id !== 'unclaimed').reduce((s, f) => s + f.territory, 0);

  return (
    <section id="mapa" className="py-24 bg-stone-950 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-stone-900/30 to-stone-950 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 text-forest-400 text-xs font-semibold tracking-widest uppercase mb-4">
            <Map size={14} />
            Mapa světa
          </div>
          <h2 className="font-minecraft text-2xl sm:text-3xl text-stone-100 mb-4">
            Ovládni <span className="text-forest-400">území</span>
          </h2>
          <p className="text-stone-400 max-w-xl mx-auto text-sm leading-relaxed">
            Každý chunk mapy může být obsazen frakcí. Dobývejte, braňte a rozšiřujte svoji říši.
          </p>
        </div>

        <div className="flex flex-col xl:flex-row gap-8 items-start">
          <div className="flex-1 min-w-0">
            <div className="bg-stone-900 border border-stone-700 rounded-xl p-4 sm:p-6 pixel-border">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-stone-400 text-xs">
                  <Layers size={12} />
                  <span>Interaktivní mapa frakcí</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-forest-400 animate-pulse" />
                  <span className="text-stone-400 text-xs">Live</span>
                </div>
              </div>

              <div
                className="grid gap-0.5 w-full"
                style={{ gridTemplateColumns: 'repeat(18, minmax(0, 1fr))' }}
              >
                {mapGrid.map((row, ri) =>
                  row.map((cell, ci) => {
                    const isWater = cell.type === 'water';
                    const isMtn = cell.type === 'mountain';
                    const isHighlighted = hoveredFaction === cell.faction || !hoveredFaction;
                    return (
                      <button
                        key={`${ri}-${ci}`}
                        title={isWater ? 'Oceán' : cell.faction}
                        onClick={() => {
                          if (!isWater) {
                            const f = factions.find(f => f.id === cell.faction);
                            setSelected(f || null);
                          }
                        }}
                        onMouseEnter={() => !isWater && setHoveredFaction(cell.faction)}
                        onMouseLeave={() => setHoveredFaction(null)}
                        className={`
                          aspect-square rounded-sm transition-all duration-100 relative
                          ${factionColors[cell.faction] || 'bg-stone-800'}
                          ${isWater ? 'cursor-default opacity-80' : 'cursor-pointer territory-cell'}
                          ${!isHighlighted ? 'opacity-30' : ''}
                          ${isMtn ? 'brightness-75' : ''}
                        `}
                      >
                        {isMtn && (
                          <span className="absolute inset-0 flex items-center justify-center text-[5px] text-white/25 pointer-events-none">▲</span>
                        )}
                      </button>
                    );
                  })
                )}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {factions.map(f => (
                  <button
                    key={f.id}
                    onMouseEnter={() => setHoveredFaction(f.id)}
                    onMouseLeave={() => setHoveredFaction(null)}
                    onClick={() => setSelected(f)}
                    className={`flex items-center gap-1.5 px-2 py-1 rounded text-xs transition-all ${
                      hoveredFaction === f.id ? 'bg-stone-700 text-stone-100' : 'text-stone-400 hover:text-stone-300'
                    }`}
                  >
                    <div className={`w-2.5 h-2.5 rounded-sm ${factionColors[f.id]?.split(' ')[0] || 'bg-stone-600'}`} />
                    {f.name}
                  </button>
                ))}
                <div className="flex items-center gap-1.5 px-2 py-1 text-xs text-stone-500">
                  <div className="w-2.5 h-2.5 rounded-sm bg-blue-950" />
                  Oceán
                </div>
              </div>
            </div>
          </div>

          <div className="w-full xl:w-80 space-y-4">
            {selected ? (
              <div className={`bg-stone-900 border rounded-xl p-5 pixel-border ${selected.borderColor}`}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className={`font-minecraft text-sm ${selected.textColor}`}>{selected.name}</h3>
                    {selected.capital && (
                      <p className="text-stone-500 text-xs mt-1">Hlavní město: {selected.capital}</p>
                    )}
                  </div>
                  <button onClick={() => setSelected(null)} className="text-stone-600 hover:text-stone-400 text-xs">✕</button>
                </div>
                <p className="text-stone-400 text-xs leading-relaxed mb-4">{selected.description}</p>
                {selected.id !== 'unclaimed' && (
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-stone-800 rounded p-2 text-center">
                      <div className={`font-minecraft text-lg ${selected.textColor}`}>{selected.territory}</div>
                      <div className="text-stone-500 text-xs">Chunků</div>
                    </div>
                    <div className="bg-stone-800 rounded p-2 text-center">
                      <div className={`font-minecraft text-lg ${selected.textColor}`}>{selected.players}</div>
                      <div className="text-stone-500 text-xs">Hráčů</div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-stone-900 border border-stone-800 rounded-xl p-5 text-center">
                <Info size={24} className="text-stone-600 mx-auto mb-2" />
                <p className="text-stone-500 text-xs">Klikni na území nebo frakci pro detail</p>
              </div>
            )}

            <div className="bg-stone-900 border border-stone-800 rounded-xl p-5 pixel-border">
              <h3 className="text-stone-300 text-xs font-semibold uppercase tracking-wider mb-4">Obsazení světa</h3>
              <div className="space-y-2.5">
                {factions.filter(f => f.id !== 'unclaimed').map(f => (
                  <div key={f.id}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className={f.textColor}>{f.name}</span>
                      <span className="text-stone-500">{f.territory} chunks</span>
                    </div>
                    <div className="h-1.5 bg-stone-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${factionColors[f.id]?.split(' ')[0] || ''}`}
                        style={{ width: `${(f.territory / totalLand) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
