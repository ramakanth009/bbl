import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { theme } from './styles/theme';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ChatPanel from './components/dashboard/chat/ChatPanel';
import Discover from './pages/sections/Discover';
import Featured from './pages/sections/Featured';
import Trending from './pages/sections/Trending';
import ForYou from './pages/sections/ForYou';
import Recent from './pages/sections/Recent';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <HashRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route 
              path="/dashboard/*"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/categories/*"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/chat/:characterName"
              element={
                <ProtectedRoute>
                  <ChatPanel />
                </ProtectedRoute>
              }
            />
            {/* Section routes for direct access */}
            <Route 
              path="/dashboard/discover"
              element={
                <ProtectedRoute>
                  <Discover />
                </ProtectedRoute>
              }
            />
            <Route 
              path="/dashboard/featured"
              element={
                <ProtectedRoute>
                  <Featured />
                </ProtectedRoute>
              }
            />
            <Route 
              path="/dashboard/trending"
              element={
                <ProtectedRoute>
                  <Trending />
                </ProtectedRoute>
              }
            />
            <Route 
              path="/dashboard/for-you"
              element={
                <ProtectedRoute>
                  <ForYou />
                </ProtectedRoute>
              }
            />
            <Route 
              path="/dashboard/recent"
              element={
                <ProtectedRoute>
                  <Recent />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </HashRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;