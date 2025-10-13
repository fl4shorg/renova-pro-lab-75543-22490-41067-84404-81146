import { useLocation, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const contentRef = useScrollReveal();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background font-sans relative overflow-hidden">
      {/* Background decorative elements - matching main page */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 gradient-primary opacity-10 blur-3xl rounded-full animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 gradient-secondary opacity-10 blur-3xl rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] gradient-primary opacity-5 blur-3xl rounded-full"></div>
      </div>

      <main className="relative max-w-6xl mx-auto px-4 sm:px-8 py-12 sm:py-24">
        <div ref={contentRef} className="scroll-reveal">
          <div className="text-center space-y-8 animate-fade-in">
            {/* Logo - same as main page */}
            <div className="flex justify-center mb-4">
              <div className="relative w-24 h-24 flex items-center justify-center">
                <div className="absolute inset-0 gradient-primary rounded-2xl blur-2xl opacity-60 animate-shimmer" 
                     style={{ backgroundSize: '200% 100%' }}></div>
                <div className="relative w-24 h-24 gradient-primary rounded-2xl p-4 shadow-glow hover:scale-110 transition-smooth">
                  <img 
                    src="https://i.ibb.co/XfThMhM9/vista-superior-do-inseto-em-forma-de-borboleta-preta.png" 
                    alt="Neext Logo"
                    className="w-full h-full object-contain brightness-0 invert"
                  />
                </div>
              </div>
            </div>

            {/* Error code */}
            <div className="space-y-4">
              <h1 className="text-8xl sm:text-9xl font-black gradient-text animate-fade-in">
                404
              </h1>
              <div className="h-1.5 w-32 gradient-primary rounded-full shadow-glow mx-auto animate-shimmer" style={{ backgroundSize: '200% 100%' }}></div>
            </div>

            {/* Error message */}
            <div className="max-w-2xl mx-auto space-y-4">
              <h2 className="text-3xl sm:text-4xl font-black text-foreground">
                Rota Não Encontrada
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                A rota <span className="font-mono text-primary px-2 py-1 bg-primary/10 rounded">"{location.pathname}"</span> não existe ou foi removida.
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
              <Link to="/">
                <Button size="lg" variant="default" className="group hover-lift min-w-[200px] shadow-elegant">
                  <Home className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                  Início
                </Button>
              </Link>
              
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => navigate(-1)}
                className="group min-w-[200px] shadow-card hover:shadow-elegant"
              >
                <ArrowLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
                Voltar
              </Button>
            </div>

            {/* Additional info card */}
            <div className="max-w-md mx-auto mt-12 glass-effect-strong p-6 rounded-xl border border-primary/20 shadow-card">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Se você acredita que isso é um erro, entre em contato com o suporte ou verifique a documentação da API.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
