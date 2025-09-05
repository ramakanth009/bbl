import React, { useEffect } from 'react';
import metaTagService from '../../services/metaTagService';

/**
 * MetaTagProvider - Component for managing dynamic meta tags
 * This component handles client-side meta tag updates for character pages
 */
const MetaTagProvider = ({ character, section = 'discover', children }) => {
    useEffect(() => {
        if (character) {
            // Generate meta tags for the character
            const metaTags = metaTagService.generateCharacterMeta(character, section);
            
            // Update document meta tags
            metaTagService.updateDocumentMeta(metaTags);
            
            console.log('🏷️ Meta tags updated for character:', character.name);
        } else {
            // Reset to default meta tags when no character
            metaTagService.resetToDefault();
            console.log('🏷️ Meta tags reset to default');
        }
        
        // Cleanup function to reset meta tags when component unmounts
        return () => {
            if (character) {
                metaTagService.resetToDefault();
            }
        };
    }, [character, section]);

    return children || null;
};

export default MetaTagProvider;
