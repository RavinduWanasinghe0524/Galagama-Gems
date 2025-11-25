import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { Toast } from './Toast';
import logoImage from '../assets/f9f3557d671d8125a616ddcb69e2a0d761511cdc.png';
import gold18kImage from '../assets/custom_design/18k_gold.png';
import roseGoldImage from '../assets/custom_design/rose_gold.png';
import emeraldImage from '../assets/custom_design/emerald.png';
import rubyImage from '../assets/custom_design/ruby.png';
import amethystImage from '../assets/custom_design/amethyst.png';
import topazImage from '../assets/custom_design/topaz.jpg';
import garnetImage from '../assets/custom_design/garnet.jpg';
import aquamarineImage from '../assets/custom_design/aquamarine.jpg';
import opalImage from '../assets/custom_design/opal.jpg';
import diamondImage from '../assets/custom_design/diamond.png';
import sapphireImage from '../assets/custom_design/sapphire.png';
import turquoiseImage from '../assets/custom_design/turquoise.jpg';
import cubicZirconiaImage from '../assets/custom_design/cubic_zirconia.jpg';
import moissaniteImage from '../assets/custom_design/moissanite.jpg';
import platinumImage from '../assets/custom_design/platinum.png';
import gold24kImage from '../assets/custom_design/gold_24k.png';
import whiteGoldImage from '../assets/custom_design/white_gold.png';
import silverImage from '../assets/custom_design/silver.png';
import { useCart } from '../context/CartContext';

