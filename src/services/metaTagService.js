/**
 * MetaTagService - Dynamic Meta Tag Management for BBL Character Sharing
 * Handles generation of meta tags for social media sharing and SEO
 */

import apiService from './api';

class MetaTagService {
    constructor() {
        this.defaultMeta = {
            title: 'Bring Back Legends - Chat with Historical & Fictional Characters',
            description: 'Experience conversations with legendary historical figures and fictional characters through AI-powered chat. Discover their stories, wisdom, and personalities.',
            image: '/android-chrome-512x512.png',
            siteName: 'Bring Back Legends',
            url: window.location.origin
        };
    }

    /**
     * Generate meta tags for a character (async version that fetches from API)
     * @param {string|Object} characterIdOrObject - Character ID or character object
     * @param {string} section - Section name (discover, categories, etc.)
     * @returns {Promise<Object>} Meta tag data
     */
    async generateCharacterMetaAsync(characterIdOrObject, section = 'discover') {
        try {
            let character;
            
            // If it's already a character object, use it
            if (typeof characterIdOrObject === 'object' && characterIdOrObject !== null) {
                character = characterIdOrObject;
            } else {
                // Fetch character data from API
                character = await apiService.getCharacterMetaData(characterIdOrObject);
            }

            if (!character) {
                return this.getDefaultMeta();
            }

            return this.generateCharacterMeta(character, section);
        } catch (error) {
            console.error('Failed to generate character meta tags:', error);
            return this.getDefaultMeta();
        }
    }

    /**
     * Generate meta tags for a character (sync version for existing character objects)
     * @param {Object} character - Character object
     * @param {string} section - Section name (discover, categories, etc.)
     * @returns {Object} Meta tag data
     */
    generateCharacterMeta(character, section = 'discover') {
        if (!character) {
            return this.getDefaultMeta();
        }

        const characterName = character.name || 'Unknown Character';
        const characterDescription = this.generateCharacterDescription(character);
        const characterImage = this.getCharacterImage(character);
        const characterUrl = this.generateCharacterUrl(character, section);

        return {
            title: `Chat with ${characterName} | Bring Back Legends`,
            description: characterDescription,
            image: characterImage,
            url: characterUrl,
            siteName: this.defaultMeta.siteName,
            type: 'profile',
            
            // Open Graph specific tags
            ogTitle: `Chat with ${characterName}`,
            ogDescription: characterDescription,
            ogImage: characterImage,
            ogUrl: characterUrl,
            ogType: 'profile',
            ogSiteName: this.defaultMeta.siteName,
            
            // Twitter Card specific tags
            twitterCard: 'summary_large_image',
            twitterTitle: `Chat with ${characterName}`,
            twitterDescription: characterDescription,
            twitterImage: characterImage,
            twitterSite: '@BringBackLegends', // Update with actual Twitter handle
            
            // Additional meta tags
            keywords: this.generateKeywords(character),
            author: 'Bring Back Legends',
            robots: 'index, follow',
            
            // Character specific data
            characterId: character.id,
            characterName: characterName,
            section: section
        };
    }

    /**
     * Generate a compelling description for the character
     * @param {Object} character - Character object
     * @returns {string} Generated description
     */
    generateCharacterDescription(character) {
        const name = character.name || 'this character';
        
        // Try to use character's bio or description if available
        if (character.bio && character.bio.length > 10) {
            const bio = character.bio.substring(0, 150);
            return `Experience conversations with ${name}. ${bio}${bio.length === 150 ? '...' : ''} Start chatting now on Bring Back Legends.`;
        }
        
        if (character.description && character.description.length > 10) {
            const desc = character.description.substring(0, 150);
            return `Chat with ${name}. ${desc}${desc.length === 150 ? '...' : ''} Powered by Bring Back Legends.`;
        }
        
        // Fallback descriptions based on character type or category
        if (character.category) {
            return `Experience conversations with ${name}, a legendary ${character.category} character. Engage in meaningful dialogue and explore their world through AI-powered conversations on Bring Back Legends.`;
        }
        
        return `Chat with ${name} and experience engaging conversations with this legendary character. Discover their story and personality through AI-powered dialogue on Bring Back Legends.`;
    }

    /**
     * Get the best available image for the character
     * @param {Object} character - Character object
     * @returns {string} Image URL
     */
    getCharacterImage(character) {
        // Priority order for character images
        const imageFields = [
            'image_url',
            'avatar_url', 
            'profile_image',
            'image',
            'avatar',
            'photo_url',
            'picture'
        ];
        
        for (const field of imageFields) {
            if (character[field] && typeof character[field] === 'string') {
                // Ensure the image URL is absolute
                const imageUrl = character[field];
                if (imageUrl.startsWith('http')) {
                    return imageUrl;
                } else if (imageUrl.startsWith('/')) {
                    return `${window.location.origin}${imageUrl}`;
                }
            }
        }
        
        // Fallback to default app icon
        return `${window.location.origin}${this.defaultMeta.image}`;
    }

