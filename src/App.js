import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Discover from './pages/sections/Discover';
import Featured from './pages/sections/Featured';
import History from './pages/sections/History';
import CategoryPage from './pages/sections/CategoryPage'; // New import

// Components
import ProtectedRoute from './components/common/ProtectedRoute';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#6366f1',
    },
    background: {
      default: '#111827',
      paper: '#1f2937',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected Dashboard Routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            >
              {/* Dashboard Sub-routes */}
              <Route index element={<Navigate to="/dashboard/discover" replace />} />
              <Route path="discover" element={<Discover />} />
              <Route path="discover/chat/:characterId" element={<Discover />} />
              <Route path="featured" element={<Featured />} />
              <Route path="featured/chat/:characterId" element={<Featured />} />
              <Route path="history" element={<History />} />
              
              {/* Category Routes - NEW */}
              <Route path="categories/:categoryKey" element={<CategoryPage />} />
              <Route path="categories/:categoryKey/chat/:characterId" element={<CategoryPage />} />
            </Route>

            {/* Fallback Routes */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;