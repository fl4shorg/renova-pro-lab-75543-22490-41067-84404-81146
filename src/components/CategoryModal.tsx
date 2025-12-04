import { useState, useMemo, useEffect } from 'react';
import { Search, Home, ChevronRight } from 'lucide-react';
import { ApiCategory, ApiEndpoint } from '@/types/api';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ScrollArea } from '@/components/ui/scroll-area';

interface CategoryModalProps {
  category: ApiCategory | null;
  isOpen: boolean;
  onClose: () => void;
  onEndpointClick: (endpoint: ApiEndpoint) => void;
}

export const CategoryModal = ({ category, isOpen, onClose, onEndpointClick }: CategoryModalProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (isOpen) {
      setSearchQuery('');
    }
  }, [isOpen, category]);

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

  const handleEndpointClick = (endpoint: ApiEndpoint) => {
    onEndpointClick(endpoint);
    onClose();
  };

  if (!category) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[85vh] p-0 gap-0 glass-effect-strong border-border/50 overflow-hidden z-[100]">
        <DialogHeader className="p-4 sm:p-6 pb-0 space-y-4">
          <DialogTitle className="sr-only">{category.name} - Endpoints</DialogTitle>
          <DialogDescription className="sr-only">
            Lista de endpoints da categoria {category.name}
          </DialogDescription>
          
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Home className="w-4 h-4" />
            <span className="hover:text-foreground cursor-pointer transition-colors">Home</span>
            <ChevronRight className="w-4 h-4" />
            <span className="hover:text-foreground cursor-pointer transition-colors">Category</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground font-semibold">{category.name}</span>
          </nav>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search endpoints..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-background/50 border-border/50 focus:border-primary/50"
            />
          </div>
        </DialogHeader>

        <ScrollArea className="flex-1 max-h-[calc(85vh-140px)] px-4 sm:px-6 py-4">
          {filteredEndpoints.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Search className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Nenhum endpoint encontrado</p>
              <p className="text-sm mt-1">Tente uma busca diferente</p>
            </div>
          ) : (
            <Accordion type="multiple" className="space-y-2">
              {filteredEndpoints.map((endpoint) => (
                <AccordionItem 
                  key={endpoint.id} 
                  value={endpoint.id}
                  className="border border-border/30 rounded-lg overflow-hidden bg-background/30 hover:bg-accent/10 transition-colors"
                >
                  <AccordionTrigger className="px-4 py-3 hover:no-underline group">
                    <div className="flex items-center gap-3 text-left flex-1">
                      <span className={cn(
                        "text-xs px-2 py-1 rounded font-mono font-bold shrink-0",
                        endpoint.method === 'GET' ? "bg-green-500/20 text-green-500" :
                        endpoint.method === 'POST' ? "bg-blue-500/20 text-blue-500" :
                        endpoint.method === 'PUT' ? "bg-yellow-500/20 text-yellow-500" :
                        "bg-red-500/20 text-red-500"
                      )}>
                        {endpoint.method}
                      </span>
                      <span className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                        {endpoint.alias}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-muted/50 font-mono text-sm overflow-x-auto">
                        <code className="text-primary/80">{endpoint.path}</code>
                      </div>
                      
                      {endpoint.description && (
                        <p className="text-sm text-muted-foreground">
                          {endpoint.description}
                        </p>
                      )}

                      {endpoint.parameters && endpoint.parameters.length > 0 && (
                        <div className="space-y-2">
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            Parâmetros
                          </p>
                          <div className="space-y-1">
                            {endpoint.parameters.map((param) => (
                              <div 
                                key={param.name}
                                className="flex items-center gap-2 text-sm"
                              >
                                <code className="px-1.5 py-0.5 rounded bg-primary/10 text-primary text-xs font-mono">
                                  {param.name}
                                </code>
                                {param.required && (
                                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-red-500/20 text-red-400 font-bold">
                                    obrigatório
                                  </span>
                                )}
                                <span className="text-muted-foreground text-xs">
                                  {param.description}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <button
                        onClick={() => handleEndpointClick(endpoint)}
                        className="w-full mt-2 px-4 py-2.5 rounded-lg gradient-primary text-white font-semibold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                      >
                        Testar Endpoint
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </ScrollArea>

        <div className="p-4 sm:p-6 pt-0 border-t border-border/30 mt-2">
          <p className="text-xs text-muted-foreground text-center">
            {filteredEndpoints.length} de {category.endpoints.length} endpoints
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
