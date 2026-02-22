import React, { useState } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";

// Layout Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import AudioPlayer from "./components/AudioPlayer";

// Pages
import HomePage from "./pages/HomePage";
import BeatsPage from "./pages/BeatsPage";
import ServicesPage from "./pages/ServicesPage";
import SessionsPage from "./pages/SessionsPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CheckoutPage from "./pages/CheckoutPage";
import ClientDashboard from "./pages/ClientDashboard";
import ProducerDashboard from "./pages/ProducerDashboard";
import AdminDashboard from "./pages/AdminDashboard";

// Main App Layout Component
const AppLayout = ({ children, currentBeat, onCloseBeat, onBuyBeat }) => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>{children}</main>
      <Footer />
      {currentBeat && (
        <AudioPlayer 
          currentBeat={currentBeat} 
          onClose={onCloseBeat}
          onBuy={onBuyBeat}
        />
      )}
    </div>
  );
};

// Auth Layout (without header/footer)
const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>{children}</main>
    </div>
  );
};

// Dashboard Layout
const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>{children}</main>
    </div>
  );
};

// App Content with Routing
const AppContent = () => {
  const [currentBeat, setCurrentBeat] = useState(null);
  const navigate = useNavigate();

  const handlePlayBeat = (beat) => {
    setCurrentBeat(beat);
  };

  const handleCloseBeat = () => {
    setCurrentBeat(null);
  };

  const handleBuyBeat = (beat) => {
    navigate('/checkout', { state: { beat } });
  };

  return (
    <Routes>
      {/* Public Pages */}
      <Route 
        path="/" 
        element={
          <AppLayout currentBeat={currentBeat} onCloseBeat={handleCloseBeat} onBuyBeat={handleBuyBeat}>
            <HomePage onPlayBeat={handlePlayBeat} onBuyBeat={handleBuyBeat} />
          </AppLayout>
        } 
      />
      <Route 
        path="/beats" 
        element={
          <AppLayout currentBeat={currentBeat} onCloseBeat={handleCloseBeat} onBuyBeat={handleBuyBeat}>
            <BeatsPage onPlayBeat={handlePlayBeat} onBuyBeat={handleBuyBeat} />
          </AppLayout>
        } 
      />
      <Route 
        path="/servicos" 
        element={
          <AppLayout currentBeat={currentBeat} onCloseBeat={handleCloseBeat} onBuyBeat={handleBuyBeat}>
            <ServicesPage />
          </AppLayout>
        } 
      />
      <Route 
        path="/sessoes" 
        element={
          <AppLayout currentBeat={currentBeat} onCloseBeat={handleCloseBeat} onBuyBeat={handleBuyBeat}>
            <SessionsPage />
          </AppLayout>
        } 
      />
      <Route 
        path="/contato" 
        element={
          <AppLayout currentBeat={currentBeat} onCloseBeat={handleCloseBeat} onBuyBeat={handleBuyBeat}>
            <ContactPage />
          </AppLayout>
        } 
      />
      <Route 
        path="/checkout" 
        element={
          <AuthLayout>
            <CheckoutPage />
          </AuthLayout>
        } 
      />

      {/* Auth Pages */}
      <Route 
        path="/login" 
        element={
          <AuthLayout>
            <LoginPage />
          </AuthLayout>
        } 
      />
      <Route 
        path="/registro" 
        element={
          <AuthLayout>
            <RegisterPage />
          </AuthLayout>
        } 
      />

      {/* Dashboard Pages */}
      <Route 
        path="/cliente" 
        element={
          <DashboardLayout>
            <ClientDashboard />
          </DashboardLayout>
        } 
      />
      <Route 
        path="/produtor" 
        element={
          <DashboardLayout>
            <ProducerDashboard />
          </DashboardLayout>
        } 
      />
      <Route 
        path="/admin" 
        element={
          <DashboardLayout>
            <AdminDashboard />
          </DashboardLayout>
        } 
      />
    </Routes>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppContent />
        <Toaster 
          position="top-right"
          toastOptions={{
            style: {
              background: '#18181b',
              border: '1px solid #27272a',
              color: '#ffffff',
            },
          }}
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
