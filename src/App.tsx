import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TerritoryMap from './components/TerritoryMap';
import Economy from './components/Economy';
import Footer from './components/Footer';

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-stone-950 text-stone-100">
        <Navbar />
        <main>
          <Hero />
          <TerritoryMap />
          <Economy />
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}
