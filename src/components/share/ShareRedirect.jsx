/**
 * ShareRedirect - Component for handling share URLs and redirecting to app
 * This component is used for /share/character/:id/:name routes
 */

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, CircularProgress, Button } from '@mui/material';
import metaTagService from '../../services/metaTagService';

const ShareRedirect = () => {
    const { characterId, characterName } = useParams();
    const navigate = useNavigate();
    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadCharacterAndRedirect = async () => {
            try {
                // Fetch character data using public endpoint
                const response = await fetch(`https://space.gigaspace.org/getcharacter/${characterId}`);
                
                if (!response.ok) {
                    throw new Error('Character not found');
                }
                
                const characterData = await response.json();
                setCharacter(characterData);
                
                // Update meta tags for social media sharing
                const metaTags = await metaTagService.generateCharacterMetaForSharing(characterData, 'discover');
                metaTagService.updateDocumentMeta(metaTags);
                
                // Redirect to the actual app after a short delay
                // This allows social media crawlers to read the meta tags
                setTimeout(() => {
                    const appUrl = `/dashboard/discover/chat/${characterId}/${characterName || 'character'}`;
                    navigate(appUrl, { replace: true });
                }, 2000);
                
            } catch (err) {
                console.error('Failed to load character for sharing:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (characterId) {
            loadCharacterAndRedirect();
        }
    }, [characterId, characterName, navigate]);

    const handleDirectRedirect = () => {
        const appUrl = `/dashboard/discover/chat/${characterId}/${characterName || 'character'}`;
        navigate(appUrl, { replace: true });
    };

    if (loading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                    background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
                    color: 'white',
                    textAlign: 'center',
                    padding: 3
                }}
            >
                <CircularProgress 
                    size={80} 
                    sx={{ 
                        color: '#6366f1',
                        marginBottom: 3
                    }} 
                />
                
                {character && (
                    <>
                        <Typography 
                            variant="h3" 
                            sx={{ 
                                marginBottom: 2,
                                background: 'linear-gradient(45deg, #6366f1, #8b5cf6)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text'
                            }}
                        >
                            {character.name}
                        </Typography>
                        
                        <Typography 
                            variant="h6" 
                            sx={{ 
                                color: '#d1d5db',
                                marginBottom: 3,
                                maxWidth: 600,
                                lineHeight: 1.6
                            }}
                        >
                            {character.description}
                        </Typography>
                    </>
                )}
                
                <Typography 
                    variant="body1" 
                    sx={{ color: '#9ca3af' }}
                >
                    Redirecting to GigaSpace...
                </Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                    background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
                    color: 'white',
                    textAlign: 'center',
                    padding: 3
                }}
            >
                <Typography 
                    variant="h4" 
                    sx={{ 
                        marginBottom: 2,
                        color: '#ef4444'
                    }}
                >
                    Character Not Found
                </Typography>
                
                <Typography 
                    variant="body1" 
                    sx={{ 
                        color: '#d1d5db',
                        marginBottom: 4
                    }}
                >
                    The character you're looking for doesn't exist or has been removed.
                </Typography>
                
                <Button
                    variant="contained"
                    onClick={() => navigate('/dashboard/discover')}
                    sx={{
                        background: 'linear-gradient(45deg, #6366f1, #8b5cf6)',
                        color: 'white',
                        padding: '12px 24px',
                        borderRadius: 2,
                        fontWeight: 600,
                        '&:hover': {
                            background: 'linear-gradient(45deg, #5855eb, #7c3aed)',
                            transform: 'translateY(-2px)'
                        }
                    }}
                >
                    Browse Characters
                </Button>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
                color: 'white',
                textAlign: 'center',
                padding: 3
            }}
        >
            {character && (
                <>
                    <Typography 
                        variant="h3" 
                        sx={{ 
                            marginBottom: 2,
                            background: 'linear-gradient(45deg, #6366f1, #8b5cf6)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}
                    >
                        {character.name}
                    </Typography>
                    
                    <Typography 
                        variant="h6" 
                        sx={{ 
                            color: '#d1d5db',
                            marginBottom: 4,
                            maxWidth: 600,
                            lineHeight: 1.6
                        }}
                    >
                        {character.description}
                    </Typography>
                    
                    <Button
                        variant="contained"
                        onClick={handleDirectRedirect}
                        sx={{
                            background: 'linear-gradient(45deg, #6366f1, #8b5cf6)',
                            color: 'white',
                            padding: '12px 24px',
                            borderRadius: 2,
                            fontWeight: 600,
                            '&:hover': {
                                background: 'linear-gradient(45deg, #5855eb, #7c3aed)',
                                transform: 'translateY(-2px)'
                            }
                        }}
                    >
                        Start Chatting Now
                    </Button>
                </>
            )}
        </Box>
    );
};

export default ShareRedirect;
