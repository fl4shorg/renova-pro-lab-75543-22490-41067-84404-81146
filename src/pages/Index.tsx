import { useState, useRef, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Header } from '@/components/Header';
import { ServerSelector } from '@/components/ServerSelector';
import { StatsDisplay } from '@/components/StatsDisplay';
import { CategorySidebar } from '@/components/CategorySidebar';
import { ApiEndpoint as ApiEndpointComponent } from '@/components/ApiEndpoint';
import { WelcomeModal } from '@/components/WelcomeModal';
import { MusicPlayer } from '@/components/MusicPlayer';
import { servers, apiCategories, getTotalEndpoints, getTotalCategories } from '@/data/mockApi';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { ApiEndpoint } from '@/types/api';

const Index = () => {
  const [selectedServer, setSelectedServer] = useState(servers[0].url);
  const [selectedEndpoint, setSelectedEndpoint] = useState<ApiEndpoint | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userIp, setUserIp] = useState<string>('Carregando...');
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

    // Fetch user IP
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => setUserIp(data.ip))
      .catch(() => setUserIp('Não disponível'));

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
      <WelcomeModal />
      <Navbar onMenuClick={handleMenuClick} />
      
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 gradient-primary opacity-10 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 gradient-secondary opacity-10 blur-3xl rounded-full"></div>
      </div>

      <main className="relative max-w-6xl mx-auto px-4 sm:px-8 py-4 sm:py-8 mt-16">
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

        <div className="flex flex-col items-center mb-8 animate-fade-in gap-4">
          {/* Music Player */}
          <MusicPlayer />

          {/* Visitantes Card - Brutalist */}
          <div className="w-full max-w-md border-3 border-primary bg-card animate-fade-in">
            {/* Header */}
            <div className="border-b-3 border-primary px-3 py-2 bg-gradient-to-r from-primary to-accent">
              <p className="font-mono font-black text-xs text-foreground tracking-widest">
                VISITANTES DIÁRIOS
              </p>
            </div>

            {/* Content */}
            <div className="p-3 space-y-3">
              {/* Counter Display */}
              <div className="border-2 border-primary bg-primary/10 p-3 text-center">
                <p className="font-mono text-2xl font-black text-primary">
                  <div id="sfcekxwgseaee5p6xxgjukejkbdy47xdxzt"></div>
                </p>
              </div>

              {/* Message */}
              <div className="border-2 border-primary/50 px-3 py-2">
                <p className="font-mono text-xs text-foreground text-center">
                  Seja bem-vindo, aproveite!
                </p>
              </div>
            </div>
          </div>
          
          {/* IP Info Card - Brutalist */}
          <div className="w-full max-w-md border-3 border-accent bg-card animate-fade-in">
            {/* Header */}
            <div className="border-b-3 border-accent px-3 py-2 bg-gradient-to-r from-accent to-primary">
              <p className="font-mono font-black text-xs text-foreground tracking-widest">
                INFORMAÇÕES DE CONEXÃO
              </p>
            </div>

            {/* Content */}
            <div className="p-3 space-y-3">
              {/* IP Display */}
              <div className="border-2 border-accent bg-accent/10 p-3">
                <div className="flex items-center justify-between">
                  <p className="font-mono font-bold text-xs text-foreground uppercase">Seu IP:</p>
                  <p className="font-mono text-sm font-black text-accent">
                    {userIp}
                  </p>
                </div>
              </div>

              {/* Status Indicator */}
              <div className="border-2 border-accent/50 px-2 py-2 flex items-center gap-2">
                <div className="w-2 h-2 bg-accent"></div>
                <span className="font-mono text-xs font-bold text-foreground uppercase">
                  CONECTADO
                </span>
              </div>
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

        {/* License & Usage Section - Brutalist */}
        <div className="mt-6 mb-4 max-w-xl mx-auto animate-fade-in">
          <div className="border-3 border-primary bg-card">
            {/* Header */}
            <div className="border-b-3 border-primary px-4 py-3 bg-gradient-to-r from-primary to-accent">
              <p className="font-mono font-black text-sm text-foreground tracking-widest">LICENÇA & USO</p>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
              {/* Description */}
              <div className="border-2 border-primary/50 p-3">
                <p className="font-mono text-xs text-foreground leading-relaxed">
                  Esta API é gratuita para uso em projetos pessoais e comerciais. Pedimos apenas que você a use com responsabilidade e não abuse do serviço.
                </p>
              </div>

              {/* Features */}
              <div className="space-y-2">
                <div className="border-2 border-primary px-3 py-2 flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary"></div>
                  <span className="font-mono text-xs font-bold text-foreground uppercase">Sem Autenticação Necessária</span>
                </div>
                
                <div className="border-2 border-primary px-3 py-2 flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary"></div>
                  <span className="font-mono text-xs font-bold text-foreground uppercase">Sem Limite de Requisições</span>
                </div>
                
                <div className="border-2 border-primary px-3 py-2 flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary"></div>
                  <span className="font-mono text-xs font-bold text-foreground uppercase">Grátis Para Sempre</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer Section - Brutalist */}
        <div className="mt-4 pb-4 animate-fade-in">
          <div className="border-3 border-accent max-w-xl mx-auto bg-card">
            {/* Header */}
            <div className="border-b-3 border-accent px-4 py-3 bg-gradient-to-r from-accent to-primary">
              <p className="font-mono font-black text-sm text-foreground tracking-widest">CRÉDITOS</p>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3 text-center">
              <p className="font-mono text-xs text-foreground">
                Obrigado a todos os usuários e contribuidores.
              </p>
              
              <div className="border-2 border-accent/50 px-3 py-2">
                <p className="font-mono font-black text-xs text-accent tracking-wide">
                  © NEEXT LTDA. | TODOS OS DIREITOS RESERVADOS.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
