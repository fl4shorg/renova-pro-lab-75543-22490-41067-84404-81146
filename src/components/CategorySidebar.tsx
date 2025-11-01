import { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBiohazard } from '@fortawesome/free-solid-svg-icons';
import { ApiCategory, ApiEndpoint } from '@/types/api';
import { cn } from '@/lib/utils';

interface CategorySidebarProps {
  categories: ApiCategory[];
  onRouteClick: (endpoint: ApiEndpoint) => void;
  serverUrl: string;
}

export const CategorySidebar = ({ categories, onRouteClick, serverUrl }: CategorySidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const toggleCategory = (categoryName: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryName)) {
      newExpanded.delete(categoryName);
    } else {
      newExpanded.add(categoryName);
    }
    setExpandedCategories(newExpanded);
  };

  const handleRouteClick = (endpoint: ApiEndpoint) => {
    onRouteClick(endpoint);
    setIsOpen(false);
  };

  return (
    <>
      {!isOpen && (
        <div className="mb-4">
          <button
            onClick={() => setIsOpen(true)}
            className="p-3 rounded-xl glass-effect-strong hover-lift transition-smooth group"
            aria-label="Toggle menu"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-lg blur-md group-hover:blur-lg transition-smooth"></div>
              <div className="relative">
                <FontAwesomeIcon icon={faBiohazard} className="w-6 h-6 text-primary" />
              </div>
            </div>
          </button>
        </div>
      )}

      <div
        className={cn(
          "fixed top-0 left-0 h-full w-80 sm:w-96 glass-effect-strong shadow-2xl z-40 transition-transform duration-300 ease-in-out overflow-hidden",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="absolute inset-0 gradient-primary opacity-5"></div>
        
        <div className="relative h-full flex flex-col pb-6 px-4 sm:px-6">
          <div className="pt-6 pb-4 mb-4 border-b border-border/50">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0">
                <div className="absolute inset-0 gradient-primary rounded-2xl blur-lg opacity-60"></div>
                <div className="relative w-full h-full gradient-primary rounded-2xl p-2.5 sm:p-3 shadow-elegant">
                  <img 
                    src="https://i.ibb.co/XfThMhM9/vista-superior-do-inseto-em-forma-de-borboleta-preta.png" 
                    alt="Neext Logo"
                    className="w-full h-full object-contain brightness-0 invert"
                  />
                </div>
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-black tracking-tight gradient-text">Neext APIs</h1>
                <p className="text-xs text-muted-foreground mt-0.5">Documentação v3.0</p>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto space-y-1 pr-2 custom-scrollbar">
            {categories.map((category) => (
              <div key={category.name} className="mb-1">
                <button
                  onClick={() => toggleCategory(category.name)}
                  className="w-full group/item p-3 rounded-lg text-left transition-all duration-200 hover:glass-effect"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ChevronDown className={cn(
                        "w-4 h-4 transition-transform text-muted-foreground",
                        expandedCategories.has(category.name) ? "rotate-0" : "-rotate-90"
                      )} />
                      <p className="font-bold text-sm text-foreground group-hover/item:text-primary transition-colors">
                        {category.name}
                      </p>
                    </div>
                    <span className="text-[10px] px-2 py-1 rounded-full bg-accent/50 text-muted-foreground font-mono">
                      {category.endpoints.length}
                    </span>
                  </div>
                </button>
                
                {expandedCategories.has(category.name) && (
                  <div className="ml-4 mt-1 space-y-0.5 border-l-2 border-border/30 pl-2">
                    {category.endpoints.map((endpoint) => (
                      <button
                        key={endpoint.id}
                        onClick={() => handleRouteClick(endpoint)}
                        className="w-full text-left p-2 rounded-md hover:bg-accent/50 transition-colors group/route"
                      >
                        <div className="flex items-center gap-2">
                          <span className={cn(
                            "text-[10px] px-1.5 py-0.5 rounded font-mono font-bold",
                            endpoint.method === 'GET' ? "bg-green-500/20 text-green-600 dark:text-green-400" :
                            endpoint.method === 'POST' ? "bg-blue-500/20 text-blue-600 dark:text-blue-400" :
                            "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400"
                          )}>
                            {endpoint.method}
                          </span>
                          <span className="text-xs text-foreground group-hover/route:text-primary transition-colors truncate flex-1">
                            {endpoint.alias}
                          </span>
                          <ChevronRight className="w-3 h-3 text-muted-foreground opacity-0 group-hover/route:opacity-100 transition-opacity flex-shrink-0" />
                        </div>
                        <p className="text-[10px] text-muted-foreground font-mono mt-0.5 ml-12 truncate">
                          {endpoint.path}
                        </p>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-border/50">
            <div className="glass-effect p-3 rounded-lg text-center">
              <p className="text-xs text-muted-foreground">
                Total: <span className="font-bold text-primary">{categories.length}</span> categorias
              </p>
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};
