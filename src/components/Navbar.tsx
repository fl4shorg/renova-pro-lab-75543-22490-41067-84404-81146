import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyringe, faBell, faBars } from '@fortawesome/free-solid-svg-icons';
import { ThemeToggle } from './ThemeToggle';

interface NavbarProps {
  onMenuClick?: () => void;
}

export const Navbar = ({ onMenuClick }: NavbarProps) => {
  const [hasNotification, setHasNotification] = useState(true);

  const handleNotificationClick = () => {
    setHasNotification(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-full px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Syringe Icon */}
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
            
            {/* Vertical Divider */}
            <div className="h-8 w-[1px] bg-white/20"></div>
          </div>

          {/* Right side - Icons */}
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Theme Toggle */}
            <ThemeToggle />
            
            {/* Notification Bell */}
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

            {/* Avatar/Logo */}
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

            {/* Hamburger Menu */}
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
  );
};
