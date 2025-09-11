// import React from 'react';
// import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { ThemeProvider as StylesThemeProvider } from '@mui/styles';

import { CssBaseline } from '@mui/material';
import { theme } from './styles/theme';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CategoriesProvider } from './context/CategoriesContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import MobileCollectionModal from './components/MobileCollectionModal';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import AuthCallback from './pages/AuthCallback';
import Dashboard from './pages/Dashboard';
import Blog from './pages/blog/Blog';
import BlogPost from './pages/blog/BlogPost';
import Discover from './pages/sections/Discover';
import Featured from './pages/sections/Featured';
import Recent from './pages/sections/Recent';
import Trending from './pages/sections/Trending';
import Foryou from './pages/sections/ForYou';
import History from './pages/sections/History';
import SessionChat from './pages/sections/SessionChat';
import CategoryPage from './pages/sections/CategoryPage';



function DashboardWithMobileModal() {
  const { profileStatus, updateMobile, refreshProfileStatus } = useAuth();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalError, setModalError] = React.useState('');
  const [modalLoading, setModalLoading] = React.useState(false);

  // Show modal only after dashboard is loaded and needs_mobile is true
  React.useEffect(() => {
    if (profileStatus && profileStatus.needs_mobile) {
      setModalOpen(true);
    } else {
      setModalOpen(false);
    }
  }, [profileStatus]);

  const handleMobileSubmit = async (mobile) => {
    setModalLoading(true);
    setModalError('');
    const result = await updateMobile(mobile);
    if (!result.success) {
      setModalError(result.error);
    } else {
      setModalOpen(false);
      await refreshProfileStatus();
    }
    setModalLoading(false);
  };

  const handleSkip = async () => {
    setModalOpen(false);
    // Optionally refresh profile status if skipping is supported
    await refreshProfileStatus();
  };

  return (
    <>
      <Dashboard />
      <MobileCollectionModal
        open={modalOpen}
        onSubmit={handleMobileSubmit}
        onSkip={handleSkip}
        loading={modalLoading}
        error={modalError}
      />
    </>
  );
}

function AppContent() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <StylesThemeProvider theme={theme}>
          <CssBaseline />
          <AuthProvider>
            <BrowserRouter>
              <Routes>
                {/* Auth Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/auth/callback" element={<AuthCallback />} />
                
                {/* Blog Routes - Public */}
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                
                {/* Dashboard Routes - Protected */}
                <Route 
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <CategoriesProvider>
                        <DashboardWithMobileModal />
                      </CategoriesProvider>
                    </ProtectedRoute>
                  } 
                >
                  {/* Nested routes for dashboard sections */}
                  <Route index element={<Navigate to="discover" replace />} />
                  <Route path="discover" element={<Discover />} />
                  <Route path="discover/chat/:characterId/:characterName" element={<Discover />} />
                  <Route path="featured" element={<Featured />} />
                  <Route path="featured/chat/:characterId/:characterName" element={<Featured />} />
                  <Route path="trending" element={<Trending />} />
                  <Route path="foryou" element={<Foryou />} />
                  <Route path="recent" element={<Recent />} />
                  <Route path="history" element={<History />} />
                  <Route path="history/session/:sessionId" element={<SessionChat />} />
                  
                  {/* Category Routes */}
                  <Route path="categories/:categoryKey" element={<CategoryPage />} />
                  <Route path="categories/:categoryKey/chat/:characterId/:characterName" element={<CategoryPage />} />
                </Route>
                
                {/* Default redirect */}
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </StylesThemeProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

function App() {
  return (
    <HelmetProvider>
      <AppContent />
    </HelmetProvider>
  );
}

export default App;