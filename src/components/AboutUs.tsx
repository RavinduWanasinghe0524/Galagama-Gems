import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Navigation } from './Navigation';
import logoImage from '../assets/f9f3557d671d8125a616ddcb69e2a0d761511cdc.png';

export function AboutUs() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Background Section with Parallax */}
      <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
        {/* Background Image with Ken Burns Effect and Parallax */}
        <motion.div
          style={{ 
            y: backgroundY,
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%'
          }}
        >
          <motion.div
            initial={{ scale: 1, opacity: 0 }}
            animate={{ scale: 1.1, opacity: 1 }}
            transition={{
              scale: {
                duration: 20,
                ease: "linear",
                repeat: Infinity,
                repeatType: "reverse"
              },
              opacity: {
                duration: 1.2,
                ease: "easeOut"
              }
            }}
            style={{ width: '100%', height: '100%' }}
          >
            <motion.div 
              style={{
                width: '100%',
                height: '100%',
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1920&q=80')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
              initial={{ filter: "brightness(0.7) contrast(1)" }}
              animate={{ 
                filter: [
                  "brightness(0.7) contrast(1)",
                  "brightness(0.8) contrast(1.05)",
                  "brightness(0.7) contrast(1)"
                ]
              }}
              transition={{
                duration: 8,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          </motion.div>
        </motion.div>

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 10, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Navigation isLoaded={isLoaded} />
          
          {/* About Us Container */}
          <div style={{ 
            flex: 1, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            padding: '48px 32px' 
          }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              style={{ width: '100%', maxWidth: '1200px' }}
            >
              {/* About Card */}
              <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '12px',
                padding: '40px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
              }}>
                {/* Logo */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
                  <img 
                    src={logoImage} 
                    alt="Galagama Gems" 
                    style={{
                      height: '64px',
                      width: 'auto',
                      mixBlendMode: 'screen',
                      filter: 'brightness(1.2) contrast(1.1)'
                    }}
                  />
                </div>

                {/* Title */}
                <motion.h1
                  initial={{ opacity: 0 }}
                  animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '48px',
                    color: 'white',
                    textAlign: 'center',
                    marginBottom: '8px',
                    letterSpacing: '0.1em'
                  }}
                >
                  About Galagama Gems
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  style={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    textAlign: 'center',
                    marginBottom: '48px',
                    fontSize: '18px'
                  }}
                >
                  Where tradition meets innovation in fine jewelry craftsmanship
                </motion.p>

                {/* Content Section */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  {/* Our Story */}
                  <div style={{ marginBottom: '40px' }}>
                    <h2 style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: '32px',
                      color: 'rgb(251, 191, 36)',
                      marginBottom: '16px',
                      textAlign: 'center'
                    }}>
                      Our Story
                    </h2>
                    <p style={{
                      color: 'rgba(255, 255, 255, 0.8)',
                      fontSize: '16px',
                      lineHeight: '1.8',
                      textAlign: 'center',
                      maxWidth: '800px',
                      margin: '0 auto'
                    }}>
                      For generations, the artisans of Galagama have been crafting jewelry that tells stories. 
                      What began as a small family workshop has evolved into a platform where tradition meets 
                      modern innovation. We believe every piece of jewelry should be as unique as the person 
                      wearing it, which is why we've created a space where your vision becomes reality.
                    </p>
                  </div>

                  {/* Values Grid */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '24px',
                    marginBottom: '40px'
                  }}>
                    {[
                      { 
                        icon: '💎', 
                        title: 'Master Craftsmanship', 
                        desc: 'Every piece is handcrafted by skilled artisans with decades of experience' 
                      },
                      { 
                        icon: '🎨', 
                        title: 'Your Vision, Our Art', 
                        desc: 'Design your dream jewelry with complete creative freedom' 
                      },
                      { 
                        icon: '✨', 
                        title: 'Premium Materials', 
                        desc: 'Only the finest metals and authentic gemstones in every creation' 
                      },
                      { 
                        icon: '🤝', 
                        title: 'Lifetime Partnership', 
                        desc: 'We stand behind our work with lifetime warranty and support' 
                      }
                    ].map((value, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        whileHover={{ y: -5, scale: 1.03 }}
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          borderRadius: '12px',
                          padding: '24px',
                          textAlign: 'center',
                          transition: 'all 0.3s'
                        }}
                      >
                        <div style={{ fontSize: '48px', marginBottom: '16px' }}>{value.icon}</div>
                        <h3 style={{
                          fontFamily: "'Playfair Display', serif",
                          fontSize: '20px',
                          color: 'white',
                          marginBottom: '12px',
                          fontWeight: '600'
                        }}>
                          {value.title}
                        </h3>
                        <p style={{
                          color: 'rgba(255, 255, 255, 0.7)',
                          fontSize: '14px',
                          lineHeight: '1.6'
                        }}>
                          {value.desc}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Stats Section */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                    gap: '20px',
                    padding: '32px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    marginBottom: '40px'
                  }}>
                    {[
                      { number: '50+', label: 'Years Experience' },
                      { number: '10,000+', label: 'Happy Customers' },
                      { number: '15+', label: 'Master Artisans' },
                      { number: '100%', label: 'Satisfaction Rate' }
                    ].map((stat, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isLoaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                        style={{ textAlign: 'center' }}
                      >
                        <div style={{
                          fontFamily: "'Playfair Display', serif",
                          fontSize: '40px',
                          fontWeight: 'bold',
                          color: 'rgb(251, 191, 36)',
                          marginBottom: '8px'
                        }}>
                          {stat.number}
                        </div>
                        <div style={{
                          color: 'rgba(255, 255, 255, 0.7)',
                          fontSize: '14px',
                          textTransform: 'uppercase',
                          letterSpacing: '1px'
                        }}>
                          {stat.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Mission Statement */}
                  <div style={{
                    textAlign: 'center',
                    padding: '32px',
                    background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.15) 0%, rgba(202, 138, 4, 0.15) 100%)',
                    border: '1px solid rgba(251, 191, 36, 0.3)',
                    borderRadius: '12px'
                  }}>
                    <h2 style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: '28px',
                      color: 'rgb(251, 191, 36)',
                      marginBottom: '16px',
                      fontStyle: 'italic'
                    }}>
                      "We don't just make jewelry, we create heirlooms"
                    </h2>
                    <p style={{
                      color: 'rgba(255, 255, 255, 0.8)',
                      fontSize: '16px',
                      lineHeight: '1.8',
                      maxWidth: '700px',
                      margin: '0 auto'
                    }}>
                      Our mission is to empower you to create jewelry that tells your unique story. 
                      Whether it's a symbol of love, achievement, or heritage, we're here to transform 
                      your vision into a timeless masterpiece that will be cherished for generations.
                    </p>
                  </div>

                  {/* CTA */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.5, delay: 1 }}
                    style={{ textAlign: 'center', marginTop: '40px' }}
                  >
                    <motion.a
                      href="#custom-design"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        display: 'inline-block',
                        padding: '16px 48px',
                        background: 'linear-gradient(to right, rgb(251, 191, 36), rgb(202, 138, 4))',
                        color: 'black',
                        fontWeight: '600',
                        fontSize: '18px',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = '0 10px 30px -5px rgba(251, 191, 36, 0.5)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                      }}
                    >
                      Start Your Design Journey
                    </motion.a>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
