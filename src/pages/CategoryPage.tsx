import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Search, Home, ChevronRight, ChevronDown, Menu } from 'lucide-react';
import { apiCategories, servers } from '@/data/mockApi';
import { ApiEndpoint } from '@/types/api';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { ApiEndpoint as ApiEndpointComponent } from '@/components/ApiEndpoint';
import { CategorySidebar } from '@/components/CategorySidebar';

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedEndpoints, setExpandedEndpoints] = useState<Set<string>>(new Set());
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedServer] = useState(servers[0].url);

  const category = useMemo(() => {
    if (!slug) return null;
    const decodedSlug = decodeURIComponent(slug);
    return apiCategories.find(cat => 
      cat.name.toLowerCase() === decodedSlug.toLowerCase() ||
      cat.name.toLowerCase().replace(/\s+/g, '-') === decodedSlug.toLowerCase()
    );
  }, [slug]);

  const filteredEndpoints = useMemo(() => {
    if (!category) return [];
    if (!searchQuery.trim()) return category.endpoints;
    
    const query = searchQuery.toLowerCase();
    return category.endpoints.filter(endpoint => 
      endpoint.alias.toLowerCase().includes(query) ||
      endpoint.path.toLowerCase().includes(query) ||
      endpoint.description?.toLowerCase().includes(query)
    );
  }, [category, searchQuery]);

  const toggleEndpoint = (endpointId: string) => {
    const newExpanded = new Set(expandedEndpoints);
    if (newExpanded.has(endpointId)) {
      newExpanded.delete(endpointId);
    } else {
      newExpanded.add(endpointId);
    }
    setExpandedEndpoints(newExpanded);
  };

  const handleRouteClick = (endpoint: ApiEndpoint) => {
    const categorySlug = endpoint.category.toLowerCase().replace(/\s+/g, '-');
    navigate(`/category/${categorySlug}`);
    setIsSidebarOpen(false);
  };

  if (!category) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Categoria não encontrada</h1>
          <button 
            onClick={() => navigate('/')}
            className="text-primary hover:underline"
          >
            Voltar para o início
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <CategorySidebar 
        categories={apiCategories} 
        onRouteClick={handleRouteClick}
        serverUrl={selectedServer}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-accent/50 transition-colors"
            >
              <Menu className="w-6 h-6 text-foreground" />
            </button>
            
            <nav className="flex items-center gap-2 text-sm">
              <button 
                onClick={() => navigate('/')}
                className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </button>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">Category</span>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground font-semibold">{category.name}</span>
            </nav>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Buscar endpoints..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-6 text-base bg-background border-border/50 rounded-xl"
            />
          </div>
        </div>

        {filteredEndpoints.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <Search className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg">Nenhum endpoint encontrado</p>
            <p className="text-sm mt-1">Tente uma busca diferente</p>
          </div>
        ) : (
          <div className="bg-card border border-border/50 rounded-xl overflow-hidden divide-y divide-border/50">
            {filteredEndpoints.map((endpoint) => (
              <div key={endpoint.id}>
                <button
                  onClick={() => toggleEndpoint(endpoint.id)}
                  className="w-full px-5 py-4 flex items-center gap-3 hover:bg-accent/20 transition-colors"
                >
                  <ChevronDown className={cn(
                    "w-5 h-5 text-muted-foreground transition-transform shrink-0",
                    expandedEndpoints.has(endpoint.id) ? "rotate-0" : "-rotate-90"
                  )} />
                  <div className="flex-1 text-left">
                    <span className="font-semibold text-foreground block">
                      {endpoint.alias}
                    </span>
                    <code className="text-sm text-muted-foreground font-mono">
                      {endpoint.path}
                    </code>
                  </div>
                  <span className={cn(
                    "text-xs px-4 py-1.5 rounded-full font-bold shrink-0 text-white",
                    endpoint.method === 'GET' ? "bg-gradient-to-r from-cyan-500 to-purple-500" :
                    endpoint.method === 'POST' ? "bg-gradient-to-r from-blue-500 to-indigo-500" :
                    "bg-gradient-to-r from-yellow-500 to-orange-500"
                  )}>
                    {endpoint.method}
                  </span>
                </button>

                {expandedEndpoints.has(endpoint.id) && (
                  <div className="px-5 pb-5 pt-2 border-t border-border/30 animate-fade-in">
                    <ApiEndpointComponent 
                      endpoint={endpoint}
                      serverUrl={selectedServer}
                      inline={true}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            {filteredEndpoints.length} de {category.endpoints.length} endpoints
          </p>
        </div>
      </main>
    </div>
  );
};

export default CategoryPage;
