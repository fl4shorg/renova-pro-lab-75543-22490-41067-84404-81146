import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyringe, faBell, faBars, faWrench } from '@fortawesome/free-solid-svg-icons';
import { ThemeToggle } from './ThemeToggle';

interface NavbarProps {
  onMenuClick?: () => void;
}

export const Navbar = ({ onMenuClick }: NavbarProps) => {
  const [hasNotification, setHasNotification] = useState(true);
  const [showNotificationPanel, setShowNotificationPanel] = useState(false);

  const handleNotificationClick = () => {
    setHasNotification(false);
    setShowNotificationPanel(!showNotificationPanel);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-full px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <div className="relative group">
                <div className="absolute inset-0 bg-primary/20 rounded-lg blur-md group-hover:blur-lg transition-smooth"></div>
                <div className="relative p-2">
                  <FontAwesomeIcon 
                    icon={faSyringe} 
                    className="w-6 h-6 text-primary hover:text-primary/80 transition-colors" 
                  />
                </div>
              </div>
              
              <div className="h-8 w-[1px] bg-white/20"></div>
            </div>

            <div className="flex items-center gap-4 sm:gap-6">
              <ThemeToggle />
              
              <button 
                onClick={handleNotificationClick}
                className="relative p-2 hover:bg-white/5 rounded-lg transition-colors group"
                aria-label="Notificações"
              >
                <FontAwesomeIcon 
                  icon={faBell} 
                  className="w-5 h-5 text-white/80 group-hover:text-white transition-colors" 
                />
                {hasNotification && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                )}
              </button>

              <div className="relative w-10 h-10 flex-shrink-0">
                <div className="absolute inset-0 gradient-primary rounded-full blur-md opacity-60"></div>
                <div className="relative w-full h-full gradient-primary rounded-full p-2 shadow-elegant hover:scale-110 transition-smooth cursor-pointer">
                  <img 
                    src="https://i.ibb.co/XfThMhM9/vista-superior-do-inseto-em-forma-de-borboleta-preta.png" 
                    alt="Neext Logo"
                    className="w-full h-full object-contain brightness-0 invert"
                  />
                </div>
              </div>

              <button 
                onClick={onMenuClick}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors group"
                aria-label="Menu"
              >
                <FontAwesomeIcon 
                  icon={faBars} 
                  className="w-5 h-5 text-white/80 group-hover:text-white transition-colors" 
                />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {showNotificationPanel && (
        <>
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setShowNotificationPanel(false)}
          />
          <div className="fixed top-20 right-4 sm:right-6 z-50 w-64 bg-black/95 backdrop-blur-lg border border-white/10 rounded-xl shadow-2xl animate-fade-in">
            <div className="p-4">
              <h3 className="text-white text-sm font-bold mb-3">Info</h3>
              <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-gray-900 to-black rounded-lg border border-white/5">
                <FontAwesomeIcon 
                  icon={faWrench} 
                  className="w-4 h-4 text-red-500 flex-shrink-0"
                />
                <div className="flex-1">
                  <span 
                    className="text-sm font-black bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent animate-shimmer"
                    style={{ 
                      backgroundSize: '200% auto',
                      animation: 'shimmer 3s linear infinite'
                    }}
                  >
                    Neext é o melhor!
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