    /**
     * Generate the canonical URL for the character
     * @param {Object} character - Character object
     * @param {string} section - Section name
     * @returns {string} Character URL
     */
    generateCharacterUrl(character, section) {
        const baseUrl = window.location.origin;
        const characterId = character.id;
        const characterName = this.slugify(character.name || 'character');
        
        return `${baseUrl}/dashboard/${section}/chat/${characterId}/${characterName}`;
    }

    /**
     * Generate SEO keywords for the character
     * @param {Object} character - Character object
     * @returns {string} Comma-separated keywords
     */
    generateKeywords(character) {
        const keywords = ['AI chat', 'character conversation', 'Bring Back Legends'];
        
        if (character.name) {
            keywords.push(character.name);
        }
        
        if (character.category) {
            keywords.push(character.category);
        }
        
        if (character.tags && Array.isArray(character.tags)) {
            keywords.push(...character.tags);
        }
        
        // Add common related keywords
        keywords.push('historical figures', 'fictional characters', 'AI conversation', 'chat bot');
        
        return keywords.join(', ');
    }

    /**
     * Create URL-friendly slug from text
     * @param {string} text - Text to slugify
     * @returns {string} URL-friendly slug
     */
    slugify(text) {
        return text
            .toLowerCase()
            .replace(/[^\w\s-]/g, '') // Remove special characters
            .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
            .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
    }

    /**
     * Generate share URLs for different social media platforms
     * @param {Object} metaTags - Meta tags object
     * @returns {Object} Share URLs for different platforms
     */
    generateShareUrls(metaTags) {
        const encodedUrl = encodeURIComponent(metaTags.url);
        const encodedTitle = encodeURIComponent(metaTags.title);
        const encodedDescription = encodeURIComponent(metaTags.description);
        
        return {
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
            twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}&hashtags=BringBackLegends,AIChat`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
            whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
            telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
            reddit: `https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
            email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
            copy: metaTags.url
        };
    }

    /**
     * Update document meta tags (for client-side updates)
     * @param {Object} metaTags - Meta tags object
     */
    updateDocumentMeta(metaTags) {
        // Update document title
        document.title = metaTags.title;
        
        // Update or create meta tags
        this.updateMetaTag('description', metaTags.description);
        this.updateMetaTag('keywords', metaTags.keywords);
        this.updateMetaTag('author', metaTags.author);
        this.updateMetaTag('robots', metaTags.robots);
        
        // Open Graph tags
        this.updateMetaProperty('og:title', metaTags.ogTitle);
        this.updateMetaProperty('og:description', metaTags.ogDescription);
        this.updateMetaProperty('og:image', metaTags.ogImage);
        this.updateMetaProperty('og:url', metaTags.ogUrl);
        this.updateMetaProperty('og:type', metaTags.ogType);
        this.updateMetaProperty('og:site_name', metaTags.ogSiteName);
        
        // Twitter Card tags
        this.updateMetaName('twitter:card', metaTags.twitterCard);
        this.updateMetaName('twitter:title', metaTags.twitterTitle);
        this.updateMetaName('twitter:description', metaTags.twitterDescription);
        this.updateMetaName('twitter:image', metaTags.twitterImage);
        this.updateMetaName('twitter:site', metaTags.twitterSite);
        
        // Canonical URL
        this.updateCanonicalUrl(metaTags.url);
    }

    /**
     * Update or create a meta tag with name attribute
     * @param {string} name - Meta tag name
     * @param {string} content - Meta tag content
     */
    updateMetaTag(name, content) {
        if (!content) return;
        
        let meta = document.querySelector(`meta[name="${name}"]`);
        if (!meta) {
            meta = document.createElement('meta');
            meta.setAttribute('name', name);
            document.head.appendChild(meta);
        }
        meta.setAttribute('content', content);
    }

    /**
     * Update or create a meta tag with property attribute (for Open Graph)
     * @param {string} property - Meta tag property
     * @param {string} content - Meta tag content
     */
    updateMetaProperty(property, content) {
        if (!content) return;
        
        let meta = document.querySelector(`meta[property="${property}"]`);
        if (!meta) {
            meta = document.createElement('meta');
            meta.setAttribute('property', property);
            document.head.appendChild(meta);
        }
        meta.setAttribute('content', content);
    }

    /**
     * Update or create a meta tag with name attribute (for Twitter Cards)
     * @param {string} name - Meta tag name
     * @param {string} content - Meta tag content
     */
    updateMetaName(name, content) {
        if (!content) return;
        
        let meta = document.querySelector(`meta[name="${name}"]`);
        if (!meta) {
            meta = document.createElement('meta');
            meta.setAttribute('name', name);
            document.head.appendChild(meta);
        }
        meta.setAttribute('content', content);
    }

    /**
     * Update canonical URL
     * @param {string} url - Canonical URL
     */
    updateCanonicalUrl(url) {
        if (!url) return;
        
        let link = document.querySelector('link[rel="canonical"]');
        if (!link) {
            link = document.createElement('link');
            link.setAttribute('rel', 'canonical');
            document.head.appendChild(link);
        }
        link.setAttribute('href', url);
    }

    /**
     * Reset meta tags to default values
     */
    resetToDefault() {
        this.updateDocumentMeta(this.defaultMeta);
    }
}

// Create and export singleton instance
const metaTagService = new MetaTagService();

export default metaTagService;
export { metaTagService };
