import { useState, memo, lazy, Suspense } from 'react';
import { ChevronDown, Folder } from 'lucide-react';
import { ApiCategory } from '@/types/api';
import { Skeleton } from '@/components/ui/skeleton';
import { useScrollReveal } from '@/hooks/useScrollReveal';
const ApiEndpoint = lazy(() => import('./ApiEndpoint').then(m => ({ default: m.ApiEndpoint })));

interface CategoryGroupProps {
  category: ApiCategory;
  serverUrl: string;
}

const CategoryGroupComponent = ({ category, serverUrl }: CategoryGroupProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const categoryRef = useScrollReveal(0.1, '50px');

  return (
    <div 
      ref={categoryRef}
      className="relative group glass-effect-strong rounded-2xl shadow-card hover-lift overflow-hidden content-visibility-auto scroll-reveal"
      style={{ contentVisibility: 'auto', containIntrinsicSize: '1px 600px' }}
    >
      {/* Decorative gradient on hover */}
      <div className="absolute inset-0 gradient-primary opacity-0 group-hover:opacity-5 transition-smooth pointer-events-none"></div>
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-full px-7 py-6 text-left flex items-center justify-between hover:bg-accent/5 transition-smooth group/btn"
      >
        <h2 className="font-black flex items-center gap-4 font-sans">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-xl blur-md group-hover/btn:blur-lg transition-smooth"></div>
            <div className="relative p-2.5 rounded-xl gradient-primary shadow-elegant group-hover/btn:scale-110 transition-bounce">
              <Folder className="w-5 h-5 text-primary-foreground" />
            </div>
          </div>
          <span className="text-base group-hover/btn:text-primary transition-smooth tracking-tight font-extrabold">{category.name}</span>
          <span className="text-[10px] px-3 py-1.5 rounded-full gradient-accent text-foreground font-bold font-mono uppercase tracking-wider flex-shrink-0 shadow-sm">
            {category.endpoints.length} {category.endpoints.length === 1 ? 'endpoint' : 'endpoints'}
          </span>
        </h2>
        <ChevronDown 
          className={`w-6 h-6 transition-bounce text-muted-foreground group-hover/btn:text-primary ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="content-visibility-auto relative" style={{ contentVisibility: 'auto', containIntrinsicSize: '1px 500px' }}>
          {category.endpoints.map((endpoint) => (
            <div key={endpoint.id} className="content-visibility-auto" style={{ contentVisibility: 'auto', containIntrinsicSize: '1px 220px' }}>
              <Suspense fallback={<div className="p-4"><Skeleton className="h-28 w-full rounded-xl" /></div>}>
                <ApiEndpoint 
                  endpoint={endpoint} 
                  serverUrl={serverUrl}
                />
              </Suspense>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const CategoryGroup = memo(CategoryGroupComponent);
