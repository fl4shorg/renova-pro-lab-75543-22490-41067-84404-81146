import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronRight, Download, Search, MessageSquare, Image, Sticker, 
  Newspaper, Sparkles, UserSearch, Wand2, Heart, Shuffle, Video, Clapperboard, 
  Calendar, Brain, Palette, FileQuestion, Flame, Film, Signature, Shield, 
  Wrench, AppWindow, Play
} from 'lucide-react';
import { ApiCategory, ApiEndpoint } from '@/types/api';
import { cn } from '@/lib/utils';

const getCategoryIcon = (categoryName: string) => {
  const iconMap: Record<string, any> = {
    'Download': Download,
    'Pesquisa': Search,
    'Frases': MessageSquare,
    'Wallpaper': Image,
    'Figurinhas': Sticker,
    'Jornal': Newspaper,
    'Anime': Sparkles,
    'Stalker': UserSearch,
    'ephoto360': Wand2,
    'metadinha': Heart,
    'Hentai': Video,
    'Random': Shuffle,
    'nsfwhub': Play,
    'sfmcompile': Clapperboard,
    'IA': Brain,
    'Canvas': Palette,
    'Consultas': FileQuestion,
    'FlamingText': Flame,
    'IMDB': Film,
    'Plaquinha': Signature,
    'Textpro': Shield,
    'Tools': Wrench,
  };
  
  return iconMap[categoryName] || AppWindow;
};

interface CategorySidebarProps {
  categories: ApiCategory[];
  onRouteClick: (endpoint: ApiEndpoint) => void;
  serverUrl: string;
  isOpen: boolean;
  onClose: () => void;
}

export const CategorySidebar = ({ categories, onRouteClick, serverUrl, isOpen, onClose }: CategorySidebarProps) => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getBrasiliaTime = () => {
    const brasiliaOffset = -3;
    const utc = currentTime.getTime() + (currentTime.getTimezoneOffset() * 60000);
    const brasiliaTime = new Date(utc + (3600000 * brasiliaOffset));
    
    const day = brasiliaTime.getDate().toString().padStart(2, '0');
    const month = (brasiliaTime.getMonth() + 1).toString().padStart(2, '0');
    const year = brasiliaTime.getFullYear();
    const hours = brasiliaTime.getHours().toString().padStart(2, '0');
    const minutes = brasiliaTime.getMinutes().toString().padStart(2, '0');
    const seconds = brasiliaTime.getSeconds().toString().padStart(2, '0');
    
    return {
      date: `${day}/${month}/${year}`,
      time: `${hours}:${minutes}:${seconds}`
    };
  };

  const { date, time } = getBrasiliaTime();

  const handleCategoryClick = (category: ApiCategory) => {
    const slug = category.name.toLowerCase().replace(/\s+/g, '-');
    navigate(`/category/${encodeURIComponent(slug)}`);
    onClose();
  };

  return (
    <>
      <div
        className={cn(
          "fixed top-0 left-0 h-full w-64 glass-effect-strong shadow-2xl z-[60] transition-transform duration-300 ease-in-out overflow-hidden",
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
                <h1 className="text-xl sm:text-2xl font-black tracking-tight gradient-text">Shinobu API</h1>
                <p className="text-xs text-muted-foreground mt-0.5">Documentação v5.0</p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <Calendar className="w-3 h-3 text-primary/70" />
                  <span className="text-[10px] text-muted-foreground font-mono">
                    {date} • {time}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto space-y-1 pr-2 custom-scrollbar">
            {categories.map((category) => (
              <div key={category.name} className="mb-1">
                <button
                  onClick={() => handleCategoryClick(category)}
                  className="w-full group/item p-3 rounded-lg text-left transition-all duration-200 hover:glass-effect"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {(() => {
                        const IconComponent = getCategoryIcon(category.name);
                        return <IconComponent className="w-4 h-4 text-primary/70 group-hover/item:text-primary transition-colors" />;
                      })()}
                      <p className="font-bold text-sm text-foreground group-hover/item:text-primary transition-colors">
                        {category.name}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] px-2.5 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 font-mono font-bold border border-cyan-500/30 shadow-sm">
                        {category.endpoints.length}
                      </span>
                      <ChevronRight className="w-4 h-4 text-muted-foreground group-hover/item:text-primary transition-colors" />
                    </div>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[55] transition-opacity duration-300"
          onClick={onClose}
        />
      )}
    </>
  );
};
