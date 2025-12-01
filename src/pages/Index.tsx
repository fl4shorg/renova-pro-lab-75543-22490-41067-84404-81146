import { useState, useRef, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Header } from '@/components/Header';
import { ServerSelector } from '@/components/ServerSelector';
import { StatsDisplay } from '@/components/StatsDisplay';
import { CategorySidebar } from '@/components/CategorySidebar';
import { ApiEndpoint as ApiEndpointComponent } from '@/components/ApiEndpoint';
import { WelcomeModal } from '@/components/WelcomeModal';
import { MusicPlayer } from '@/components/MusicPlayer';
import { SystemMonitor } from '@/components/SystemMonitor';
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
    <div className="min-h-screen bg-background font-sans relative overflow-hidden" style={{backgroundImage: "url('/assets/background.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed'}}>
      <WelcomeModal />
      <Navbar onMenuClick={handleMenuClick} />
      
      {/* Background overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
      
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 gradient-primary opacity-5 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 gradient-secondary opacity-5 blur-3xl rounded-full"></div>
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

          {/* System Monitor */}
          <SystemMonitor />

          {/* Visitantes Card */}
          <div className="group relative overflow-hidden rounded-2xl backdrop-blur-xl glass-effect-strong border-2 border-purple-500/30 hover:border-cyan-400/50 transition-all duration-300 px-6 py-5 shadow-lg hover:shadow-purple-500/20 w-full max-w-md">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-3">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-purple-400/30 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-sm font-bold font-sans bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent tracking-wide">
                  VISITANTES DIÁRIOS
                </h3>
              </div>
              
              <div className="flex justify-center items-center mb-3 text-3xl font-bold">
                <div id="sfcekxwgseaee5p6xxgjukejkbdy47xdxzt"></div>
              </div>
              
              <p className="text-center text-muted-foreground text-sm">
                Seja bem-vindo, aproveite! ✨
              </p>
            </div>
          </div>
          
          {/* IP Info Card */}
          <div className="group relative overflow-hidden rounded-2xl backdrop-blur-xl glass-effect-strong border-2 border-cyan-500/30 hover:border-purple-400/50 transition-all duration-300 px-6 py-5 shadow-lg hover:shadow-cyan-500/20 w-full max-w-md">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-3">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-sm font-bold font-sans bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent tracking-wide">
                  INFORMAÇÕES DE CONEXÃO
                </h3>
              </div>
              
              <div className="flex items-center justify-center gap-2">
                <p className="text-muted-foreground text-sm">Seu IP:</p>
                <p className="text-foreground font-mono text-lg font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  {userIp}
                </p>
                <div className="ml-2">
                  <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                  </svg>
                </div>
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

        {/* License & Usage Section - Brutalist Style */}
        <div className="mt-6 mb-2 animate-fade-in">
          <div className="border-4 border-primary bg-card max-w-2xl mx-auto">
            {/* Header */}
            <div className="border-b-4 border-primary px-4 py-3 bg-gradient-to-r from-primary to-accent">
              <h2 className="font-mono font-black text-sm text-foreground tracking-widest">
                LICENÇA & USO
              </h2>
            </div>

            {/* Content */}
            <div className="p-4 space-y-4">
              {/* Main Description */}
              <p className="font-mono text-sm text-foreground leading-relaxed border-l-4 border-primary pl-3">
                Esta API é gratuita para uso em projetos pessoais e comerciais. Pedimos apenas que você a use com responsabilidade e não abuse do serviço.
              </p>

              {/* Features Box */}
              <div className="border-2 border-primary p-3 space-y-2 bg-primary/5">
                <div className="flex items-center gap-3 border-b-2 border-primary/30 pb-2">
                  <div className="w-2 h-2 bg-primary"></div>
                  <span className="font-mono font-bold text-sm text-foreground">SEM AUTENTICAÇÃO NECESSÁRIA</span>
                </div>
                <div className="flex items-center gap-3 border-b-2 border-primary/30 pb-2">
                  <div className="w-2 h-2 bg-accent"></div>
                  <span className="font-mono font-bold text-sm text-foreground">SEM LIMITE DE REQUISIÇÕES</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary"></div>
                  <span className="font-mono font-bold text-sm text-foreground">GRÁTIS PARA SEMPRE</span>
                </div>
              </div>

              {/* Thanks & Copyright */}
              <div className="border-t-2 border-primary pt-3 space-y-2">
                <p className="font-mono text-xs text-muted-foreground">
                  Obrigado a todos os usuários e contribuidores.
                </p>
                <div className="border-2 border-primary/50 px-3 py-2 bg-primary/5">
                  <p className="font-mono font-bold text-xs text-foreground tracking-wide">
                    © NEEXT LTDA. | TODOS OS DIREITOS RESERVADOS
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
