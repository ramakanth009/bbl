import React, { useEffect } from 'react';
import { metaTagService } from '../../services/metaTagService';

/**
 * MetaTagProvider - Manages dynamic meta tags for character pages
 * Updates document meta tags when character changes
 */
const MetaTagProvider = ({ character, characterId, section = 'discover' }) => {
  useEffect(() => {
    const updateMetaTags = async () => {
      try {
        if (character || characterId) {
          // Generate meta tags for the character (async to fetch from API if needed)
          const metaData = await metaTagService.generateCharacterMetaAsync(
            character || characterId, 
            section
          );
          
          // Update document meta tags
          metaTagService.updateDocumentMeta(metaData);
          
          console.log('Meta tags updated for character:', metaData.characterName || 'Unknown');
        } else {
          // Reset to default meta tags when no character
          metaTagService.resetToDefault();
        }
      } catch (error) {
        console.error('Failed to update meta tags:', error);
        // Fallback to default meta tags on error
        metaTagService.resetToDefault();
      }
    };

    updateMetaTags();
  }, [character, characterId, section]);

  useEffect(() => {
    // Cleanup: Reset to default meta tags when component unmounts
    return () => {
      metaTagService.resetToDefault();
    };
  }, []);

  // This component doesn't render anything
  return null;
};

export default MetaTagProvider;
