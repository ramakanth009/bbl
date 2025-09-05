import React, { useState } from 'react';
import {
    IconButton,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Tooltip,
    Snackbar,
    Alert,
    Box,
    Typography
} from '@mui/material';
import {
    Share as ShareIcon,
    Facebook as FacebookIcon,
    Twitter as TwitterIcon,
    LinkedIn as LinkedInIcon,
    WhatsApp as WhatsAppIcon,
    Telegram as TelegramIcon,
    Reddit as RedditIcon,
    Email as EmailIcon,
    ContentCopy as CopyIcon
} from '@mui/icons-material';
import metaTagService from '../../services/metaTagService';

/**
 * ShareButton - Social Media Sharing Component
 * Provides sharing functionality for character pages across multiple platforms
 */
const ShareButton = ({ character, section = 'discover', size = 'medium', variant = 'icon' }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleShare = async (platform) => {
        if (!character) {
            setSnackbar({
                open: true,
                message: 'No character selected to share',
                severity: 'error'
            });
            return;
        }

        try {
            // Generate meta tags and share URLs
            const metaTags = metaTagService.generateCharacterMeta(character, section);
            const shareUrls = metaTagService.generateShareUrls(metaTags);

            switch (platform) {
                case 'copy':
                    await navigator.clipboard.writeText(shareUrls.copy);
                    setSnackbar({
                        open: true,
                        message: 'Link copied to clipboard!',
                        severity: 'success'
                    });
                    break;
                    
                case 'facebook':
                case 'twitter':
                case 'linkedin':
                case 'whatsapp':
                case 'telegram':
                case 'reddit':
                case 'email':
                    window.open(shareUrls[platform], '_blank', 'noopener,noreferrer');
                    setSnackbar({
                        open: true,
                        message: `Opening ${platform} share dialog...`,
                        severity: 'info'
                    });
                    break;
                    
                default:
                    console.warn('Unknown sharing platform:', platform);
            }
        } catch (error) {
            console.error('Share error:', error);
            setSnackbar({
                open: true,
                message: 'Failed to share. Please try again.',
                severity: 'error'
            });
        }

        handleClose();
    };

    const handleSnackbarClose = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    // Share options configuration
    const shareOptions = [
        { 
            platform: 'copy', 
            label: 'Copy Link', 
            icon: <CopyIcon />, 
            color: '#666666' 
        },
        { 
            platform: 'facebook', 
            label: 'Facebook', 
            icon: <FacebookIcon />, 
            color: '#1877F2' 
        },
        { 
            platform: 'twitter', 
            label: 'Twitter', 
            icon: <TwitterIcon />, 
            color: '#1DA1F2' 
        },
        { 
            platform: 'linkedin', 
            label: 'LinkedIn', 
            icon: <LinkedInIcon />, 
            color: '#0A66C2' 
        },
        { 
            platform: 'whatsapp', 
            label: 'WhatsApp', 
            icon: <WhatsAppIcon />, 
            color: '#25D366' 
        },
        { 
            platform: 'telegram', 
            label: 'Telegram', 
            icon: <TelegramIcon />, 
            color: '#0088CC' 
        },
        { 
            platform: 'reddit', 
            label: 'Reddit', 
            icon: <RedditIcon />, 
            color: '#FF4500' 
        },
        { 
            platform: 'email', 
            label: 'Email', 
            icon: <EmailIcon />, 
            color: '#EA4335' 
        }
    ];

    if (variant === 'text') {
        return (
            <Box>
                <Tooltip title="Share this character">
                    <Box
                        onClick={handleClick}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            cursor: 'pointer',
                            padding: '8px 12px',
                            borderRadius: 1,
                            '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.04)'
                            }
                        }}
                    >
                        <ShareIcon size={size} />
                        <Typography variant="body2">Share</Typography>
                    </Box>
                </Tooltip>
                
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                        sx: {
                            width: 200,
                            maxHeight: 400
                        }
                    }}
                >
                    {shareOptions.map((option) => (
                        <MenuItem 
                            key={option.platform}
                            onClick={() => handleShare(option.platform)}
                            sx={{
                                '&:hover': {
                                    backgroundColor: `${option.color}10`
                                }
                            }}
                        >
                            <ListItemIcon sx={{ color: option.color }}>
                                {option.icon}
                            </ListItemIcon>
                            <ListItemText primary={option.label} />
                        </MenuItem>
                    ))}
                </Menu>

                <Snackbar
                    open={snackbar.open}
                    autoHideDuration={3000}
                    onClose={handleSnackbarClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                >
                    <Alert 
                        onClose={handleSnackbarClose} 
                        severity={snackbar.severity}
                        variant="filled"
                    >
                        {snackbar.message}
                    </Alert>
                </Snackbar>
            </Box>
        );
    }

    return (
        <Box>
            <Tooltip title={`Share ${character?.name || 'this character'}`}>
                <IconButton
                    onClick={handleClick}
                    size={size}
                    sx={{
                        color: 'text.secondary',
                        '&:hover': {
                            color: 'primary.main',
                            backgroundColor: 'primary.light'
                        }
                    }}
                >
                    <ShareIcon />
                </IconButton>
            </Tooltip>
            
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    sx: {
                        width: 200,
                        maxHeight: 400
                    }
                }}
            >
                {shareOptions.map((option) => (
                    <MenuItem 
                        key={option.platform}
                        onClick={() => handleShare(option.platform)}
                        sx={{
                            '&:hover': {
                                backgroundColor: `${option.color}10`
                            }
                        }}
                    >
                        <ListItemIcon sx={{ color: option.color }}>
                            {option.icon}
                        </ListItemIcon>
                        <ListItemText primary={option.label} />
                    </MenuItem>
                ))}
            </Menu>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert 
                    onClose={handleSnackbarClose} 
                    severity={snackbar.severity}
                    variant="filled"
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default ShareButton;
