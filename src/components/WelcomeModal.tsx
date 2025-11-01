import { useState, useRef } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

export const WelcomeModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleEnter = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.log('Autoplay prevented:', error);
      });
    }
    setIsOpen(false);
  };

  const getCurrentDate = () => {
    const days = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];
    const months = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
    
    const now = new Date();
    const dayName = days[now.getDay()];
    const day = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    
    return `${dayName}, ${day} de ${month} de ${year}`;
  };

  return (
    <>
      <audio ref={audioRef} src="/assets/welcome-music.m4a" preload="auto" loop />
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md glass-effect-strong border-2 border-primary/30 p-0 overflow-hidden shadow-2xl">
        <div className="absolute inset-0 gradient-primary opacity-5 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-32 h-32 gradient-primary opacity-20 blur-3xl rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 gradient-primary opacity-20 blur-3xl rounded-full pointer-events-none"></div>
        
        <div className="relative flex flex-col items-center text-center p-8">
          <div className="relative w-36 h-36 mb-6 flex items-center justify-center">
            <div className="absolute inset-0 gradient-primary rounded-3xl blur-2xl opacity-70 animate-shimmer" 
                 style={{ backgroundSize: '200% 100%' }}></div>
            <div className="relative w-36 h-36 gradient-primary rounded-3xl p-5 shadow-glow hover:scale-105 transition-bounce">
              <img 
                src="https://i.ibb.co/XfThMhM9/vista-superior-do-inseto-em-forma-de-borboleta-preta.png" 
                alt="Shinobu API Logo"
                className="w-full h-full object-contain brightness-0 invert animate-pulse"
                style={{ animationDuration: '3s' }}
              />
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-effect border border-primary/30 text-[10px] font-black mb-4 uppercase tracking-widest shadow-elegant">
            <div className="w-1.5 h-1.5 rounded-full gradient-primary shadow-glow animate-pulse"></div>
            <span className="text-gradient">v4.0</span>
          </div>

          <h2 className="text-4xl font-black mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Documentação Pronta! 🚀
          </h2>

          <p className="text-sm text-muted-foreground mb-6 max-w-sm leading-relaxed">
            Explore <span className="text-primary font-bold">359 endpoints</span> organizados em <span className="text-primary font-bold">14 categorias</span>. Teste, documente e integre!
          </p>

          <button
            onClick={handleEnter}
            className="group relative px-10 py-3.5 rounded-xl overflow-hidden font-bold shadow-elegant hover:shadow-glow transition-smooth hover:scale-105 mb-5"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 group-hover:from-red-700 group-hover:to-red-600"></div>
            <span className="relative text-white z-10 flex items-center gap-2">
              Entrar 
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>

          <div className="w-full pt-4 border-t border-border/30">
            <p className="text-xs text-muted-foreground/70 font-mono">
              {getCurrentDate()}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
    </>
  );
};
