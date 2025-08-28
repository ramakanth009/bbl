// import React from 'react';
// import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { theme } from './styles/theme';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CategoriesProvider } from './context/CategoriesContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import MobileCollectionModal from './components/MobileCollectionModal';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import AuthCallback from './pages/AuthCallback';
import Dashboard from './pages/Dashboard';
import Discover from './pages/sections/Discover';
import Featured from './pages/sections/Featured';
import Recent from './pages/sections/Recent';
import Trending from './pages/sections/Trending';
import Foryou from './pages/sections/ForYou';
import History from './pages/sections/History';
import SessionChat from './pages/sections/SessionChat';
import CategoryPage from './pages/sections/CategoryPage';

function AppContent() {
  const {
    needsMobileCollection,
    mobileCollectionSkipped,
    updateMobile,
    skipMobileCollection,
    loading,
    user,
    // ...other context values...
  } = useAuth();

  const [modalError, setModalError] = React.useState('');
  const [modalLoading, setModalLoading] = React.useState(false);

  const handleMobileSubmit = async (mobile) => {
    setModalLoading(true);
    setModalError('');
    const result = await updateMobile(mobile);
    if (!result.success) {
      setModalError(result.error);
    }
    setModalLoading(false);
  };

  const handleSkip = () => {
    skipMobileCollection();
  };

  // Show modal if needsMobileCollection and not skipped
  if (needsMobileCollection && !mobileCollectionSkipped) {
    return (
      <MobileCollectionModal
        open={true}
        onSubmit={handleMobileSubmit}
        onSkip={handleSkip}
        loading={modalLoading}
        error={modalError}
      />
    );
  }

  return (
    <StyledEngineProvider injectFirst>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        {/* <HashRouter> */}
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/auth/callback" element={<AuthCallback />} /> {/* NEW */}
            <Route 
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <CategoriesProvider>
                    <Dashboard />
                  </CategoriesProvider>
                </ProtectedRoute>
              } 
            >
              {/* Nested routes for dashboard sections */}
              <Route index element={<Navigate to="discover" replace />} />
              <Route path="discover" element={<Discover />} />
              <Route path="discover/chat/:characterId" element={<Discover />} />
              <Route path="featured" element={<Featured />} />
              <Route path="featured/chat/:characterId" element={<Featured />} />
              <Route path="trending" element={<Trending />} />
              <Route path="foryou" element={<Foryou />} />
              <Route path="recent" element={<Recent />} />
              <Route path="history" element={<History />} />
              <Route path="history/session/:sessionId" element={<SessionChat />} />
              
              {/* Category Routes */}
              <Route path="categories/:categoryKey" element={<CategoryPage />} />
              <Route path="categories/:categoryKey/chat/:characterId" element={<CategoryPage />} />
            </Route>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
          </BrowserRouter>
        {/* </HashRouter> */}
      </AuthProvider>
    </ThemeProvider>
    </StyledEngineProvider>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;