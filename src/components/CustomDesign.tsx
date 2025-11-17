import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Navigation } from './Navigation';
import logoImage from '../assets/f9f3557d671d8125a616ddcb69e2a0d761511cdc.png';

export function CustomDesign() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedMetal, setSelectedMetal] = useState('');
  const [selectedGemType, setSelectedGemType] = useState('');
  const [selectedGemstone, setSelectedGemstone] = useState('');
  const [engravingText, setEngravingText] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [estimatedPrice, setEstimatedPrice] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [uploadedDesign, setUploadedDesign] = useState<string | null>(null);
  
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);

  const categories = [
    { 
      value: 'ring', 
      label: 'Ring',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=300&fit=crop&q=80'
    },
    { 
      value: 'necklace', 
      label: 'Necklace',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=300&fit=crop&q=80'
    },
    { 
      value: 'earring', 
      label: 'Earrings',
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=300&fit=crop&q=80'
    },
    { 
      value: 'bracelet', 
      label: 'Bracelet',
      image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=300&fit=crop&q=80'
    },
  ];

  const metals = [
    { 
      value: 'gold-24k', 
      label: '24K Gold', 
      price: 500, 
      color: '#FFD700',
      image: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=300&h=300&fit=crop&q=80'
    },
    { 
      value: 'gold-18k', 
      label: '18K Gold', 
      price: 350, 
      color: '#F4C430',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300&h=300&fit=crop&q=80'
    },
    { 
      value: 'white-gold', 
      label: 'White Gold', 
      price: 400, 
      color: '#E8E8E8',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300&h=300&fit=crop&q=80'
    },
    { 
      value: 'rose-gold', 
      label: 'Rose Gold', 
      price: 420, 
      color: '#B76E79',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop&q=80'
    },
    { 
      value: 'platinum', 
      label: 'Platinum', 
      price: 600, 
      color: '#E5E4E2',
      image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=300&h=300&fit=crop&q=80'
    },
    { 
      value: 'silver', 
      label: 'Sterling Silver', 
      price: 150, 
      color: '#C0C0C0',
      image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=300&h=300&fit=crop&q=80'
    },
  ];

  const gemTypes = [
    { value: 'precious', label: 'Precious Stones', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
    { value: 'semi-precious', label: 'Semi-Precious Stones', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
    { value: 'synthetic', label: 'Synthetic Gems', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
    { value: 'none', label: 'No Gemstone', gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
  ];

  const gemstones = {
    precious: [
      { 
        value: 'diamond', 
        label: 'Diamond', 
        price: 800, 
        color: '#B9F2FF',
        image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300&h=300&fit=crop&q=80'
      },
      { 
        value: 'ruby', 
        label: 'Ruby', 
        price: 600, 
        color: '#E0115F',
        image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300&h=300&fit=crop&q=80'
      },
      { 
        value: 'sapphire', 
        label: 'Sapphire', 
        price: 550, 
        color: '#0F52BA',
        image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop&q=80'
      },
      { 
        value: 'emerald', 
        label: 'Emerald', 
        price: 650, 
        color: '#50C878',
        image: 'https://images.unsplash.com/photo-1610216705422-caa3fcb6d158?w=300&h=300&fit=crop&q=80'
      },
    ],
    'semi-precious': [
      { 
        value: 'amethyst', 
        label: 'Amethyst', 
        price: 150, 
        color: '#9966CC',
        image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300&h=300&fit=crop&q=80'
      },
      { 
        value: 'topaz', 
        label: 'Topaz', 
        price: 180, 
        color: '#FFC87C',
        image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=300&h=300&fit=crop&q=80'
      },
      { 
        value: 'aquamarine', 
        label: 'Aquamarine', 
        price: 200, 
        color: '#7FFFD4',
        image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300&h=300&fit=crop&q=80'
      },
      { 
        value: 'garnet', 
        label: 'Garnet', 
        price: 120, 
        color: '#733635',
        image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop&q=80'
      },
      { 
        value: 'opal', 
        label: 'Opal', 
        price: 220, 
        color: '#A8C3BC',
        image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300&h=300&fit=crop&q=80'
      },
      { 
        value: 'turquoise', 
        label: 'Turquoise', 
        price: 100, 
        color: '#40E0D0',
        image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=300&h=300&fit=crop&q=80'
      },
    ],
    synthetic: [
      { 
        value: 'cubic-zirconia', 
        label: 'Cubic Zirconia', 
        price: 50, 
        color: '#FFFFFF',
        image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300&h=300&fit=crop&q=80'
      },
      { 
        value: 'moissanite', 
        label: 'Moissanite', 
        price: 250, 
        color: '#F0EAD6',
        image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300&h=300&fit=crop&q=80'
      },
    ],
    none: [],
  };

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];

  // Canvas drawing setup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas background
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let drawing = false;
    let lastX = 0;
    let lastY = 0;

    const startDrawing = (e: MouseEvent) => {
      drawing = true;
      [lastX, lastY] = [e.offsetX, e.offsetY];
    };

    const draw = (e: MouseEvent) => {
      if (!drawing) return;
      ctx.strokeStyle = '#FBB040';
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
      [lastX, lastY] = [e.offsetX, e.offsetY];
    };

    const stopDrawing = () => {
      drawing = false;
    };

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', stopDrawing);
      canvas.removeEventListener('mouseout', stopDrawing);
    };
  }, []);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedDesign(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Calculate price
  useEffect(() => {
    let price = 0;
    const metal = metals.find(m => m.value === selectedMetal);
    if (metal) price += metal.price;
    
    if (selectedGemType && selectedGemType !== 'none') {
      const gem = gemstones[selectedGemType as keyof typeof gemstones]?.find(g => g.value === selectedGemstone);
      if (gem) price += gem.price;
    }
    
    if (engravingText) price += 80;
    if (uploadedDesign || isDrawing) price += 150; // Custom design fee
    
    setEstimatedPrice(price);
  }, [selectedMetal, selectedGemType, selectedGemstone, engravingText, uploadedDesign, isDrawing]);

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
          
          {/* Custom Design Container */}
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
              {/* Custom Design Card */}
              <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '12px',
                padding: '40px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
              }}>
                {/* Logo in card */}
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
                  Design Your Dream Jewelry
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
                  Craft unique, handcrafted pieces designed by you, made by master artisans
                </motion.p>

                {/* Customization Form */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  style={{ marginBottom: '48px' }}
                >
                  {/* Category Selection */}
                  <div style={{ marginBottom: '32px' }}>
                    <label style={{
                      display: 'block',
                      color: 'white',
                      marginBottom: '16px',
                      fontSize: '18px',
                      fontWeight: '500',
                      fontFamily: "'Playfair Display', serif"
                    }}>
                      1. Choose Jewelry Type
                    </label>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                      gap: '20px'
                    }}>
                      {categories.map((cat) => (
                        <motion.button
                          key={cat.value}
                          whileHover={{ scale: 1.03, y: -5 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setSelectedCategory(cat.value)}
                          style={{
                            padding: '0',
                            backgroundColor: 'transparent',
                            border: selectedCategory === cat.value 
                              ? '3px solid rgb(251, 191, 36)' 
                              : '2px solid rgba(255, 255, 255, 0.2)',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            transition: 'all 0.3s',
                            overflow: 'hidden',
                            position: 'relative',
                            boxShadow: selectedCategory === cat.value
                              ? '0 0 30px rgba(251, 191, 36, 0.4)'
                              : '0 4px 15px rgba(0, 0, 0, 0.3)'
                          }}
                        >
                          <div style={{
                            position: 'relative',
                            paddingBottom: '75%',
                            overflow: 'hidden'
                          }}>
                            <img
                              src={cat.image}
                              alt={cat.label}
                              style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                filter: selectedCategory === cat.value 
                                  ? 'brightness(1.1) saturate(1.2)' 
                                  : 'brightness(0.8) saturate(0.9)',
                                transition: 'all 0.3s'
                              }}
                            />
                            <div style={{
                              position: 'absolute',
                              bottom: 0,
                              left: 0,
                              right: 0,
                              background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
                              padding: '20px 12px 12px',
                              color: 'white',
                              fontSize: '18px',
                              fontWeight: '600',
                              textAlign: 'center',
                              fontFamily: "'Playfair Display', serif",
                              letterSpacing: '0.5px'
                            }}>
                              {cat.label}
                            </div>
                            {selectedCategory === cat.value && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                style={{
                                  position: 'absolute',
                                  top: '12px',
                                  right: '12px',
                                  width: '32px',
                                  height: '32px',
                                  borderRadius: '50%',
                                  backgroundColor: 'rgb(251, 191, 36)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: '18px'
                                }}
                              >
                                ✓
                              </motion.div>
                            )}
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Metal Selection */}
                  <AnimatePresence>
                    {selectedCategory && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        style={{ marginBottom: '32px' }}
                      >
                        <label style={{
                          display: 'block',
                          color: 'white',
                          marginBottom: '16px',
                          fontSize: '18px',
                          fontWeight: '500',
                          fontFamily: "'Playfair Display', serif"
                        }}>
                          2. Select Metal Type
                        </label>
                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                          gap: '12px'
                        }}>
                          {metals.map((metal) => (
                            <motion.button
                              key={metal.value}
                              whileHover={{ scale: 1.05, y: -3 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setSelectedMetal(metal.value)}
                              style={{
                                padding: '0',
                                backgroundColor: 'transparent',
                                border: selectedMetal === metal.value 
                                  ? '3px solid rgb(251, 191, 36)' 
                                  : '2px solid rgba(255, 255, 255, 0.2)',
                                borderRadius: '12px',
                                cursor: 'pointer',
                                transition: 'all 0.3s',
                                position: 'relative',
                                overflow: 'hidden',
                                boxShadow: selectedMetal === metal.value
                                  ? '0 0 25px rgba(251, 191, 36, 0.5)'
                                  : '0 4px 15px rgba(0, 0, 0, 0.3)'
                              }}
                            >
                              <div style={{
                                position: 'relative',
                                paddingBottom: '100%',
                                overflow: 'hidden'
                              }}>
                                <img
                                  src={metal.image}
                                  alt={metal.label}
                                  style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    filter: selectedMetal === metal.value 
                                      ? 'brightness(1.1) saturate(1.3)' 
                                      : 'brightness(0.85) saturate(0.9)',
                                    transition: 'all 0.3s'
                                  }}
                                />
                                <div style={{
                                  position: 'absolute',
                                  inset: 0,
                                  background: `linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.85) 100%)`
                                }} />
                                
                                {/* Metal color indicator */}
                                <div style={{
                                  position: 'absolute',
                                  top: '8px',
                                  left: '8px',
                                  width: '30px',
                                  height: '30px',
                                  backgroundColor: metal.color,
                                  borderRadius: '50%',
                                  boxShadow: `0 2px 15px ${metal.color}99, inset 0 1px 5px rgba(255,255,255,0.4)`,
                                  border: '2px solid rgba(255, 255, 255, 0.5)'
                                }} />

                                {selectedMetal === metal.value && (
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    style={{
                                      position: 'absolute',
                                      top: '8px',
                                      right: '8px',
                                      width: '30px',
                                      height: '30px',
                                      borderRadius: '50%',
                                      backgroundColor: 'rgb(251, 191, 36)',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      fontSize: '16px',
                                      fontWeight: 'bold',
                                      color: 'black'
                                    }}
                                  >
                                    ✓
                                  </motion.div>
                                )}

                                <div style={{
                                  position: 'absolute',
                                  bottom: '0',
                                  left: '0',
                                  right: '0',
                                  padding: '12px 8px',
                                  textAlign: 'center'
                                }}>
                                  <div style={{ 
                                    color: 'white', 
                                    fontSize: '14px', 
                                    fontWeight: '600',
                                    marginBottom: '4px',
                                    textShadow: '0 2px 4px rgba(0,0,0,0.8)'
                                  }}>
                                    {metal.label}
                                  </div>
                                  <div style={{ 
                                    color: 'rgb(251, 191, 36)', 
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    textShadow: '0 2px 4px rgba(0,0,0,0.8)'
                                  }}>
                                    ${metal.price}
                                  </div>
                                </div>
                              </div>
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Gem Type Selection */}
                  <AnimatePresence>
                    {selectedMetal && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        style={{ marginBottom: '32px' }}
                      >
                        <label style={{
                          display: 'block',
                          color: 'white',
                          marginBottom: '16px',
                          fontSize: '18px',
                          fontWeight: '500',
                          fontFamily: "'Playfair Display', serif"
                        }}>
                          3. Choose Gemstone Category
                        </label>
                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                          gap: '12px'
                        }}>
                          {gemTypes.map((type) => (
                            <motion.button
                              key={type.value}
                              whileHover={{ scale: 1.05, y: -3 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => {
                                setSelectedGemType(type.value);
                                setSelectedGemstone('');
                              }}
                              style={{
                                padding: '20px 16px',
                                background: selectedGemType === type.value 
                                  ? type.gradient
                                  : 'rgba(255, 255, 255, 0.05)',
                                border: selectedGemType === type.value 
                                  ? '2px solid rgb(251, 191, 36)' 
                                  : '1px solid rgba(255, 255, 255, 0.2)',
                                borderRadius: '10px',
                                color: 'white',
                                cursor: 'pointer',
                                fontSize: '15px',
                                fontWeight: '600',
                                transition: 'all 0.3s',
                                textAlign: 'center',
                                position: 'relative',
                                boxShadow: selectedGemType === type.value
                                  ? '0 8px 25px rgba(251, 191, 36, 0.3)'
                                  : '0 4px 15px rgba(0, 0, 0, 0.2)'
                              }}
                            >
                              {type.label}
                              {selectedGemType === type.value && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  style={{
                                    position: 'absolute',
                                    top: '8px',
                                    right: '8px',
                                    width: '24px',
                                    height: '24px',
                                    borderRadius: '50%',
                                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '14px'
                                  }}
                                >
                                  ✓
                                </motion.div>
                              )}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Specific Gemstone Selection */}
                  <AnimatePresence>
                    {selectedGemType && selectedGemType !== 'none' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        style={{ marginBottom: '32px' }}
                      >
                        <label style={{
                          display: 'block',
                          color: 'white',
                          marginBottom: '16px',
                          fontSize: '18px',
                          fontWeight: '500',
                          fontFamily: "'Playfair Display', serif"
                        }}>
                          4. Select Gemstone
                        </label>
                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                          gap: '16px',
                          maxWidth: '100%'
                        }}>
                          {gemstones[selectedGemType as keyof typeof gemstones]?.map((gem) => (
                            <motion.button
                              key={gem.value}
                              whileHover={{ scale: 1.05, y: -3 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setSelectedGemstone(gem.value)}
                              style={{
                                padding: '0',
                                backgroundColor: 'transparent',
                                border: selectedGemstone === gem.value 
                                  ? '3px solid rgb(251, 191, 36)' 
                                  : '2px solid rgba(255, 255, 255, 0.2)',
                                borderRadius: '12px',
                                cursor: 'pointer',
                                transition: 'all 0.3s',
                                textAlign: 'center',
                                position: 'relative',
                                overflow: 'hidden',
                                boxShadow: selectedGemstone === gem.value
                                  ? `0 0 25px rgba(251, 191, 36, 0.5)`
                                  : '0 4px 15px rgba(0, 0, 0, 0.3)',
                                width: '100%',
                                aspectRatio: '1'
                              }}
                            >
                              <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                overflow: 'hidden'
                              }}>
                                <img
                                  src={gem.image}
                                  alt={gem.label}
                                  style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    objectPosition: 'center',
                                    filter: selectedGemstone === gem.value 
                                      ? 'brightness(1.2) saturate(1.4)' 
                                      : 'brightness(0.8) saturate(1)',
                                    transition: 'all 0.3s'
                                  }}
                                />
                                <div style={{
                                  position: 'absolute',
                                  inset: 0,
                                  background: `linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.9) 100%)`
                                }} />

                                {/* Gem color indicator */}
                                <div style={{
                                  position: 'absolute',
                                  top: '8px',
                                  left: '8px',
                                  width: '28px',
                                  height: '28px',
                                  backgroundColor: gem.color,
                                  borderRadius: '50%',
                                  boxShadow: `0 0 20px ${gem.color}CC, inset 0 2px 8px rgba(255,255,255,0.6)`,
                                  border: '2px solid rgba(255, 255, 255, 0.5)',
                                  background: `radial-gradient(circle at 30% 30%, ${gem.color}FF, ${gem.color}99)`
                                }} />

                                {selectedGemstone === gem.value && (
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    style={{
                                      position: 'absolute',
                                      top: '8px',
                                      right: '8px',
                                      width: '28px',
                                      height: '28px',
                                      borderRadius: '50%',
                                      backgroundColor: 'rgb(251, 191, 36)',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      fontSize: '14px',
                                      fontWeight: 'bold',
                                      color: 'black'
                                    }}
                                  >
                                    ✓
                                  </motion.div>
                                )}

                                <div style={{
                                  position: 'absolute',
                                  bottom: '0',
                                  left: '0',
                                  right: '0',
                                  padding: '12px 8px',
                                  textAlign: 'center'
                                }}>
                                  <div style={{ 
                                    fontSize: '14px', 
                                    fontWeight: '600', 
                                    marginBottom: '4px',
                                    color: 'white',
                                    textShadow: '0 2px 4px rgba(0,0,0,0.9)'
                                  }}>
                                    {gem.label}
                                  </div>
                                  <div style={{ 
                                    fontSize: '13px', 
                                    color: 'rgb(251, 191, 36)', 
                                    fontWeight: 'bold',
                                    textShadow: '0 2px 4px rgba(0,0,0,0.9)'
                                  }}>
                                    +${gem.price}
                                  </div>
                                </div>
                              </div>
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Custom Design Section */}
                  <AnimatePresence>
                    {selectedMetal && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        style={{ marginBottom: '32px' }}
                      >
                        <label style={{
                          display: 'block',
                          color: 'white',
                          marginBottom: '16px',
                          fontSize: '18px',
                          fontWeight: '500',
                          fontFamily: "'Playfair Display', serif"
                        }}>
                          5. Add Your Custom Design
                          <span style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.6)', marginLeft: '8px' }}>
                            (Optional +$150)
                          </span>
                        </label>
                        
                        <div style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          borderRadius: '12px',
                          padding: '24px',
                        }}>
                          {/* Tab Selection */}
                          <div style={{
                            display: 'flex',
                            gap: '12px',
                            marginBottom: '20px',
                            flexWrap: 'wrap'
                          }}>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setIsDrawing(true)}
                              style={{
                                padding: '12px 24px',
                                backgroundColor: isDrawing 
                                  ? 'rgba(251, 191, 36, 0.3)' 
                                  : 'rgba(255, 255, 255, 0.05)',
                                border: isDrawing 
                                  ? '2px solid rgb(251, 191, 36)' 
                                  : '1px solid rgba(255, 255, 255, 0.2)',
                                borderRadius: '8px',
                                color: 'white',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: '500',
                                transition: 'all 0.3s'
                              }}
                            >
                              ✏️ Draw Design
                            </motion.button>
                            
                            <label style={{ position: 'relative' }}>
                              <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                  padding: '12px 24px',
                                  backgroundColor: uploadedDesign 
                                    ? 'rgba(251, 191, 36, 0.3)' 
                                    : 'rgba(255, 255, 255, 0.05)',
                                  border: uploadedDesign 
                                    ? '2px solid rgb(251, 191, 36)' 
                                    : '1px solid rgba(255, 255, 255, 0.2)',
                                  borderRadius: '8px',
                                  color: 'white',
                                  cursor: 'pointer',
                                  fontSize: '14px',
                                  fontWeight: '500',
                                  transition: 'all 0.3s',
                                  display: 'inline-block'
                                }}
                              >
                                📤 Upload Design
                              </motion.div>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileUpload}
                                style={{ display: 'none' }}
                              />
                            </label>

                            {(isDrawing || uploadedDesign) && (
                              <motion.button
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                  setIsDrawing(false);
                                  setUploadedDesign(null);
                                  clearCanvas();
                                }}
                                style={{
                                  padding: '12px 24px',
                                  backgroundColor: 'rgba(239, 68, 68, 0.2)',
                                  border: '1px solid rgb(239, 68, 68)',
                                  borderRadius: '8px',
                                  color: 'white',
                                  cursor: 'pointer',
                                  fontSize: '14px',
                                  fontWeight: '500',
                                  transition: 'all 0.3s'
                                }}
                              >
                                🗑️ Clear
                              </motion.button>
                            )}
                          </div>

                          {/* Drawing Canvas */}
                          {isDrawing && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              style={{
                                border: '2px dashed rgba(251, 191, 36, 0.5)',
                                borderRadius: '8px',
                                overflow: 'hidden',
                                backgroundColor: 'rgba(255, 255, 255, 0.03)'
                              }}
                            >
                              <canvas
                                ref={canvasRef}
                                width={800}
                                height={500}
                                style={{
                                  width: '100%',
                                  height: 'auto',
                                  display: 'block',
                                  cursor: 'crosshair'
                                }}
                              />
                              <div style={{
                                padding: '12px',
                                textAlign: 'center',
                                color: 'rgba(255, 255, 255, 0.6)',
                                fontSize: '13px',
                                backgroundColor: 'rgba(0, 0, 0, 0.3)'
                              }}>
                                💡 Draw your custom design with your mouse. Our artisans will bring it to life!
                              </div>
                            </motion.div>
                          )}

                          {/* Uploaded Image Preview */}
                          {uploadedDesign && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              style={{
                                border: '2px solid rgba(251, 191, 36, 0.5)',
                                borderRadius: '8px',
                                overflow: 'hidden',
                                maxHeight: '400px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: 'rgba(0, 0, 0, 0.3)'
                              }}
                            >
                              <img
                                src={uploadedDesign}
                                alt="Uploaded design"
                                style={{
                                  maxWidth: '100%',
                                  maxHeight: '400px',
                                  objectFit: 'contain'
                                }}
                              />
                            </motion.div>
                          )}

                          {!isDrawing && !uploadedDesign && (
                            <div style={{
                              textAlign: 'center',
                              padding: '60px 20px',
                              color: 'rgba(255, 255, 255, 0.5)',
                              fontSize: '14px',
                              border: '2px dashed rgba(255, 255, 255, 0.2)',
                              borderRadius: '8px'
                            }}>
                              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎨</div>
                              <p>Share your vision with us!</p>
                              <p style={{ marginTop: '8px' }}>Draw or upload your custom jewelry design</p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Size Selection */}
                  <AnimatePresence>
                    {selectedMetal && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        style={{ marginBottom: '32px' }}
                      >
                        <label style={{
                          display: 'block',
                          color: 'white',
                          marginBottom: '12px',
                          fontSize: '18px',
                          fontWeight: '500',
                          fontFamily: "'Playfair Display', serif"
                        }}>
                          6. Choose Size
                        </label>
                        <div style={{
                          display: 'flex',
                          gap: '12px',
                          flexWrap: 'wrap'
                        }}>
                          {sizes.map((size) => (
                            <motion.button
                              key={size}
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => setSelectedSize(size)}
                              style={{
                                width: '70px',
                                height: '70px',
                                backgroundColor: selectedSize === size 
                                  ? 'rgba(251, 191, 36, 0.3)' 
                                  : 'rgba(255, 255, 255, 0.05)',
                                border: selectedSize === size 
                                  ? '3px solid rgb(251, 191, 36)' 
                                  : '2px solid rgba(255, 255, 255, 0.2)',
                                borderRadius: '12px',
                                color: 'white',
                                cursor: 'pointer',
                                fontSize: '20px',
                                fontWeight: 'bold',
                                transition: 'all 0.3s',
                                boxShadow: selectedSize === size
                                  ? '0 0 20px rgba(251, 191, 36, 0.4)'
                                  : '0 2px 10px rgba(0, 0, 0, 0.2)'
                              }}
                            >
                              {size}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Engraving Input */}
                  <AnimatePresence>
                    {selectedMetal && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        style={{ marginBottom: '32px' }}
                      >
                        <label style={{
                          display: 'block',
                          color: 'white',
                          marginBottom: '12px',
                          fontSize: '18px',
                          fontWeight: '500',
                          fontFamily: "'Playfair Display', serif"
                        }}>
                          7. Add Custom Engraving
                          <span style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.6)', marginLeft: '8px' }}>
                            (Optional +$80)
                          </span>
                        </label>
                        <input
                          type="text"
                          value={engravingText}
                          onChange={(e) => setEngravingText(e.target.value.slice(0, 30))}
                          placeholder="Enter your special message..."
                          maxLength={30}
                          style={{
                            width: '100%',
                            padding: '16px 20px',
                            backgroundColor: 'rgba(255, 255, 255, 0.08)',
                            border: engravingText 
                              ? '2px solid rgba(251, 191, 36, 0.5)' 
                              : '1px solid rgba(255, 255, 255, 0.2)',
                            borderRadius: '10px',
                            color: 'white',
                            fontSize: '16px',
                            outline: 'none',
                            transition: 'all 0.3s',
                            fontFamily: "'Playfair Display', serif",
                            fontStyle: 'italic'
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = 'rgb(251, 191, 36)';
                            e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.12)';
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = engravingText ? 'rgba(251, 191, 36, 0.5)' : 'rgba(255, 255, 255, 0.2)';
                            e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                          }}
                        />
                        <div style={{ 
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginTop: '8px'
                        }}>
                          <div style={{ 
                            color: 'rgba(255, 255, 255, 0.5)', 
                            fontSize: '12px'
                          }}>
                            💡 Make it personal - add names, dates, or special words
                          </div>
                          <div style={{ 
                            color: engravingText.length > 25 ? 'rgb(251, 191, 36)' : 'rgba(255, 255, 255, 0.5)', 
                            fontSize: '13px',
                            fontWeight: '600'
                          }}>
                            {engravingText.length}/30
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Price Display */}
                  <AnimatePresence>
                    {estimatedPrice > 0 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        style={{
                          padding: '32px',
                          background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.2) 0%, rgba(202, 138, 4, 0.2) 100%)',
                          border: '2px solid rgb(251, 191, 36)',
                          borderRadius: '16px',
                          textAlign: 'center',
                          marginBottom: '32px',
                          position: 'relative',
                          overflow: 'hidden',
                          boxShadow: '0 10px 40px rgba(251, 191, 36, 0.3)'
                        }}
                      >
                        <motion.div
                          animate={{
                            rotate: 360
                          }}
                          transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                          style={{
                            position: 'absolute',
                            top: '-50%',
                            left: '-50%',
                            width: '200%',
                            height: '200%',
                            background: 'conic-gradient(from 0deg, transparent, rgba(251, 191, 36, 0.1), transparent)',
                            pointerEvents: 'none'
                          }}
                        />
                        <div style={{ 
                          color: 'rgba(255, 255, 255, 0.8)', 
                          fontSize: '14px', 
                          marginBottom: '12px',
                          textTransform: 'uppercase',
                          letterSpacing: '2px',
                          fontWeight: '500'
                        }}>
                          Estimated Price
                        </div>
                        <motion.div 
                          key={estimatedPrice}
                          initial={{ scale: 1.2, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: '56px',
                            background: 'linear-gradient(135deg, rgb(251, 191, 36) 0%, rgb(255, 223, 128) 50%, rgb(251, 191, 36) 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            fontWeight: 'bold',
                            lineHeight: '1',
                            marginBottom: '12px',
                            textShadow: '0 0 30px rgba(251, 191, 36, 0.5)'
                          }}
                        >
                          ${estimatedPrice}
                        </motion.div>
                        <div style={{ 
                          color: 'rgba(255, 255, 255, 0.6)', 
                          fontSize: '12px',
                          fontStyle: 'italic'
                        }}>
                          ✨ Final price may vary based on intricate craftsmanship details
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  style={{ textAlign: 'center' }}
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={!selectedCategory || !selectedMetal || !selectedSize}
                    style={{
                      padding: '16px 48px',
                      background: (!selectedCategory || !selectedMetal || !selectedSize)
                        ? 'rgba(150, 150, 150, 0.3)'
                        : 'linear-gradient(to right, rgb(251, 191, 36), rgb(202, 138, 4))',
                      color: (!selectedCategory || !selectedMetal || !selectedSize) 
                        ? 'rgba(255, 255, 255, 0.4)' 
                        : 'black',
                      fontWeight: '500',
                      fontSize: '18px',
                      borderRadius: '8px',
                      border: 'none',
                      cursor: (!selectedCategory || !selectedMetal || !selectedSize) 
                        ? 'not-allowed' 
                        : 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                    onMouseEnter={(e) => {
                      if (selectedCategory && selectedMetal && selectedSize) {
                        e.currentTarget.style.boxShadow = '0 10px 30px -5px rgba(251, 191, 36, 0.5)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                    }}
                  >
                    {(!selectedCategory || !selectedMetal || !selectedSize) 
                      ? 'Complete Your Design' 
                      : 'Add to Cart & Continue'}
                  </motion.button>

                  <p style={{ 
                    marginTop: '24px',
                    color: 'rgba(255, 255, 255, 0.7)', 
                    fontSize: '14px' 
                  }}>
                    Have questions?{' '}
                    <a 
                      href="#contact" 
                      style={{ 
                        color: 'rgb(251, 191, 36)',
                        textDecoration: 'none',
                        fontWeight: '500',
                        transition: 'color 0.3s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = 'rgb(252, 211, 77)'}
                      onMouseLeave={(e) => e.currentTarget.style.color = 'rgb(251, 191, 36)'}
                    >
                      Contact our design team
                    </a>
                  </p>

                  {/* Features */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: '20px',
                    marginTop: '40px',
                    padding: '32px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}>
                    {[
                      { icon: '✨', title: 'Handcrafted', desc: 'By master artisans' },
                      { icon: '🎯', title: '100% Custom', desc: 'Designed by you' },
                      { icon: '🚚', title: 'Free Shipping', desc: 'On all orders' },
                      { icon: '🔒', title: 'Lifetime Warranty', desc: 'Quality guaranteed' }
                    ].map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 + index * 0.1 }}
                        whileHover={{ y: -5, scale: 1.05 }}
                        style={{ 
                          textAlign: 'center', 
                          padding: '20px',
                          backgroundColor: 'rgba(255, 255, 255, 0.03)',
                          borderRadius: '10px',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          transition: 'all 0.3s'
                        }}
                      >
                        <div style={{ fontSize: '40px', marginBottom: '12px' }}>{feature.icon}</div>
                        <div style={{ 
                          color: 'white', 
                          fontSize: '16px', 
                          fontWeight: '600',
                          marginBottom: '6px',
                          fontFamily: "'Playfair Display', serif"
                        }}>
                          {feature.title}
                        </div>
                        <div style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '13px' }}>
                          {feature.desc}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
