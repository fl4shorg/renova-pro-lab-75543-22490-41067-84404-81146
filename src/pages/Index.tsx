import { useState, useRef, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Header } from '@/components/Header';
import { ServerSelector } from '@/components/ServerSelector';
import { StatsDisplay } from '@/components/StatsDisplay';
import { CategorySidebar } from '@/components/CategorySidebar';
import { ApiEndpoint as ApiEndpointComponent } from '@/components/ApiEndpoint';
import { servers, apiCategories, getTotalEndpoints, getTotalCategories } from '@/data/mockApi';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { ApiEndpoint } from '@/types/api';

const Index = () => {
  const [selectedServer, setSelectedServer] = useState(servers[0].url);
  const [selectedEndpoint, setSelectedEndpoint] = useState<ApiEndpoint | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const headerRef = useScrollReveal();
  const serverRef = useScrollReveal();
  const statsRef = useScrollReveal();
  const endpointRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://counter1.optistats.ovh/private/counter.js?c=ekxwgseaee5p6xxgjukejkbdy47xdxzt&down=async';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleRouteClick = (endpoint: ApiEndpoint) => {
    setSelectedEndpoint(endpoint);
    setTimeout(() => {
      endpointRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const handleMenuClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-background font-sans relative overflow-hidden">
      <Navbar onMenuClick={handleMenuClick} />
      

      <main className="relative max-w-6xl mx-auto px-4 sm:px-8 py-12 sm:py-24 mt-16">
        <CategorySidebar 
          categories={apiCategories} 
          onRouteClick={handleRouteClick}
          serverUrl={selectedServer}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <div ref={headerRef} className="scroll-reveal">
          <Header />
        </div>
        
        <div ref={serverRef} className="scroll-reveal">
          <ServerSelector
            servers={servers}
            selectedServer={selectedServer}
            onServerChange={setSelectedServer}
          />
        </div>

        <div ref={statsRef} className="scroll-reveal">
          <StatsDisplay
            totalEndpoints={getTotalEndpoints()}
            totalCategories={getTotalCategories()}
          />
        </div>

        <div className="flex flex-col items-center mb-8 animate-fade-in">
          <div className="group relative overflow-hidden rounded-3xl border border-primary/20 glass-effect transition-all duration-300 hover:border-primary/40 hover:shadow-elegant px-8 py-6 max-w-md w-full">
            <div className="absolute inset-0 gradient-primary opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
            <div className="absolute inset-0 gradient-shine opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="relative">
              <h3 className="text-lg font-bold font-sans text-[#00ff88] mb-3 text-center tracking-wide">
                VISITANTES DIÁRIOS: ↴
              </h3>
              <div className="flex justify-center items-center mb-3">
                <div id="sfcekxwgseaee5p6xxgjukejkbdy47xdxzt"></div>
              </div>
              <p className="text-center text-slate-400/80 font-serif text-sm">
                Seja bem-vindo, aproveite!
              </p>
            </div>
          </div>
          <noscript>
            <a href="https://www.webcontadores.com" title="contador de visitas html">
              <img src="https://counter1.optistats.ovh/private/webcontadores.php?c=ekxwgseaee5p6xxgjukejkbdy47xdxzt" className="border-0" title="contador de visitas html" alt="contador de visitas html" />
            </a>
          </noscript>
        </div>

        {selectedEndpoint && (
          <div ref={endpointRef} className="mt-8 animate-fade-in">
            <div className="glass-effect-strong rounded-2xl p-6 shadow-card">
              <ApiEndpointComponent 
                endpoint={selectedEndpoint}
                serverUrl={selectedServer}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
