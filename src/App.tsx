import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TerritoryMap from './components/TerritoryMap';
import Wars from './components/Wars';
import Economy from './components/Economy';
import Factions from './components/Factions';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-stone-950 text-stone-100">
      <Navbar />
      <main>
        <Hero />
        <TerritoryMap />
        <Wars />
        <Economy />
        <Factions />
      </main>
      <Footer />
    </div>
  );
}
