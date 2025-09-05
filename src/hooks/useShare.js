/**
 * useShare - Custom hook for character sharing functionality
 * Provides easy access to share URLs and meta tags generation
 */

import { useState, useEffect, useCallback } from 'react';
import metaTagService from '../services/metaTagService';

export const useShare = (characterId, characterData = null, section = 'discover') => {
    const [shareData, setShareData] = useState({
        shareUrls: {},
        metaTags: null,
        loading: false,
        error: null
    });

    // Generate share data
    const generateShareData = useCallback(async () => {
        if (!characterId && !characterData) return;

        setShareData(prev => ({ ...prev, loading: true, error: null }));

        try {
            // Use the public endpoint for sharing
            const metaTags = await metaTagService.generateCharacterMetaForSharing(
                characterData || characterId,
                section
            );

            const shareUrls = metaTagService.generateShareUrls(metaTags);

            setShareData({
                shareUrls,
                metaTags,
                loading: false,
                error: null
            });
        } catch (error) {
            console.error('Failed to generate share data:', error);
            setShareData(prev => ({
                ...prev,
                loading: false,
                error: error.message || 'Failed to generate share data'
            }));
        }
    }, [characterId, characterData, section]);

    // Generate share data on mount and when dependencies change
    useEffect(() => {
        generateShareData();
    }, [generateShareData]);

    // Copy to clipboard helper
    const copyToClipboard = useCallback(async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (error) {
            // Fallback for older browsers
            try {
                const textArea = document.createElement('textarea');
                textArea.value = text;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                return true;
            } catch (fallbackError) {
                console.error('Failed to copy to clipboard:', fallbackError);
                return false;
            }
        }
    }, []);

    // Share to specific platform
    const shareToplatform = useCallback((platform) => {
        const url = shareData.shareUrls[platform];
        if (!url) return false;

        if (platform === 'copy') {
            return copyToClipboard(url);
        }

        // Open share URL in popup window
        const width = 600;
        const height = 400;
        const left = (window.innerWidth - width) / 2;
        const top = (window.innerHeight - height) / 2;

        window.open(
            url,
            `share-${platform}`,
            `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes`
        );

        return true;
    }, [shareData.shareUrls, copyToClipboard]);

    // Get share URL for specific platform
    const getShareUrl = useCallback((platform) => {
        return shareData.shareUrls[platform] || null;
    }, [shareData.shareUrls]);

    // Refresh share data
    const refresh = useCallback(() => {
        generateShareData();
    }, [generateShareData]);

    return {
        // Data
        shareUrls: shareData.shareUrls,
        metaTags: shareData.metaTags,
        loading: shareData.loading,
        error: shareData.error,
        
        // Actions
        shareToplatform,
        copyToClipboard,
        getShareUrl,
        refresh,
        
        // Helpers
        isReady: !shareData.loading && !shareData.error && Object.keys(shareData.shareUrls).length > 0,
        characterName: shareData.metaTags?.characterName || null,
        shareUrl: shareData.shareUrls.copy || null
    };
};

export default useShare;
