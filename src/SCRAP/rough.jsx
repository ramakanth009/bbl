// App.js - Updated with OAuth callback route
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { theme } from './styles/theme';
import { AuthProvider } from './context/AuthContext';
import { CategoriesProvider } from './context/CategoriesContext';
import ProtectedRoute from './components/common/ProtectedRoute';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import AuthCallback from './pages/AuthCallback'; // NEW
import Dashboard from './pages/Dashboard';
import Discover from './pages/sections/Discover';
import Featured from './pages/sections/Featured';
import Recent from './pages/sections/Recent';
import Trending from './pages/sections/Trending';
import Foryou from './pages/sections/ForYou';
import History from './pages/sections/History';
import SessionChat from './pages/sections/SessionChat';
import CategoryPage from './pages/sections/CategoryPage';

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <CategoriesProvider>
            <BrowserRouter>
              <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/auth/callback" element={<AuthCallback />} /> {/* NEW */}
                
                {/* Protected Routes */}
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                >
                  {/* Nested routes for dashboard sections */}
                  <Route index element={<Navigate to="/dashboard/discover" replace />} />
                  <Route path="discover" element={<Discover />} />
                  <Route path="featured" element={<Featured />} />
                  <Route path="recent" element={<Recent />} />
                  <Route path="trending" element={<Trending />} />
                  <Route path="for-you" element={<Foryou />} />
                  <Route path="history" element={<History />} />
                  <Route path="session/:sessionId" element={<SessionChat />} />
                  <Route path="category/:categoryKey" element={<CategoryPage />} />
                </Route>
                
                {/* Category Routes */}
                <Route path="/category/:categoryKey" element={<CategoryPage />} />
                
                {/* Default redirect */}
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </BrowserRouter>
          </CategoriesProvider>
        </AuthProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
