import { useState, useMemo, useRef } from 'react';
import { Header } from '@/components/Header';
import { ServerSelector } from '@/components/ServerSelector';
import { StatsDisplay } from '@/components/StatsDisplay';
import { SearchBar } from '@/components/SearchBar';
import { CategorySidebar } from '@/components/CategorySidebar';
import { ApiEndpoint as ApiEndpointComponent } from '@/components/ApiEndpoint';
import { servers, apiCategories, getTotalEndpoints, getTotalCategories } from '@/data/mockApi';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { ApiEndpoint } from '@/types/api';

const Index = () => {
  const [selectedServer, setSelectedServer] = useState(servers[0].url);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEndpoint, setSelectedEndpoint] = useState<ApiEndpoint | null>(null);
  const headerRef = useScrollReveal();
  const serverRef = useScrollReveal();
  const statsRef = useScrollReveal();
  const searchRef = useScrollReveal();
  const endpointRef = useRef<HTMLDivElement>(null);

  const handleRouteClick = (endpoint: ApiEndpoint) => {
    setSelectedEndpoint(endpoint);
    setSearchQuery('');
    setTimeout(() => {
      endpointRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background font-sans relative overflow-hidden">
      <CategorySidebar 
        categories={apiCategories} 
        onRouteClick={handleRouteClick}
        serverUrl={selectedServer}
      />

      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 gradient-primary opacity-10 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 gradient-secondary opacity-10 blur-3xl rounded-full"></div>
      </div>

      <main className="relative max-w-6xl mx-auto px-4 sm:px-8 py-12 sm:py-24">
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

        <div ref={searchRef} className="scroll-reveal">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
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

        {!selectedEndpoint && (
          <div className="text-center py-24 animate-fade-in">
            <div className="max-w-md mx-auto glass-effect-strong p-10 rounded-2xl">
              <div className="mb-4">
                <div className="w-16 h-16 mx-auto rounded-2xl gradient-primary shadow-elegant flex items-center justify-center">
                  <div className="w-10 h-10 bg-primary-foreground/90 rounded-xl"></div>
                </div>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Bem-vindo às Neext APIs</h3>
              <p className="text-sm text-muted-foreground">Selecione uma rota no menu lateral para começar a testar</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
