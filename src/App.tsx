import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './components/Home';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { CustomDesign } from './components/CustomDesign';
import { Marketplace } from './components/Marketplace';
import { AboutUs } from './components/AboutUs';
import { ContactUs } from './components/ContactUs';
import { Cart } from './components/Cart';
import { Packages } from './components/Packages';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsAndConditions } from './components/TermsAndConditions';
import { Toast } from './components/Toast';
import { CartProvider } from './context/CartContext';

function AppContent() {
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  return (
    <BrowserRouter basename="/Galagama-Gems">
      <Routes>
        <Route path="/" element={<Home setToastMessage={setToastMessage} setShowToast={setShowToast} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/custom-design" element={<CustomDesign />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Toast
        message={toastMessage}
        show={showToast}
        onClose={() => setShowToast(false)}
        type="success"
      />
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}