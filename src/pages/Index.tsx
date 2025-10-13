import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { Header } from '@/components/Header';
import { ServerSelector } from '@/components/ServerSelector';
import { StatsDisplay } from '@/components/StatsDisplay';
import { SearchBar } from '@/components/SearchBar';
import { CategoryGroup } from '@/components/CategoryGroup';
import { servers, apiCategories, getTotalEndpoints, getTotalCategories } from '@/data/mockApi';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const Index = () => {
  const [selectedServer, setSelectedServer] = useState(servers[0].url);
  const [searchQuery, setSearchQuery] = useState('');
  const headerRef = useScrollReveal();
  const serverRef = useScrollReveal();
  const statsRef = useScrollReveal();
  const searchRef = useScrollReveal();

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return apiCategories;

    return apiCategories
      .map(category => ({
        ...category,
        endpoints: category.endpoints.filter(endpoint =>
          endpoint.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
          endpoint.alias.toLowerCase().includes(searchQuery.toLowerCase()) ||
          endpoint.category.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      }))
      .filter(category => category.endpoints.length > 0);
  }, [searchQuery]);

  const hasResults = filteredCategories.length > 0;

  return (
    <div className="min-h-screen bg-background font-sans relative overflow-hidden">
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

        <div className="space-y-5 content-visibility-auto" style={{ contentVisibility: 'auto', containIntrinsicSize: '1px 1000px' }}>
          {hasResults ? (
            filteredCategories.map((category, index) => (
              <div
                key={category.name}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CategoryGroup
                  category={category}
                  serverUrl={selectedServer}
                />
              </div>
            ))
          ) : (
            <div className="text-center py-24 animate-fade-in">
              <div className="max-w-md mx-auto glass-effect-strong p-10 rounded-2xl">
                <div className="mb-4">
                  <Search className="h-12 w-12 text-muted-foreground mx-auto opacity-50" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">Nenhum endpoint encontrado</h3>
                <p className="text-sm text-muted-foreground">Tente ajustar sua busca ou limpar os filtros</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
