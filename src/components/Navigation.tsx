import { motion } from 'framer-motion';
import { NavLink } from './NavLink';
import logoImage from '../assets/f9f3557d671d8125a616ddcb69e2a0d761511cdc.png';

interface NavigationProps {
  isLoaded: boolean;
}

export function Navigation({ isLoaded }: NavigationProps) {
  const navLinks = [
    'Home',
    'Custom Design',
    'Marketplace',
    'About',
    'Contact'
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full px-8 py-6"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <img 
            src={logoImage} 
            alt="Galagama Gems" 
            className="h-16 w-auto"
            style={{
              mixBlendMode: 'screen',
              filter: 'brightness(1.2) contrast(1.1)'
            }}
          />
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <NavLink key={link} label={link} />
          ))}
        </div>

        {/* Login/Sign Up */}
        <div className="hidden md:flex items-center space-x-4">
          <a href="#login" className="text-white hover:text-amber-400 transition-colors">
            Login
          </a>
          <a href="#signup" className="px-4 py-2 border border-white/30 rounded text-white hover:bg-white/10 transition-all inline-block">
            Sign Up
          </a>
        </div>
      </div>
    </motion.nav>
  );
}