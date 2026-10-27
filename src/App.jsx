import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomCursor from './components/CustomCursor';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Games from './pages/Games';
import About from './pages/About';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/admin/ProtectedRoute';
import HeroEditor from './pages/admin/HeroEditor';
import GamesManager from './pages/admin/GamesManager';
import AboutEditor from './pages/admin/AboutEditor';
import ContactEditor from './pages/admin/ContactEditor';
import SiteSettings from './pages/admin/SiteSettings';
import SeedPage from './pages/SeedPage';
import { useFirestoreContent } from './hooks/useFirestoreContent';
import { DEFAULT_CONTENT } from './utils/defaultContent';

function App() {
  const { content } = useFirestoreContent();
  const studioName = content?.studioName || DEFAULT_CONTENT.studioName || 'Redundant Studios';
  const logoUrl = content?.logoUrl || '';
  const fontConfig = content?.font || DEFAULT_CONTENT.font;

  useEffect(() => {
    document.title = studioName;

    // Dynamic favicon — use logo from Firestore, else default SVG
    let favicon = document.querySelector("link[rel='icon']");
    if (!favicon) {
      favicon = document.createElement('link');
      favicon.rel = 'icon';
      document.head.appendChild(favicon);
    }
    favicon.type = logoUrl ? 'image/png' : 'image/svg+xml';
    favicon.href = logoUrl || '/favicon.svg';
  }, [studioName, logoUrl]);

  useEffect(() => {
    // Apply dynamic fonts — inject Google Fonts link and CSS variables
    const display = fontConfig?.display || 'Barlow Condensed';
    const body = fontConfig?.body || 'Rajdhani';
    const displayWeight = fontConfig?.displayWeight || 700;
    const bodyWeight = fontConfig?.bodyWeight || 500;

    const familyParam = (family, weights) => {
      const f = family.replace(/ /g, '+');
      return `family=${f}:wght@${weights}`;
    };

    const weights = '400;500;600;700;800';
    const href = `https://fonts.googleapis.com/css2?${familyParam(display, weights)}&${familyParam(body, weights)}&display=swap`;

    let link = document.querySelector("link[data-dynamic-fonts]");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'stylesheet';
      link.setAttribute('data-dynamic-fonts', 'true');
      document.head.appendChild(link);
    }
    link.href = href;

    document.documentElement.style.setProperty('--font-display', `'${display}', sans-serif`);
    document.documentElement.style.setProperty('--font-body', `'${body}', sans-serif`);
    document.documentElement.style.setProperty('--font-display-weight', displayWeight);
    document.documentElement.style.setProperty('--font-body-weight', bodyWeight);
  }, [fontConfig?.display, fontConfig?.body, fontConfig?.displayWeight, fontConfig?.bodyWeight]);

  return (
    <Router>
      <CustomCursor />
      <ScrollToTop />
      <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={
            <>
              <Navbar />
              <Home />
              <Footer />
            </>
          } />
          <Route path="/games" element={
            <>
              <Navbar />
              <Games />
              <Footer />
            </>
          } />
          <Route path="/about" element={
            <>
              <Navbar />
              <About />
              <Footer />
            </>
          } />
          <Route path="/contact" element={
            <>
              <Navbar />
              <Contact />
              <Footer />
            </>
          } />
          {/* Seed route disabled to protect Firestore database */}
          <Route path="/seed" element={<div style={{ color: '#fff', padding: '50px', textAlign: 'center' }}>Seed route disabled to protect database.</div>} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }>
            <Route path="hero" element={<HeroEditor />} />
            <Route path="games" element={<GamesManager />} />
            <Route path="about" element={<AboutEditor />} />
            <Route path="contact" element={<ContactEditor />} />
            <Route path="settings" element={<SiteSettings />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
