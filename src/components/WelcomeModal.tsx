import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { getTotalEndpoints, getTotalCategories } from '@/data/mockApi';
import { useAudio } from '@/contexts/AudioContext';

export const WelcomeModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { audioRef } = useAudio();
  const totalEndpoints = getTotalEndpoints();
  const totalCategories = getTotalCategories();

  const playMusic = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.log('Autoplay prevented:', error);
      });
    }
  };

  const handleEnter = () => {
    playMusic();
    setIsOpen(false);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      playMusic();
    }
    setIsOpen(open);
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
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-md p-0 overflow-hidden border-0 bg-transparent shadow-none">
          <DialogTitle className="sr-only">Bem-vindo à Documentação da API Shinobu</DialogTitle>
          <DialogDescription className="sr-only">Explore {totalEndpoints} endpoints organizados em {totalCategories} categorias. Teste, documente e integre!</DialogDescription>
          
          <div className="border-4 border-primary bg-card">
            <div className="border-b-4 border-primary px-4 py-3 bg-gradient-to-r from-primary to-accent">
              <p className="font-mono font-black text-sm text-foreground tracking-widest text-center">
                BEM-VINDO
              </p>
            </div>

            <div className="p-6 space-y-5">
              <div className="flex justify-center">
                <div className="w-28 h-28 border-4 border-primary bg-gradient-to-br from-primary to-accent p-4 flex items-center justify-center">
                  <img 
                    src="https://i.ibb.co/XfThMhM9/vista-superior-do-inseto-em-forma-de-borboleta-preta.png" 
                    alt="Shinobu API Logo"
                    className="w-full h-full object-contain brightness-0 invert"
                  />
                </div>
              </div>

              <div className="flex justify-center">
                <div className="border-2 border-primary px-3 py-1 bg-primary/10 flex items-center gap-2">
                  <div className="w-2 h-2 bg-accent"></div>
                  <span className="font-mono font-black text-xs text-foreground tracking-widest">V5.0</span>
                </div>
              </div>

              <div className="border-l-4 border-primary pl-3 py-2">
                <h2 className="font-mono font-black text-xl text-foreground tracking-wide">
                  Documentação Pronta!
                </h2>
              </div>

              <div className="border-2 border-primary/50 p-3 bg-primary/5 space-y-2">
                <p className="font-mono text-sm text-foreground leading-relaxed">
                  Explore <span className="text-primary font-bold">{totalEndpoints} endpoints</span> organizados em <span className="text-accent font-bold">{totalCategories} categorias</span>.
                </p>
                <p className="font-mono text-sm text-muted-foreground">
                  Teste, documente e integre!
                </p>
              </div>

              <button
                onClick={handleEnter}
                className="w-full border-4 border-primary bg-primary hover:bg-primary/90 text-primary-foreground font-mono font-black py-3 px-4 text-sm tracking-widest transition-colors active:scale-95 flex items-center justify-center gap-2"
              >
                <span>ENTRAR</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>

              <div className="border-t-2 border-primary/30 pt-3">
                <p className="font-mono text-xs text-muted-foreground text-center tracking-wide">
                  {getCurrentDate()}
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
