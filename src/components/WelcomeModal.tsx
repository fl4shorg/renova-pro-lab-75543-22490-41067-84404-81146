import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

export const WelcomeModal = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleEnter = () => {
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
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-sm bg-background border-2 border-primary/20 p-0 overflow-hidden">
        <div className="flex flex-col items-center text-center p-6">
          <div className="relative w-32 h-32 mb-4 flex items-center justify-center">
            <div className="absolute inset-0 gradient-primary rounded-3xl blur-2xl opacity-60 animate-shimmer" 
                 style={{ backgroundSize: '200% 100%' }}></div>
            <div className="relative w-32 h-32 gradient-primary rounded-3xl p-4 shadow-glow">
              <img 
                src="https://i.ibb.co/XfThMhM9/vista-superior-do-inseto-em-forma-de-borboleta-preta.png" 
                alt="Shinobu API Logo"
                className="w-full h-full object-contain brightness-0 invert"
              />
            </div>
          </div>

          <h2 className="text-3xl font-black mb-3 text-foreground">
            Documentação Pronta! 🚀
          </h2>

          <p className="text-sm text-muted-foreground mb-6 max-w-xs leading-relaxed">
            Explore 359 endpoints organizados em 14 categorias. Teste, documente e integre!
          </p>

          <button
            onClick={handleEnter}
            className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
          >
            Entrar
          </button>

          <div className="mt-4 w-full">
            <p className="text-xs text-muted-foreground/70">
              {getCurrentDate()}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
