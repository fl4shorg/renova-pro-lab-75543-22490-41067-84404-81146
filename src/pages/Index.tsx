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
      <Navbar onMenuClick={handleMenuClick} />
      
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 gradient-primary opacity-10 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 gradient-secondary opacity-10 blur-3xl rounded-full"></div>
      </div>

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

        <div className="flex flex-col items-center mb-8 animate-fade-in gap-4">
          {/* Visitantes Card */}
          <div className="group relative overflow-hidden rounded-2xl backdrop-blur-xl bg-gradient-to-br from-purple-900/20 via-slate-900/40 to-cyan-900/20 border-2 border-purple-500/30 hover:border-cyan-400/50 transition-all duration-300 px-6 py-5 shadow-lg hover:shadow-purple-500/20 w-full max-w-md">
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
              
              <p className="text-center text-slate-300/70 text-sm">
                Seja bem-vindo, aproveite! ✨
              </p>
            </div>
          </div>
          
          {/* IP Info Card */}
          <div className="group relative overflow-hidden rounded-2xl backdrop-blur-xl bg-gradient-to-br from-cyan-900/20 via-slate-900/40 to-purple-900/20 border-2 border-cyan-500/30 hover:border-purple-400/50 transition-all duration-300 px-6 py-5 shadow-lg hover:shadow-cyan-500/20 w-full max-w-md">
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
                <p className="text-slate-300/70 text-sm">Seu IP:</p>
                <p className="text-white font-mono text-lg font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
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

        {/* License & Usage Section */}
        <div className="mt-12 mb-12 animate-fade-in">
          <div className="relative rounded-xl bg-slate-900/50 border border-slate-700 p-6 max-w-xl mx-auto">
            <h2 className="text-xl font-bold mb-3 text-gray-100">
              Licença & Uso
            </h2>
            
            <p className="text-gray-300 text-sm leading-relaxed mb-5">
              Esta API é gratuita para uso em projetos pessoais e comerciais. Pedimos apenas que você a use com responsabilidade e não abuse do serviço.
            </p>
            
            <div className="flex flex-col gap-2 mb-0">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800/50 border border-slate-700">
                <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-300 text-sm">Sem Autenticação Necessária</span>
              </div>
              
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800/50 border border-slate-700">
                <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-300 text-sm">Sem Limite de Requisições</span>
              </div>
              
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800/50 border border-slate-700">
                <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-300 text-sm">Grátis Para Sempre</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer Section */}
        <div className="mt-8 mb-12 text-center animate-fade-in">
          <p className="text-gray-400 text-sm mb-1">
            Obrigado a todos os usuários e contribuidores.
          </p>
          <p className="text-gray-500 text-xs">
            © Neext Ltda. | Todos os direitos reservados.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Index;
