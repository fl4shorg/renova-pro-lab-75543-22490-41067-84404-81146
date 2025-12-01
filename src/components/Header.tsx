export const Header = () => {
  return (
    <header className="mb-16 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
        <div className="w-16 h-16 border-3 border-primary bg-gradient-to-r from-primary to-accent flex items-center justify-center flex-shrink-0 p-3">
          <img 
            src="https://i.ibb.co/XfThMhM9/vista-superior-do-inseto-em-forma-de-borboleta-preta.png" 
            alt="Neext Logo"
            className="w-full h-full object-contain brightness-0 invert"
          />
        </div>
        
        <div className="flex-1 text-center sm:text-left">
          {/* Version Badge - Brutalist */}
          <div className="inline-flex items-center gap-2 px-3 py-2 border-2 border-primary text-[10px] font-black mb-4 uppercase tracking-widest bg-primary/10">
            <div className="w-2 h-2 bg-primary"></div>
            <span className="font-mono text-primary">LIVE DOCUMENTATION • V4.0</span>
          </div>
          
          {/* Main Title - Brutalist */}
          <h1 className="text-5xl sm:text-6xl font-black mb-3 font-mono tracking-widest text-foreground">
            SHINOBU API
          </h1>
          
          {/* Divider */}
          <div className="h-3 w-32 border-b-4 border-primary mb-6 mx-auto sm:mx-0"></div>
          
          {/* Description - Brutalist */}
          <div className="border-3 border-primary bg-primary/5 p-4 mb-6 max-w-3xl mx-auto sm:mx-0">
            <p className="font-mono text-xs leading-relaxed text-foreground">
              Plataforma completa de REST API com monitoramento de saúde em tempo real.
            </p>
            <p className="font-mono text-xs leading-relaxed text-foreground mt-2">
              Teste endpoints instantaneamente com nossa documentação interativa e veja atualizações de status ao vivo.
            </p>
          </div>

          {/* Social Links - Brutalist */}
          <div className="flex flex-col gap-2 items-center sm:items-start">
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
              <a
                href="https://whatsapp.com/channel/0029Vacb5xJKrWQpjjJgwi1z"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-primary bg-primary hover:bg-primary/90 text-primary-foreground font-mono font-bold py-2 px-3 text-xs tracking-widest transition-colors active:scale-95"
              >
                WHATSAPP CHANNEL
              </a>
            </div>
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
              <a
                href="https://instagram.com/neet.tk"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-accent bg-accent hover:bg-accent/90 text-foreground font-mono font-bold py-2 px-3 text-xs tracking-widest transition-colors active:scale-95"
              >
                INSTAGRAM
              </a>
              <a
                href="https://www.neext.online"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-primary bg-primary hover:bg-primary/90 text-primary-foreground font-mono font-bold py-2 px-3 text-xs tracking-widest transition-colors active:scale-95"
              >
                SITE OFICIAL
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
