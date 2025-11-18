import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { useCart } from '../context/CartContext';
import logoImage from '../assets/f9f3557d671d8125a616ddcb69e2a0d761511cdc.png';

export function Marketplace() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [selectedMetal, setSelectedMetal] = useState<string>('all');
  const { scrollY } = useScroll();
  const { addToCart } = useCart();
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const categories = [
    { value: 'all', label: 'All Items' },
    { value: 'ring', label: 'Rings' },
    { value: 'necklace', label: 'Necklaces' },
    { value: 'earring', label: 'Earrings' },
    { value: 'bracelet', label: 'Bracelets' },
  ];

  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: '0-500', label: 'Under $500' },
    { value: '500-1000', label: '$500 - $1000' },
    { value: '1000-2000', label: '$1000 - $2000' },
    { value: '2000+', label: 'Above $2000' },
  ];

  const metals = [
    { value: 'all', label: 'All Metals' },
    { value: '24K Gold', label: '24K Gold' },
    { value: '18K Gold', label: '18K Gold' },
    { value: 'White Gold', label: 'White Gold' },
    { value: 'Rose Gold', label: 'Rose Gold' },
    { value: 'Platinum', label: 'Platinum' },
    { value: 'Sterling Silver', label: 'Sterling Silver' },
  ];

  const products = [
    {
      id: 1,
      name: 'Sapphire Elegance Ring',
      category: 'ring',
      metal: '18K Gold',
      price: 850,
      description: 'Exquisite blue sapphire set in lustrous 18K gold, handcrafted to perfection',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80',
      featured: true
    },
    {
      id: 2,
      name: 'Ceylon Moonstone Necklace',
      category: 'necklace',
      metal: 'White Gold',
      price: 1450,
      description: 'Authentic Ceylon moonstone with ethereal glow, beautifully set in white gold',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80',
      featured: true
    },
    {
      id: 3,
      name: 'Ruby Sunset Earrings',
      category: 'earring',
      metal: 'Platinum',
      price: 1350,
      description: 'Stunning Burmese rubies paired with platinum for timeless elegance',
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80',
      featured: true
    },
    {
      id: 4,
      name: 'Diamond Solitaire Ring',
      category: 'ring',
      metal: 'Platinum',
      price: 2200,
      description: 'Classic solitaire diamond ring with platinum band, perfect for engagements',
      image: 'https://images.unsplash.com/photo-1611955167811-4711904bb9f8?w=800&q=80',
      featured: false
    },
    {
      id: 5,
      name: 'Emerald Drop Necklace',
      category: 'necklace',
      metal: '24K Gold',
      price: 1850,
      description: 'Colombian emerald pendant with delicate 24K gold chain',
      image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80',
      featured: false
    },
    {
      id: 6,
      name: 'Pearl Stud Earrings',
      category: 'earring',
      metal: 'Sterling Silver',
      price: 320,
      description: 'Timeless freshwater pearl studs in sterling silver setting',
      image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=800&q=80',
      featured: false
    },
    {
      id: 7,
      name: 'Gold Tennis Bracelet',
      category: 'bracelet',
      metal: '18K Gold',
      price: 1680,
      description: 'Classic tennis bracelet with brilliant diamonds and 18K gold',
      image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80',
      featured: false
    },
    {
      id: 8,
      name: 'Vintage Rose Gold Ring',
      category: 'ring',
      metal: 'Rose Gold',
      price: 980,
      description: 'Vintage-inspired ring with intricate details in rose gold',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80',
      featured: false
    },
    {
      id: 9,
      name: 'Aquamarine Pendant',
      category: 'necklace',
      metal: 'White Gold',
      price: 1150,
      description: 'Serene aquamarine gemstone on white gold chain',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80',
      featured: false
    },
    {
      id: 10,
      name: 'Diamond Hoop Earrings',
      category: 'earring',
      metal: '18K Gold',
      price: 890,
      description: 'Elegant diamond-studded hoop earrings in 18K gold',
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80',
      featured: false
    },
    {
      id: 11,
      name: 'Charm Bracelet',
      category: 'bracelet',
      metal: 'Sterling Silver',
      price: 450,
      description: 'Personalized charm bracelet in sterling silver',
      image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80',
      featured: false
    },
    {
      id: 12,
      name: 'Topaz Statement Ring',
      category: 'ring',
      metal: '24K Gold',
      price: 1580,
      description: 'Bold blue topaz ring with 24K gold setting',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80',
      featured: false
    }
  ];

  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
    const metalMatch = selectedMetal === 'all' || product.metal === selectedMetal;
    
    let priceMatch = true;
    if (priceRange !== 'all') {
      if (priceRange === '0-500') priceMatch = product.price < 500;
      else if (priceRange === '500-1000') priceMatch = product.price >= 500 && product.price < 1000;
      else if (priceRange === '1000-2000') priceMatch = product.price >= 1000 && product.price < 2000;
      else if (priceRange === '2000+') priceMatch = product.price >= 2000;
    }
    
    return categoryMatch && metalMatch && priceMatch;
  });

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#1a1a1a' }}>
      {/* Custom CSS for dropdown options */}
      <style>{`
        select.marketplace-select option {
          background: rgba(0, 0, 0, 0.3) !important;
          background-color: rgba(0, 0, 0, 0.3) !important;
          color: white !important;
          padding: 10px;
          font-weight: 400;
        }
        select.marketplace-select option:hover {
          background: rgba(0, 0, 0, 0.3) !important;
          background-color: rgba(0, 0, 0, 0.3) !important;
          font-weight: 700 !important;
          color: white !important;
          outline: none !important;
          box-shadow: none !important;
        }
        select.marketplace-select option:focus {
          background: rgba(0, 0, 0, 0.3) !important;
          background-color: rgba(0, 0, 0, 0.3) !important;
          font-weight: 700 !important;
          color: white !important;
          outline: none !important;
          box-shadow: none !important;
        }
        select.marketplace-select option:active {
          background: rgba(0, 0, 0, 0.3) !important;
          background-color: rgba(0, 0, 0, 0.3) !important;
          font-weight: 700 !important;
          color: white !important;
          outline: none !important;
          box-shadow: none !important;
        }
        select.marketplace-select option:checked {
          background: rgba(251, 191, 36, 0.3) !important;
          background-color: rgba(251, 191, 36, 0.3) !important;
          font-weight: 700 !important;
          color: white !important;
          outline: none !important;
          box-shadow: none !important;
        }
        select.marketplace-select option[selected] {
          background: rgba(251, 191, 36, 0.3) !important;
          background-color: rgba(251, 191, 36, 0.3) !important;
          font-weight: 700 !important;
          color: white !important;
          outline: none !important;
          box-shadow: none !important;
        }
        /* Override browser defaults */
        select.marketplace-select option::selection {
          background: rgba(0, 0, 0, 0.3) !important;
          background-color: rgba(0, 0, 0, 0.3) !important;
        }
        select.marketplace-select option::-moz-selection {
          background: rgba(0, 0, 0, 0.3) !important;
          background-color: rgba(0, 0, 0, 0.3) !important;
        }
        /* Windows/Chrome specific */
        select.marketplace-select option:focus-visible {
          outline: none !important;
          background: rgba(0, 0, 0, 0.3) !important;
        }
      `}</style>
      {/* Fixed Background */}
      <div style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        width: '100%',
        height: '100vh',
        zIndex: 0, 
        overflow: 'hidden',
        backgroundColor: '#1a1a1a'
      }}>
        <motion.div
          style={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '150%',
            willChange: 'transform'
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
            <div
              style={{
                width: '100%',
                height: '100%',
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1920&q=80')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                filter: 'brightness(0.8) contrast(1.05)'
              }}
            />
          </motion.div>
        </motion.div>
        <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.3), transparent, rgba(0, 0, 0, 0.5))' }} />
      </div>

      {/* Main Content */}
      <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', zIndex: 1 }}>
        <Navigation isLoaded={isLoaded} />
        
        {/* Centered Container */}
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
            {/* Main Card - All Content in One Box */}
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
                  alt="Galagama Gem & Jewellery" 
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
                Jewelry Marketplace
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
                Discover our exquisite collection of handcrafted jewelry
              </motion.p>

              {/* Filters Section */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                style={{ marginBottom: '40px' }}
              >
                <h2 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '24px',
                  fontWeight: '600',
                  marginBottom: '20px',
                  color: 'white'
                }}>
                  Filter Products
                </h2>
                
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '20px',
                  marginBottom: '20px'
                }}>
                  {/* Category Filter */}
                  <div>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '8px', 
                      fontWeight: '500',
                      color: 'rgba(255, 255, 255, 0.9)',
                      fontSize: '0.95rem'
                    }}>
                      Category
                    </label>
                    <select
                      className="marketplace-select"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        border: '1px solid rgba(251, 191, 36, 0.3)',
                        fontSize: '1rem',
                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                        backdropFilter: 'blur(5px)',
                        color: 'white',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = 'rgb(251, 191, 36)';
                        e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(251, 191, 36, 0.3)';
                        e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
                      }}
                    >
                      {categories.map(cat => (
                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Metal Filter */}
                  <div>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '8px', 
                      fontWeight: '500',
                      color: 'rgba(255, 255, 255, 0.9)',
                      fontSize: '0.95rem'
                    }}>
                      Metal Type
                    </label>
                    <select
                      className="marketplace-select"
                      value={selectedMetal}
                      onChange={(e) => setSelectedMetal(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        border: '1px solid rgba(251, 191, 36, 0.3)',
                        fontSize: '1rem',
                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                        backdropFilter: 'blur(5px)',
                        color: 'white',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = 'rgb(251, 191, 36)';
                        e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(251, 191, 36, 0.3)';
                        e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
                      }}
                    >
                      {metals.map(metal => (
                        <option key={metal.value} value={metal.value}>{metal.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Price Range Filter */}
                  <div>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '8px', 
                      fontWeight: '500',
                      color: 'rgba(255, 255, 255, 0.9)',
                      fontSize: '0.95rem'
                    }}>
                      Price Range
                    </label>
                    <select
                      className="marketplace-select"
                      value={priceRange}
                      onChange={(e) => setPriceRange(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        border: '1px solid rgba(251, 191, 36, 0.3)',
                        fontSize: '1rem',
                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                        backdropFilter: 'blur(5px)',
                        color: 'white',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = 'rgb(251, 191, 36)';
                        e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(251, 191, 36, 0.3)';
                        e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
                      }}
                    >
                      {priceRanges.map(range => (
                        <option key={range.value} value={range.value}>{range.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px',
                  paddingTop: '8px'
                }}>
                  <span style={{ 
                    color: 'rgba(255, 255, 255, 0.85)', 
                    fontSize: '0.95rem'
                  }}>
                    Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                  </span>
                  {(selectedCategory !== 'all' || selectedMetal !== 'all' || priceRange !== 'all') && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setSelectedCategory('all');
                        setSelectedMetal('all');
                        setPriceRange('all');
                      }}
                      style={{
                        padding: '8px 16px',
                        borderRadius: '8px',
                        border: '1px solid rgb(251, 191, 36)',
                        background: 'rgba(251, 191, 36, 0.2)',
                        color: 'rgb(251, 191, 36)',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 2px 8px rgba(251, 191, 36, 0.3)'
                      }}
                    >
                      Clear Filters
                    </motion.button>
                  )}
                </div>
              </motion.div>

              {/* Products Grid */}
              {filteredProducts.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    textAlign: 'center',
                    padding: '60px 20px',
                    color: 'rgba(255, 255, 255, 0.8)',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <p style={{ fontSize: '1.5rem', marginBottom: '12px', fontWeight: '600' }}>No products found</p>
                  <p style={{ fontSize: '1rem' }}>Try adjusting your filters</p>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 + index * 0.05 }}
                      style={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.08)',
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                        position: 'relative',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                      }}
                      whileHover={{
                        y: -8,
                        boxShadow: '0 12px 40px rgba(251, 191, 36, 0.3)'
                      }}
                    >
                      {product.featured && (
                        <div style={{
                          position: 'absolute',
                          top: '12px',
                          right: '12px',
                          background: 'linear-gradient(to right, rgb(251, 191, 36), rgb(217, 119, 6))',
                          color: 'black',
                          padding: '6px 12px',
                          borderRadius: '6px',
                          fontSize: '0.75rem',
                          fontWeight: '700',
                          zIndex: 10,
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                          boxShadow: '0 4px 12px rgba(251, 191, 36, 0.5)'
                        }}>
                          Featured
                        </div>
                      )}
                      <motion.div
                        className="aspect-square overflow-hidden"
                        style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                          style={{ objectPosition: 'center' }}
                        />
                      </motion.div>
                      <div className="p-8">
                        <h3 className="mb-2" style={{ 
                          fontSize: '1.5rem', 
                          fontWeight: '600',
                          color: 'white'
                        }}>
                          {product.name}
                        </h3>
                        <p style={{ 
                          fontSize: '0.95rem', 
                          lineHeight: '1.6',
                          color: 'rgba(255, 255, 255, 0.8)',
                          marginBottom: '12px'
                        }}>
                          {product.description}
                        </p>
                        <p style={{
                          fontSize: '0.875rem',
                          color: 'rgba(251, 191, 36, 0.9)',
                          marginBottom: '12px',
                          fontWeight: '600'
                        }}>
                          {product.metal}
                        </p>
                        <p className="mb-4" style={{
                          background: 'linear-gradient(to right, rgb(251, 191, 36), rgb(217, 119, 6))',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                          fontWeight: '700',
                          fontSize: '1.75rem'
                        }}>
                          ${product.price.toLocaleString()}
                        </p>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            addToCart({
                              id: `marketplace-${product.id}-${Date.now()}`,
                              category: product.category,
                              metal: product.metal,
                              metalPrice: product.price,
                              size: 'M',
                              estimatedPrice: product.price
                            });
                            alert(`${product.name} added to cart!`);
                          }}
                          style={{
                            width: '100%',
                            padding: '12px 24px',
                            background: 'linear-gradient(to right, rgb(251, 191, 36), rgb(217, 119, 6))',
                            color: 'black',
                            fontWeight: '600',
                            borderRadius: '8px',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 4px 15px rgba(251, 191, 36, 0.4)'
                          }}
                        >
                          Add to Cart
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <Footer />
      </div>
    </div>
  );
}
