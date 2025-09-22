import React from 'react';
import { Box, Typography, Button, Alert } from '@mui/material';
import { makeStyles } from '@mui/styles';
import RefreshIcon from '@mui/icons-material/Refresh';
import HomeIcon from '@mui/icons-material/Home';

const useStyles = makeStyles({
  errorContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: '20px',
    background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
    color: '#ffffff',
  },
  errorContent: {
    textAlign: 'center',
    maxWidth: '600px',
    width: '100%',
  },
  errorTitle: {
    fontSize: '2rem !important',
    fontWeight: '700 !important',
    marginBottom: '16px !important',
    color: '#ef4444',
  },
  errorDescription: {
    fontSize: '1.1rem !important',
    marginBottom: '24px !important',
    color: '#d1d5db',
    lineHeight: '1.6 !important',
  },
  buttonContainer: {
    display: 'flex',
    gap: '16px',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: '24px',
  },
  actionButton: {
    borderRadius: '12px !important',
    padding: '12px 24px !important',
    textTransform: 'none !important',
    fontWeight: '600 !important',
    fontSize: '1rem !important',
    minWidth: '120px !important',
  },
  primaryButton: {
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%) !important',
    color: '#ffffff !important',
    '&:hover': {
      background: 'linear-gradient(135deg, #5856eb 0%, #7c3aed 100%) !important',
      transform: 'translateY(-2px)',
      boxShadow: '0 10px 20px rgba(99, 102, 241, 0.3)',
    },
  },
  secondaryButton: {
    border: '2px solid #6366f1 !important',
    color: '#6366f1 !important',
    '&:hover': {
      background: '#6366f1 !important',
      color: '#ffffff !important',
      transform: 'translateY(-2px)',
    },
  },
  errorDetails: {
    marginTop: '32px',
    padding: '16px',
    background: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    borderRadius: '12px',
    textAlign: 'left',
  },
  errorStack: {
    fontFamily: '"Monaco", "Consolas", monospace !important',
    fontSize: '0.85rem !important',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-all',
    maxHeight: '200px',
    overflow: 'auto',
    color: '#fca5a5',
  },
});

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null,
      errorId: null
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { 
      hasError: true,
      errorId: `err_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error details
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // Log to console for development
    console.error('Error Boundary caught an error:', error);
    console.error('Error Info:', errorInfo);

    // In production, you might want to log this to an error reporting service
    if (process.env.REACT_APP_ENV === 'production') {
      // Example: logErrorToService(error, errorInfo);
    }
  }

  handleRefresh = () => {
    // Clear error state and reload
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  handleGoHome = () => {
    // Clear error state and navigate to home
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.href = '/dashboard/discover';
  };

  render() {
    if (this.state.hasError) {
      return <ErrorBoundaryUI 
        error={this.state.error}
        errorInfo={this.state.errorInfo}
        errorId={this.state.errorId}
        onRefresh={this.handleRefresh}
        onGoHome={this.handleGoHome}
      />;
    }

    return this.props.children;
  }
}

// Functional component for the error UI
const ErrorBoundaryUI = ({ error, errorInfo, errorId, onRefresh, onGoHome }) => {
  const classes = useStyles();
  const [showDetails, setShowDetails] = React.useState(false);
  
  // Determine if we're in development mode
  const isDevelopment = process.env.NODE_ENV === 'development';

  return (
    <Box className={classes.errorContainer}>
      <Box className={classes.errorContent}>
        <Typography variant="h1" className={classes.errorTitle}>
          Oops! Something went wrong
        </Typography>
        
        <Typography className={classes.errorDescription}>
          We encountered an unexpected error while loading this page. 
          This might be a temporary issue with the application.
        </Typography>

        <Alert severity="error" sx={{ mb: 3 }}>
          <Typography variant="body2">
            <strong>Error ID:</strong> {errorId}
          </Typography>
          <Typography variant="body2">
            Please try refreshing the page or returning to the home page.
          </Typography>
        </Alert>

        <Box className={classes.buttonContainer}>
          <Button
            variant="contained"
            className={`${classes.actionButton} ${classes.primaryButton}`}
            startIcon={<RefreshIcon />}
            onClick={onRefresh}
          >
            Refresh Page
          </Button>
          
          <Button
            variant="outlined"
            className={`${classes.actionButton} ${classes.secondaryButton}`}
            startIcon={<HomeIcon />}
            onClick={onGoHome}
          >
            Go to Home
          </Button>
        </Box>

        {/* Show error details in development */}
        {isDevelopment && error && (
          <>
            <Button
              variant="text"
              onClick={() => setShowDetails(!showDetails)}
              sx={{ mt: 2, color: '#9ca3af' }}
            >
              {showDetails ? 'Hide' : 'Show'} Error Details
            </Button>
            
            {showDetails && (
              <Box className={classes.errorDetails}>
                <Typography variant="h6" sx={{ mb: 2, color: '#ef4444' }}>
                  Error Details (Development Only)
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  <strong>Error Message:</strong> {error.message}
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  <strong>Error Stack:</strong>
                </Typography>
                <Box className={classes.errorStack}>
                  {error.stack}
                </Box>
                {errorInfo && (
                  <>
                    <Typography variant="body2" sx={{ mt: 2, mb: 1 }}>
                      <strong>Component Stack:</strong>
                    </Typography>
                    <Box className={classes.errorStack}>
                      {errorInfo.componentStack}
                    </Box>
                  </>
                )}
              </Box>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default ErrorBoundary;