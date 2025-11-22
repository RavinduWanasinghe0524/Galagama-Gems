import { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

interface NavLinkProps {
  label: string;
  href?: string;
}

export function NavLink({ label, href = '#' }: NavLinkProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      to={href}
      className="relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ textDecoration: 'none' }}
    >
      <span className="text-white transition-colors">
        {label}
      </span>

      {/* Animated underline */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 to-yellow-600 origin-center"
      />
    </Link>
  );
}