export function CustomDesign() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedMetal, setSelectedMetal] = useState('');
  const [selectedGemType, setSelectedGemType] = useState('');
  const [selectedGemstone, setSelectedGemstone] = useState('');
  const [engravingText, setEngravingText] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [estimatedPrice, setEstimatedPrice] = useState(0);

  // Canvas State & Refs for Smoothness
  const [selectedColor, setSelectedColor] = useState('#FBBF24'); // Default Gold
  const [strokeWidth, setStrokeWidth] = useState(3);
  const [showGrid, setShowGrid] = useState(true);
  const [is3DView, setIs3DView] = useState(false);
  const [shapeMaterial, setShapeMaterial] = useState<'gold' | 'silver' | 'rose' | 'crystal'>('gold');
  
  // Refs for performance (avoid re-renders during drawing)
  const pathsRef = useRef<any[]>([]);
  const currentPathRef = useRef<any[]>([]);
  const isDrawingRef = useRef(false);
  
  // History for Undo/Redo
  const historyRef = useRef<any[][]>([]);
  const historyStepRef = useRef(-1);

  // Existing state
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const backgroundCanvasRef = useRef<HTMLCanvasElement>(null);
  const [uploadedDesign, setUploadedDesign] = useState<string | null>(null);
  const [designMode, setDesignMode] = useState<'draw' | 'shapes' | 'upload' | null>(null);
  const [selectedShape, setSelectedShape] = useState<string | null>(null);
  const [drawnShapes, setDrawnShapes] = useState<any[]>([]);
  const [drawMode, setDrawMode] = useState<'pen' | 'eraser' | 'line'>('pen');
  const [selectedShapeIndex, setSelectedShapeIndex] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [lineStart, setLineStart] = useState<{ x: number, y: number } | null>(null);


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
      image: gold24kImage
    },
    {
      value: 'gold-18k',
      label: '18K Gold',
      price: 350,
      color: '#F4C430',
      image: gold18kImage
    },
    {
      value: 'white-gold',
      label: 'White Gold',
      price: 400,
      color: '#E5E4E2',
      image: whiteGoldImage
    },
    {
      value: 'rose-gold',
      label: 'Rose Gold',
      price: 420,
      color: '#B76E79',
      image: roseGoldImage
    },
    {
      value: 'platinum',
      label: 'Platinum',
      price: 600,
      color: '#E5E4E2',
      image: platinumImage
    },
    {
      value: 'silver',
      label: 'Sterling Silver',
      price: 150,
      color: '#C0C0C0',
      image: silverImage
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
        image: diamondImage
      },
      {
        value: 'ruby',
        label: 'Ruby',
        price: 600,
        color: '#E0115F',
        image: rubyImage
      },
      {
        value: 'sapphire',
        label: 'Sapphire',
        price: 550,
        color: '#0F52BA',
        image: sapphireImage
      },
      {
        value: 'emerald',
        label: 'Emerald',
        price: 650,
        color: '#50C878',
        image: emeraldImage
      },
    ],
    'semi-precious': [
      {
        value: 'amethyst',
        label: 'Amethyst',
        price: 150,
        color: '#9966CC',
        image: amethystImage
      },
      {
        value: 'topaz',
        label: 'Topaz',
        price: 180,
        color: '#FFC87C',
        image: topazImage
      },
      {
        value: 'aquamarine',
        label: 'Aquamarine',
        price: 200,
        color: '#7FFFD4',
        image: aquamarineImage
      },
      {
        value: 'garnet',
        label: 'Garnet',
        price: 120,
        color: '#733635',
        image: garnetImage
      },
      {
        value: 'opal',
        label: 'Opal',
        price: 220,
        color: '#A8C3BC',
        image: opalImage
      },
      {
        value: 'turquoise',
        label: 'Turquoise',
        price: 100,
        color: '#40E0D0',
        image: turquoiseImage
      },
    ],
    synthetic: [
      {
        value: 'cubic-zirconia',
        label: 'Cubic Zirconia',
        price: 50,
        color: '#FFFFFF',
        image: cubicZirconiaImage
      },
      {
        value: 'moissanite',
        label: 'Moissanite',
        price: 250,
        color: '#F0EAD6',
        image: moissaniteImage
      },
    ],
    none: [],
  };

  const sizes = [
    { value: 'XS', price: 0 },
    { value: 'S', price: 50 },
    { value: 'M', price: 100 },
    { value: 'L', price: 150 },
    { value: 'XL', price: 200 }
  ];

  // Canvas drawing setup with eraser and line tool - draws on background layer
  // History Management
  const saveHistory = () => {
    const newHistory = historyRef.current.slice(0, historyStepRef.current + 1);
    newHistory.push(JSON.parse(JSON.stringify(pathsRef.current)));
    historyRef.current = newHistory;
    historyStepRef.current = newHistory.length - 1;
  };

  const undo = () => {
    if (historyStepRef.current >= 0) {
      historyStepRef.current--;
      if (historyStepRef.current >= 0) {
        pathsRef.current = JSON.parse(JSON.stringify(historyRef.current[historyStepRef.current]));
      } else {
        pathsRef.current = [];
      }
    }
  };

  const redo = () => {
    if (historyStepRef.current < historyRef.current.length - 1) {
      historyStepRef.current++;
      pathsRef.current = JSON.parse(JSON.stringify(historyRef.current[historyStepRef.current]));
    }
  };

  // Render Loop
  const renderCanvas = () => {
    const canvas = backgroundCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Grid
    if (showGrid) {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      const gridSize = 50;
      for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    }

    // Draw Saved Paths
    pathsRef.current.forEach(path => {
      if (path.points.length < 2 && path.mode !== 'dot') return;
      ctx.beginPath();
      ctx.strokeStyle = path.color;
      ctx.lineWidth = path.width;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.globalCompositeOperation = path.mode === 'eraser' ? 'destination-out' : 'source-over';
      
      if (path.points.length > 0) {
        ctx.moveTo(path.points[0].x, path.points[0].y);
        for (let i = 1; i < path.points.length; i++) {
          ctx.lineTo(path.points[i].x, path.points[i].y);
        }
      }
      ctx.stroke();
    });

    // Draw Current Path
    if (currentPathRef.current.length > 0) {
      ctx.beginPath();
      ctx.strokeStyle = drawMode === 'eraser' ? 'rgba(0,0,0,1)' : selectedColor;
      ctx.lineWidth = strokeWidth;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.globalCompositeOperation = drawMode === 'eraser' ? 'destination-out' : 'source-over';

      if (drawMode === 'line' && lineStart) {
         ctx.moveTo(lineStart.x, lineStart.y);
         const lastPoint = currentPathRef.current[currentPathRef.current.length - 1];
         ctx.lineTo(lastPoint.x, lastPoint.y);
      } else {
        ctx.moveTo(currentPathRef.current[0].x, currentPathRef.current[0].y);
        for (let i = 1; i < currentPathRef.current.length; i++) {
          ctx.lineTo(currentPathRef.current[i].x, currentPathRef.current[i].y);
        }
      }
      ctx.stroke();
    }
    
    ctx.globalCompositeOperation = 'source-over';
  };

  // Animation Loop
  useEffect(() => {
    let animationFrameId: number;
    const loop = () => {
      renderCanvas();
      animationFrameId = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(animationFrameId);
  }, [selectedColor, strokeWidth, showGrid, drawMode, lineStart]);

  // Drawing Event Handlers
  useEffect(() => {
    const canvas = backgroundCanvasRef.current;
    if (!canvas) return;

    const getPos = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = 'touches' in e ? (e as TouchEvent).touches[0].clientX : (e as MouseEvent).clientX;
      const clientY = 'touches' in e ? (e as TouchEvent).touches[0].clientY : (e as MouseEvent).clientY;
      return {
        x: (clientX - rect.left) * (canvas.width / rect.width),
        y: (clientY - rect.top) * (canvas.height / rect.height)
      };
    };

    const startDrawing = (e: MouseEvent | TouchEvent) => {
      if (designMode !== 'draw') return;
      e.preventDefault();
      isDrawingRef.current = true;
      const pos = getPos(e);
      
      if (drawMode === 'line') {
        if (!lineStart) {
          setLineStart(pos);
          currentPathRef.current = [pos];
        } else {
          const newPath = {
            points: [lineStart, pos],
            color: selectedColor,
            width: strokeWidth,
            mode: 'pen'
          };
          pathsRef.current.push(newPath);
          saveHistory();
          setLineStart(null);
          currentPathRef.current = [];
          isDrawingRef.current = false;
        }
      } else {
        currentPathRef.current = [pos];
      }
    };

    const draw = (e: MouseEvent | TouchEvent) => {
      if (!isDrawingRef.current || designMode !== 'draw') return;
      e.preventDefault();
      const pos = getPos(e);

      if (drawMode === 'line') {
        if (lineStart) {
           currentPathRef.current = [lineStart, pos];
        }
      } else {
        currentPathRef.current.push(pos);
      }
    };

    const stopDrawing = () => {
      if (!isDrawingRef.current || designMode !== 'draw') return;
      if (drawMode === 'line') return; 
      
      isDrawingRef.current = false;
      if (currentPathRef.current.length > 0) {
        const newPath = {
          points: [...currentPathRef.current],
          color: selectedColor,
          width: strokeWidth,
          mode: drawMode
        };
        pathsRef.current.push(newPath);
        saveHistory();
        currentPathRef.current = [];
      }
    };

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    canvas.addEventListener('touchstart', startDrawing);
    canvas.addEventListener('touchmove', draw);
    canvas.addEventListener('touchend', stopDrawing);

    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', stopDrawing);
      canvas.removeEventListener('mouseout', stopDrawing);
      canvas.removeEventListener('touchstart', startDrawing);
      canvas.removeEventListener('touchmove', draw);
      canvas.removeEventListener('touchend', stopDrawing);
    };
  }, [designMode, drawMode, selectedColor, strokeWidth, lineStart]);

  // Shape Interaction
  const dragStateRef = useRef<{
    isDragging: boolean;
    isResizing: boolean;
    dragIndex: number | null;
    offsetX: number;
    offsetY: number;
    initialSize: number;
    resizeStartDist: number;
    startX: number;
    startY: number;
  }>({
    isDragging: false,
    isResizing: false,
    dragIndex: null,
    offsetX: 0,
    offsetY: 0,
    initialSize: 0,
    resizeStartDist: 0,
    startX: 0,
    startY: 0
  });

  // Keep a ref to drawnShapes to access latest without re-binding events
  const shapesRef = useRef(drawnShapes);
  useEffect(() => {
    shapesRef.current = drawnShapes;
  }, [drawnShapes]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || designMode !== 'shapes') return;

    const getDistance = (x1: number, y1: number, x2: number, y2: number) => {
      return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    };

    const isNearEdge = (mouseX: number, mouseY: number, shapeX: number, shapeY: number, size: number) => {
      const distance = getDistance(mouseX, mouseY, shapeX, shapeY);
      return Math.abs(distance - size / 2) < 20; 
    };

    const snapToGrid = (value: number) => {
      if (!showGrid) return value;
      const gridSize = 20;
      return Math.round(value / gridSize) * gridSize;
    };

    const handleMouseDown = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = (e.clientX - rect.left) * (canvas.width / rect.width);
      const clickY = (e.clientY - rect.top) * (canvas.height / rect.height);
      const currentShapes = shapesRef.current;

      for (let i = currentShapes.length - 1; i >= 0; i--) {
        const { x, y, size = 80 } = currentShapes[i];
        const distance = getDistance(clickX, clickY, x, y);

        if (isNearEdge(clickX, clickY, x, y, size)) {
          setSelectedShapeIndex(i);
          setIsResizing(true);
          dragStateRef.current = {
            ...dragStateRef.current,
            isResizing: true,
            dragIndex: i,
            initialSize: size,
            resizeStartDist: distance
          };
          e.preventDefault();
          return;
        }

        if (distance < size / 2) {
          setSelectedShapeIndex(i);
          setIsDragging(true);
          dragStateRef.current = {
            ...dragStateRef.current,
            isDragging: true,
            dragIndex: i,
            offsetX: clickX - x,
            offsetY: clickY - y,
            startX: x,
            startY: y
          };
          e.preventDefault();
          return;
        }
      }

      setSelectedShapeIndex(null);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = (e.clientX - rect.left) * (canvas.width / rect.width);
      const mouseY = (e.clientY - rect.top) * (canvas.height / rect.height);
      const { isDragging, isResizing, dragIndex, offsetX, offsetY, initialSize, resizeStartDist } = dragStateRef.current;
      const currentShapes = shapesRef.current;

      if (!isDragging && !isResizing && selectedShapeIndex !== null && currentShapes[selectedShapeIndex]) {
        const { x, y, size = 80 } = currentShapes[selectedShapeIndex];
        if (isNearEdge(mouseX, mouseY, x, y, size)) {
          canvas.style.cursor = 'nwse-resize';
        } else if (getDistance(mouseX, mouseY, x, y) < size / 2) {
          canvas.style.cursor = 'move';
        } else {
          canvas.style.cursor = 'default';
        }
      }

      if (isResizing && dragIndex !== null) {
        e.preventDefault();
        const { x, y } = currentShapes[dragIndex];
        const currentDist = getDistance(mouseX, mouseY, x, y);
        const sizeDelta = (currentDist - resizeStartDist) * 2;
        const newSize = Math.max(30, Math.min(300, initialSize + sizeDelta));

        // Update directly for smoothness
        const updated = [...currentShapes];
        updated[dragIndex] = { ...updated[dragIndex], size: newSize };
        setDrawnShapes(updated);
      } else if (isDragging && dragIndex !== null) {
        e.preventDefault();
        let newX = mouseX - offsetX;
        let newY = mouseY - offsetY;

        // Apply Snap to Grid
        if (showGrid) {
          newX = snapToGrid(newX);
          newY = snapToGrid(newY);
        }

        // Update directly for smoothness
        const updated = [...currentShapes];
        updated[dragIndex] = { ...updated[dragIndex], x: newX, y: newY };
        setDrawnShapes(updated);
      }
    };

    const handleMouseUp = () => {
      dragStateRef.current = {
        ...dragStateRef.current,
        isDragging: false,
        isResizing: false,
        dragIndex: null
      };
      setIsDragging(false);
      setIsResizing(false);
      
      if (selectedShapeIndex !== null) {
        canvas.style.cursor = 'move';
      } else {
        canvas.style.cursor = 'default';
      }
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseleave', handleMouseUp);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mouseleave', handleMouseUp);
    };
  }, [designMode, selectedShapeIndex, showGrid]);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const bgCanvas = backgroundCanvasRef.current;

    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }

    if (bgCanvas) {
      const bgCtx = bgCanvas.getContext('2d');
      if (bgCtx) {
        bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
      }
    }

    setDrawnShapes([]);
    setSelectedShapeIndex(null);
    setLineStart(null);
  };

  const saveDesign = () => {
    const canvas = canvasRef.current;
    const bgCanvas = backgroundCanvasRef.current;

    if (!canvas || !bgCanvas) return;

    // Create a temporary canvas to merge both layers
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const tempCtx = tempCanvas.getContext('2d');

    if (!tempCtx) return;

    // Draw background (drawings) first
    tempCtx.drawImage(bgCanvas, 0, 0);
    // Then draw shapes on top
    tempCtx.drawImage(canvas, 0, 0);

    // Convert to image and download
    tempCanvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = `jewelry-design-${Date.now()}.png`;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    }, 'image/png');
  };

  const redrawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawnShapes.forEach((shapeData, index) => {
      const { shape, x, y, size = 80 } = shapeData;

      // Create 3D Gradient based on material
      let gradient;
      if (shapeMaterial === 'gold') {
        gradient = ctx.createLinearGradient(x - size/2, y - size/2, x + size/2, y + size/2);
        gradient.addColorStop(0, '#FBBF24');
        gradient.addColorStop(0.3, '#FFF7ED');
        gradient.addColorStop(0.6, '#D97706');
        gradient.addColorStop(1, '#F59E0B');
      } else if (shapeMaterial === 'silver') {
        gradient = ctx.createLinearGradient(x - size/2, y - size/2, x + size/2, y + size/2);
        gradient.addColorStop(0, '#E5E7EB');
        gradient.addColorStop(0.3, '#FFFFFF');
        gradient.addColorStop(0.6, '#9CA3AF');
        gradient.addColorStop(1, '#D1D5DB');
      } else if (shapeMaterial === 'rose') {
        gradient = ctx.createLinearGradient(x - size/2, y - size/2, x + size/2, y + size/2);
        gradient.addColorStop(0, '#FDA4AF');
        gradient.addColorStop(0.3, '#FFF1F2');
        gradient.addColorStop(0.6, '#BE123C');
        gradient.addColorStop(1, '#FB7185');
      } else {
        // Crystal/Gem
        gradient = ctx.createRadialGradient(x - size/4, y - size/4, size/10, x, y, size/2);
        gradient.addColorStop(0, '#FFFFFF');
        gradient.addColorStop(0.5, '#60A5FA');
        gradient.addColorStop(1, '#1E3A8A');
      }

      ctx.fillStyle = gradient;
      
      // Add 3D Shadow/Glow
      ctx.shadowColor = selectedShapeIndex === index ? '#FBBF24' : 'rgba(0,0,0,0.5)';
      ctx.shadowBlur = selectedShapeIndex === index ? 20 : 10;
      ctx.shadowOffsetX = 5;
      ctx.shadowOffsetY = 5;

      // Stroke for definition
      ctx.strokeStyle = 'rgba(255,255,255,0.4)';
      ctx.lineWidth = 2;

      switch (shape) {
        case 'circle':
          ctx.beginPath();
          ctx.arc(x, y, size / 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          // Add highlight
          ctx.beginPath();
          ctx.arc(x - size/6, y - size/6, size/8, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255,255,255,0.6)';
          ctx.fill();
          break;
        case 'square':
          ctx.beginPath();
          ctx.rect(x - size / 2, y - size / 2, size, size);
          ctx.fill();
          ctx.stroke();
          // Bevel effect
          ctx.beginPath();
          ctx.moveTo(x - size/2, y + size/2);
          ctx.lineTo(x - size/2, y - size/2);
          ctx.lineTo(x + size/2, y - size/2);
          ctx.strokeStyle = 'rgba(255,255,255,0.5)';
          ctx.stroke();
          break;
        case 'triangle':
          ctx.beginPath();
          ctx.moveTo(x, y - size / 2);
          ctx.lineTo(x - size / 2, y + size / 2);
          ctx.lineTo(x + size / 2, y + size / 2);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          break;
        case 'diamond':
          ctx.beginPath();
          ctx.moveTo(x, y - size / 2);
          ctx.lineTo(x + size / 2, y);
          ctx.lineTo(x, y + size / 2);
          ctx.lineTo(x - size / 2, y);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          // Facet lines
          ctx.beginPath();
          ctx.moveTo(x, y - size/2);
          ctx.lineTo(x, y + size/2);
          ctx.moveTo(x - size/2, y);
          ctx.lineTo(x + size/2, y);
          ctx.strokeStyle = 'rgba(255,255,255,0.3)';
          ctx.stroke();
          break;
        case 'star':
          ctx.beginPath();
          for (let i = 0; i < 5; i++) {
            const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
            const sx = x + Math.cos(angle) * size / 2;
            const sy = y + Math.sin(angle) * size / 2;
            if (i === 0) ctx.moveTo(sx, sy);
            else ctx.lineTo(sx, sy);

            const innerAngle = angle + Math.PI / 5;
            const innerX = x + Math.cos(innerAngle) * size / 4;
            const innerY = y + Math.sin(innerAngle) * size / 4;
            ctx.lineTo(innerX, innerY);
          }
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          break;
        case 'heart':
          ctx.beginPath();
          const topCurveHeight = size * 0.3;
          ctx.moveTo(x, y + size / 4);
          ctx.bezierCurveTo(x, y, x - size / 2, y - topCurveHeight, x - size / 2, y + size / 8);
          ctx.bezierCurveTo(x - size / 2, y + size / 4, x, y + size / 2, x, y + size / 2);
          ctx.bezierCurveTo(x, y + size / 2, x + size / 2, y + size / 4, x + size / 2, y + size / 8);
          ctx.bezierCurveTo(x + size / 2, y - topCurveHeight, x, y, x, y + size / 4);
          ctx.fill();
          ctx.stroke();
          break;
        case 'oval':
          ctx.beginPath();
          ctx.ellipse(x, y, size / 2, size / 3, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          break;
        case 'hexagon':
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI * 2 * i) / 6;
            const hx = x + Math.cos(angle) * size / 2;
            const hy = y + Math.sin(angle) * size / 2;
            if (i === 0) ctx.moveTo(hx, hy);
            else ctx.lineTo(hx, hy);
          }
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          break;
        case 'flower':
          ctx.beginPath();
          for (let i = 0; i < 8; i++) {
            const angle = (Math.PI * 2 * i) / 8;
            const petalX = x + Math.cos(angle) * size / 3;
            const petalY = y + Math.sin(angle) * size / 3;
            ctx.moveTo(x, y);
            ctx.arc(petalX, petalY, size / 6, 0, Math.PI * 2);
          }
          ctx.fill();
          ctx.stroke();
          // Center circle
          ctx.beginPath();
          ctx.arc(x, y, size / 8, 0, Math.PI * 2);
          ctx.fillStyle = '#FFF';
          ctx.fill();
          break;
        case 'moon':
          ctx.beginPath();
          ctx.arc(x, y, size / 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          // Cut out for crescent
          ctx.globalCompositeOperation = 'destination-out';
          ctx.beginPath();
          ctx.arc(x + size / 4, y - size / 8, size / 2.2, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalCompositeOperation = 'source-over';
          break;
      }
    });
  };

  useEffect(() => {
    if (designMode === 'shapes') {
      redrawCanvas();
    }
  }, [drawnShapes, selectedShapeIndex, designMode, shapeMaterial]);

  const addShapeToCanvas = (shape: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const size = 80;

    setDrawnShapes([...drawnShapes, { shape, x: centerX, y: centerY, size }]);
  };

  const deleteSelectedShape = () => {
    if (selectedShapeIndex === null) return;
    const updatedShapes = drawnShapes.filter((_, index) => index !== selectedShapeIndex);
    setDrawnShapes(updatedShapes);
    setSelectedShapeIndex(null);
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

    if (selectedSize) {
      const size = sizes.find(s => s.value === selectedSize);
      if (size) price += size.price;
    }

    if (engravingText) price += 80;
    if (uploadedDesign || designMode) price += 150; // Custom design fee

    setEstimatedPrice(price);
  }, [selectedMetal, selectedGemType, selectedGemstone, selectedSize, engravingText, uploadedDesign, designMode]);

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
                          {/* Mode Selection Tabs */}
                          <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                            gap: '12px',
                            marginBottom: '24px'
                          }}>
                            <motion.button
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              onClick={() => {
                                setDesignMode('draw');
                                setIsCanvasDrawing(true);
                                setUploadedDesign(null);
                              }}
                              style={{
                                padding: '16px 20px',
                                background: designMode === 'draw'
                                  ? 'linear-gradient(135deg, rgba(251, 191, 36, 0.3) 0%, rgba(202, 138, 4, 0.3) 100%)'
                                  : 'rgba(255, 255, 255, 0.05)',
                                border: designMode === 'draw'
                                  ? '2px solid rgb(251, 191, 36)'
                                  : '1px solid rgba(255, 255, 255, 0.2)',
                                borderRadius: '10px',
                                color: 'white',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: '600',
                                transition: 'all 0.3s',
                                textAlign: 'center'
                              }}
                            >
                              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✏️</div>
                              <div>Freehand Draw</div>
                            </motion.button>

                            <motion.button
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              onClick={() => {
                                setDesignMode('shapes');
                                setIsCanvasDrawing(false);
                                setUploadedDesign(null);
                                const canvas = canvasRef.current;
                                if (canvas) {
                                  const ctx = canvas.getContext('2d');
                                  if (ctx) {
                                    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
                                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                                  }
                                }
                              }}
                              style={{
                                padding: '16px 20px',
                                background: designMode === 'shapes'
                                  ? 'linear-gradient(135deg, rgba(251, 191, 36, 0.3) 0%, rgba(202, 138, 4, 0.3) 100%)'
                                  : 'rgba(255, 255, 255, 0.05)',
                                border: designMode === 'shapes'
                                  ? '2px solid rgb(251, 191, 36)'
                                  : '1px solid rgba(255, 255, 255, 0.2)',
                                borderRadius: '10px',
                                color: 'white',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: '600',
                                transition: 'all 0.3s',
                                textAlign: 'center'
                              }}
                            >
                              <div style={{ fontSize: '28px', marginBottom: '8px' }}>⬡</div>
                              <div>3D Shapes</div>
                            </motion.button>

                            <motion.button
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              onClick={() => {
                                setDesignMode('upload');
                                setIsCanvasDrawing(false);
                              }}
                              style={{
                                padding: '16px 20px',
                                background: designMode === 'upload'
                                  ? 'linear-gradient(135deg, rgba(251, 191, 36, 0.3) 0%, rgba(202, 138, 4, 0.3) 100%)'
                                  : 'rgba(255, 255, 255, 0.05)',
                                border: designMode === 'upload'
                                  ? '2px solid rgb(251, 191, 36)'
                                  : '1px solid rgba(255, 255, 255, 0.2)',
                                borderRadius: '10px',
                                color: 'white',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: '600',
                                transition: 'all 0.3s',
                                textAlign: 'center'
                              }}
                            >
                              <div style={{ fontSize: '28px', marginBottom: '8px' }}>📤</div>
                              <div>Upload Image</div>
                            </motion.button>
                          </div>

                          {/* Canvas and Shapes Section */}
                          {(designMode === 'draw' || designMode === 'shapes') && (
                            <div style={{ display: 'flex', gap: '20px', flexDirection: 'row' }}>
                              {/* Shape Palette - Only show for shapes mode */}
                              {designMode === 'shapes' && (
                                <motion.div
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  style={{
                                    minWidth: '140px',
                                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                                    borderRadius: '10px',
                                    padding: '16px',
                                    border: '1px solid rgba(255, 255, 255, 0.1)'
                                  }}
                                >
                                  <div style={{
                                    color: 'rgba(255, 255, 255, 0.8)',
                                    fontSize: '13px',
                                    fontWeight: '600',
                                    marginBottom: '16px',
                                    textAlign: 'center'
                                  }}>
                                    Shapes & Designs
                                  </div>
                                  {[
                                    { value: 'circle', icon: '⚪', label: 'Circle' },
                                    { value: 'square', icon: '⬜', label: 'Square' },
                                    { value: 'triangle', icon: '🔺', label: 'Triangle' },
                                    { value: 'diamond', icon: '💎', label: 'Diamond' },
                                    { value: 'star', icon: '⭐', label: 'Star' },
                                    { value: 'heart', icon: '❤️', label: 'Heart' },
                                    { value: 'oval', icon: '⬭', label: 'Oval' },
                                    { value: 'hexagon', icon: '⬡', label: 'Hexagon' },
                                    { value: 'flower', icon: '🌸', label: 'Flower' },
                                    { value: 'moon', icon: '🌙', label: 'Crescent' }
                                  ].map((shape) => (
                                    <motion.button
                                      key={shape.value}
                                      whileHover={{ scale: 1.1, x: 5 }}
                                      whileTap={{ scale: 0.95 }}
                                      onClick={() => {
                                        setSelectedShape(shape.value);
                                        addShapeToCanvas(shape.value);
                                      }}
                                      style={{
                                        width: '100%',
                                        padding: '12px',
                                        marginBottom: '8px',
                                        backgroundColor: selectedShape === shape.value
                                          ? 'rgba(251, 191, 36, 0.3)'
                                          : 'rgba(255, 255, 255, 0.05)',
                                        border: selectedShape === shape.value
                                          ? '2px solid rgb(251, 191, 36)'
                                          : '1px solid rgba(255, 255, 255, 0.15)',
                                        borderRadius: '8px',
                                        color: 'white',
                                        cursor: 'pointer',
                                        fontSize: '13px',
                                        transition: 'all 0.2s',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px'
                                      }}
                                    >
                                      <span style={{ fontSize: '20px' }}>{shape.icon}</span>
                                      <span>{shape.label}</span>
                                    </motion.button>
                                  ))}
                                </motion.div>
                              )}

                              {/* Canvas Area */}
                              <div style={{ flex: 1 }}>
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.95 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  style={{
                                    border: '2px dashed rgba(251, 191, 36, 0.5)',
                                    borderRadius: '12px',
                                    overflow: 'hidden',
                                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                                    position: 'relative'
                                  }}
                                >
                                  {/* Drawing Tools - Only for draw mode */}
                                  {designMode === 'draw' && (
                                    <div style={{
                                      position: 'absolute',
                                      top: '12px',
                                      left: '12px',
                                      display: 'flex',
                                      flexDirection: 'column',
                                      gap: '12px',
                                      zIndex: 10,
                                      background: 'rgba(0, 0, 0, 0.6)',
                                      backdropFilter: 'blur(10px)',
                                      padding: '12px',
                                      borderRadius: '12px',
                                      border: '1px solid rgba(255, 255, 255, 0.1)'
                                    }}>
                                      {/* Tools */}
                                      <div style={{ display: 'flex', gap: '8px' }}>
                                        {['pen', 'line', 'eraser'].map((mode) => (
                                          <motion.button
                                            key={mode}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => {
                                              setDrawMode(mode as any);
                                              setLineStart(null);
                                            }}
                                            style={{
                                              padding: '8px',
                                              background: drawMode === mode ? 'rgba(251, 191, 36, 0.2)' : 'transparent',
                                              border: drawMode === mode ? '1px solid rgb(251, 191, 36)' : '1px solid rgba(255, 255, 255, 0.2)',
                                              borderRadius: '8px',
                                              color: 'white',
                                              cursor: 'pointer',
                                              fontSize: '20px',
                                              width: '40px',
                                              height: '40px',
                                              display: 'flex',
                                              alignItems: 'center',
                                              justifyContent: 'center'
                                            }}
                                            title={mode.charAt(0).toUpperCase() + mode.slice(1)}
                                          >
                                            {mode === 'pen' ? '✏️' : mode === 'line' ? '📏' : '🧹'}
                                          </motion.button>
                                        ))}
                                      </div>

                                      {/* Colors */}
                                      {drawMode !== 'eraser' && (
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
                                          {['#FBBF24', '#B76E79', '#C0C0C0', '#E5E4E2', '#EF4444', '#3B82F6', '#10B981', '#000000'].map((color) => (
                                            <motion.button
                                              key={color}
                                              whileHover={{ scale: 1.1 }}
                                              whileTap={{ scale: 0.9 }}
                                              onClick={() => setSelectedColor(color)}
                                              style={{
                                                width: '24px',
                                                height: '24px',
                                                borderRadius: '50%',
                                                backgroundColor: color,
                                                border: selectedColor === color ? '2px solid white' : '2px solid transparent',
                                                cursor: 'pointer',
                                                boxShadow: selectedColor === color ? '0 0 0 2px rgb(251, 191, 36)' : 'none'
                                              }}
                                            />
                                          ))}
                                        </div>
                                      )}

                                      {/* Stroke Width */}
                                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                        <label style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.6)' }}>Size: {strokeWidth}px</label>
                                        <input
                                          type="range"
                                          min="1"
                                          max="20"
                                          value={strokeWidth}
                                          onChange={(e) => setStrokeWidth(parseInt(e.target.value))}
                                          style={{ width: '100%', accentColor: '#FBBF24' }}
                                        />
                                      </div>

                                      {/* Actions */}
                                      <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '8px' }}>
                                        <motion.button
                                          whileHover={{ scale: 1.05 }}
                                          whileTap={{ scale: 0.95 }}
                                          onClick={undo}
                                          style={{
                                            flex: 1,
                                            padding: '6px',
                                            background: 'rgba(255, 255, 255, 0.1)',
                                            border: 'none',
                                            borderRadius: '6px',
                                            color: 'white',
                                            cursor: 'pointer',
                                            fontSize: '12px'
                                          }}
                                        >
                                          ↩️ Undo
                                        </motion.button>
                                        <motion.button
                                          whileHover={{ scale: 1.05 }}
                                          whileTap={{ scale: 0.95 }}
                                          onClick={redo}
                                          style={{
                                            flex: 1,
                                            padding: '6px',
                                            background: 'rgba(255, 255, 255, 0.1)',
                                            border: 'none',
                                            borderRadius: '6px',
                                            color: 'white',
                                            cursor: 'pointer',
                                            fontSize: '12px'
                                          }}
                                        >
                                          ↪️ Redo
                                        </motion.button>
                                      </div>
                                      
                                      <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setShowGrid(!showGrid)}
                                        style={{
                                          padding: '6px',
                                          background: showGrid ? 'rgba(251, 191, 36, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                                          border: showGrid ? '1px solid rgba(251, 191, 36, 0.5)' : 'none',
                                          borderRadius: '6px',
                                          color: 'white',
                                          cursor: 'pointer',
                                          fontSize: '12px'
                                        }}
                                      >
                                        {showGrid ? 'Grid On' : 'Grid Off'}
                                      </motion.button>
                                    </div>
                                  )}

                                  {/* 3D Controls - Only for shapes mode */}
                                  {designMode === 'shapes' && (
                                    <div style={{
                                      position: 'absolute',
                                      top: '12px',
                                      left: '12px',
                                      display: 'flex',
                                      flexDirection: 'column',
                                      gap: '12px',
                                      zIndex: 10,
                                      background: 'rgba(0, 0, 0, 0.6)',
                                      backdropFilter: 'blur(10px)',
                                      padding: '12px',
                                      borderRadius: '12px',
                                      border: '1px solid rgba(255, 255, 255, 0.1)'
                                    }}>
                                      <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', fontWeight: '600' }}>MATERIAL</div>
                                      <div style={{ display: 'flex', gap: '8px' }}>
                                        {[
                                          { id: 'gold', color: '#FBBF24', label: 'Gold' },
                                          { id: 'silver', color: '#E5E7EB', label: 'Silver' },
                                          { id: 'rose', color: '#FDA4AF', label: 'Rose' },
                                          { id: 'crystal', color: '#60A5FA', label: 'Gem' }
                                        ].map((mat) => (
                                          <motion.button
                                            key={mat.id}
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => setShapeMaterial(mat.id as any)}
                                            style={{
                                              width: '32px',
                                              height: '32px',
                                              borderRadius: '50%',
                                              background: mat.color,
                                              border: shapeMaterial === mat.id ? '2px solid white' : '2px solid transparent',
                                              cursor: 'pointer',
                                              boxShadow: shapeMaterial === mat.id ? `0 0 10px ${mat.color}` : 'none'
                                            }}
                                            title={mat.label}
                                          />
                                        ))}
                                      </div>

                                      <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '4px 0' }} />

                                      <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setIs3DView(!is3DView)}
                                        style={{
                                          padding: '8px',
                                          background: is3DView ? 'linear-gradient(135deg, rgb(251, 191, 36), rgb(202, 138, 4))' : 'rgba(255, 255, 255, 0.1)',
                                          border: 'none',
                                          borderRadius: '8px',
                                          color: 'white',
                                          cursor: 'pointer',
                                          fontSize: '13px',
                                          fontWeight: '600',
                                          display: 'flex',
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                          gap: '6px'
                                        }}
                                      >
                                        <span>🧊</span>
                                        {is3DView ? '3D View On' : '3D View Off'}
                                      </motion.button>
                                    </div>
                                  )}

                                  {/* Layered Canvas System */}
                                  <div style={{ 
                                    position: 'relative', 
                                    width: '100%', 
                                    height: 'auto',
                                    perspective: '1000px', // Add perspective for 3D tilt
                                    overflow: 'hidden'
                                  }}>
                                    <motion.div
                                      animate={{
                                        rotateX: is3DView ? 25 : 0,
                                        scale: is3DView ? 0.9 : 1,
                                        y: is3DView ? 20 : 0
                                      }}
                                      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                                      style={{
                                        position: 'relative',
                                        width: '100%',
                                        height: '100%',
                                        transformStyle: 'preserve-3d'
                                      }}
                                    >
                                      {/* Background canvas for drawings */}
                                      <canvas
                                        ref={backgroundCanvasRef}
                                        width={1000}
                                        height={600}
                                        style={{
                                          position: 'absolute',
                                          top: 0,
                                          left: 0,
                                          width: '100%',
                                          height: 'auto',
                                          display: 'block',
                                          pointerEvents: designMode === 'draw' ? 'auto' : 'none',
                                          cursor: designMode === 'draw'
                                            ? (drawMode === 'eraser' ? 'cell' : drawMode === 'line' ? 'crosshair' : 'crosshair')
                                            : 'default',
                                          filter: is3DView ? 'drop-shadow(0 20px 30px rgba(0,0,0,0.5))' : 'none'
                                        }}
                                      />

                                      {/* Foreground canvas for shapes */}
                                      <canvas
                                        ref={canvasRef}
                                        width={1000}
                                        height={600}
                                        style={{
                                          position: 'relative',
                                          width: '100%',
                                          height: 'auto',
                                          display: 'block',
                                          pointerEvents: designMode === 'shapes' ? 'auto' : 'none',
                                          cursor: designMode === 'shapes'
                                            ? (isDragging ? 'grabbing' : isResizing ? 'nwse-resize' : 'default')
                                            : 'default'
                                        }}
                                      />
                                    </motion.div>
                                  </div>

                                  {/* Action Buttons */}
                                  <div style={{
                                    position: 'absolute',
                                    top: '12px',
                                    right: '12px',
                                    display: 'flex',
                                    gap: '8px',
                                    zIndex: 10
                                  }}>
                                    {/* Save Button */}
                                    <motion.button
                                      whileHover={{ scale: 1.05 }}
                                      whileTap={{ scale: 0.95 }}
                                      onClick={saveDesign}
                                      style={{
                                        padding: '10px 20px',
                                        background: 'linear-gradient(135deg, rgb(34, 197, 94), rgb(22, 163, 74))',
                                        border: 'none',
                                        borderRadius: '8px',
                                        color: 'white',
                                        cursor: 'pointer',
                                        fontSize: '13px',
                                        fontWeight: '600',
                                        boxShadow: '0 4px 12px rgba(34, 197, 94, 0.4)'
                                      }}
                                    >
                                      💾 Save Design
                                    </motion.button>

                                    {/* Delete Shape - Only show when shape is selected */}
                                    {designMode === 'shapes' && selectedShapeIndex !== null && (
                                      <motion.button
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={deleteSelectedShape}
                                        style={{
                                          padding: '10px 20px',
                                          background: 'rgba(239, 68, 68, 0.9)',
                                          border: 'none',
                                          borderRadius: '8px',
                                          color: 'white',
                                          cursor: 'pointer',
                                          fontSize: '13px',
                                          fontWeight: '600',
                                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
                                        }}
                                      >
                                        🗑️ Delete
                                      </motion.button>
                                    )}

                                    {/* Clear All Button */}
                                    <motion.button
                                      whileHover={{ scale: 1.05 }}
                                      whileTap={{ scale: 0.95 }}
                                      onClick={clearCanvas}
                                      style={{
                                        padding: '10px 20px',
                                        background: 'rgba(239, 68, 68, 0.9)',
                                        border: 'none',
                                        borderRadius: '8px',
                                        color: 'white',
                                        cursor: 'pointer',
                                        fontSize: '13px',
                                        fontWeight: '600',
                                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
                                      }}
                                    >
                                      🗑️ Clear All
                                    </motion.button>
                                  </div>

                                  <div style={{
                                    padding: '12px',
                                    textAlign: 'center',
                                    color: 'rgba(255, 255, 255, 0.6)',
                                    fontSize: '13px',
                                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                                    borderTop: '1px solid rgba(255, 255, 255, 0.1)'
                                  }}>
                                    {designMode === 'draw'
                                      ? (drawMode === 'pen'
                                        ? '✨ Draw your custom jewelry design with your mouse or touch!'
                                        : drawMode === 'line'
                                          ? '📏 Click two points to draw a straight line!'
                                          : '🧹 Use eraser to remove parts of your drawing!')
                                      : (selectedShapeIndex !== null
                                        ? '💎 Drag to move • Drag edge to resize • Click Delete to remove!'
                                        : '💎 Click shapes to add them • Click a shape to select • Drag edge to resize!')}
                                  </div>
                                </motion.div>
                              </div>
                            </div>
                          )}

                          {/* Upload Section */}
                          {designMode === 'upload' && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                            >
                              {!uploadedDesign ? (
                                <label style={{
                                  display: 'block',
                                  padding: '60px',
                                  border: '3px dashed rgba(251, 191, 36, 0.5)',
                                  borderRadius: '12px',
                                  textAlign: 'center',
                                  cursor: 'pointer',
                                  transition: 'all 0.3s',
                                  backgroundColor: 'rgba(0, 0, 0, 0.2)'
                                }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = 'rgba(251, 191, 36, 0.1)';
                                    e.currentTarget.style.borderColor = 'rgb(251, 191, 36)';
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
                                    e.currentTarget.style.borderColor = 'rgba(251, 191, 36, 0.5)';
                                  }}
                                >
                                  <div style={{ fontSize: '64px', marginBottom: '16px' }}>📤</div>
                                  <div style={{ color: 'white', fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
                                    Upload Your Design
                                  </div>
                                  <div style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '14px' }}>
                                    Click or drag & drop your image here
                                  </div>
                                  <div style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '12px', marginTop: '8px' }}>
                                    Supports JPG, PNG, SVG
                                  </div>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileUpload}
                                    style={{ display: 'none' }}
                                  />
                                </label>
                              ) : (
                                <div style={{ position: 'relative' }}>
                                  <img
                                    src={uploadedDesign}
                                    alt="Uploaded design"
                                    style={{
                                      width: '100%',
                                      maxHeight: '500px',
                                      objectFit: 'contain',
                                      borderRadius: '12px',
                                      border: '2px solid rgba(251, 191, 36, 0.5)'
                                    }}
                                  />
                                  <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setUploadedDesign(null)}
                                    style={{
                                      position: 'absolute',
                                      top: '12px',
                                      right: '12px',
                                      padding: '10px 20px',
                                      background: 'rgba(239, 68, 68, 0.9)',
                                      border: 'none',
                                      borderRadius: '8px',
                                      color: 'white',
                                      cursor: 'pointer',
                                      fontSize: '13px',
                                      fontWeight: '600'
                                    }}
                                  >
                                    🗑️ Remove
                                  </motion.button>
                                </div>
                              )}
                            </motion.div>
                          )}

                          {/* Empty State */}
                          {!designMode && (
                            <div style={{
                              textAlign: 'center',
                              padding: '80px 20px',
                              color: 'rgba(255, 255, 255, 0.5)',
                              fontSize: '14px'
                            }}>
                              <div style={{ fontSize: '64px', marginBottom: '20px' }}>🎨</div>
                              <div style={{ fontSize: '18px', color: 'white', marginBottom: '12px', fontWeight: '600' }}>
                                Bring Your Vision to Life!
                              </div>
                              <p style={{ marginBottom: '8px' }}>Choose a design mode above to get started</p>
                              <p style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '13px' }}>
                                Our master artisans will craft your unique design
                              </p>
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
                              key={size.value}
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => setSelectedSize(size.value)}
                              style={{
                                width: '90px',
                                height: '90px',
                                backgroundColor: selectedSize === size.value
                                  ? 'rgba(251, 191, 36, 0.3)'
                                  : 'rgba(255, 255, 255, 0.05)',
                                border: selectedSize === size.value
                                  ? '3px solid rgb(251, 191, 36)'
                                  : '2px solid rgba(255, 255, 255, 0.2)',
                                borderRadius: '12px',
                                color: 'white',
                                cursor: 'pointer',
                                fontSize: '20px',
                                fontWeight: 'bold',
                                transition: 'all 0.3s',
                                boxShadow: selectedSize === size.value
                                  ? '0 0 20px rgba(251, 191, 36, 0.4)'
                                  : '0 2px 10px rgba(0, 0, 0, 0.2)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '4px'
                              }}
                            >
                              <div>{size.value}</div>
                              <div style={{
                                fontSize: '12px',
                                color: 'rgb(251, 191, 36)',
                                fontWeight: '600'
                              }}>
                                {size.price > 0 ? `+$${size.price}` : 'Base'}
                              </div>
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
                    onClick={() => {
                      if (selectedCategory && selectedMetal && selectedSize) {
                        const metal = metals.find(m => m.value === selectedMetal);
                        const gem = selectedGemType && selectedGemType !== 'none'
                          ? gemstones[selectedGemType as keyof typeof gemstones]?.find(g => g.value === selectedGemstone)
                          : undefined;

                        addToCart({
                          id: `custom-${Date.now()}`,
                          category: selectedCategory,
                          metal: metal?.label || selectedMetal,
                          metalPrice: metal?.price || 0,
                          gemType: selectedGemType,
                          gemstone: gem?.label,
                          gemstonePrice: gem?.price,
                          engravingText: engravingText || undefined,
                          size: selectedSize,
                          designMode: designMode || undefined,
                          estimatedPrice: estimatedPrice
                        });

                        setToastMessage('Custom design added to cart!');
                        setShowToast(true);
                        setTimeout(() => {
                          window.location.hash = 'cart';
                        }, 1500);
                      }
                    }}
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
                    <Link
                      to="/contact"
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
                    </Link>
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />

      <Toast
        message={toastMessage}
        show={showToast}
        onClose={() => setShowToast(false)}
        type="success"
      />
    </div>
  );
}
