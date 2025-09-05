/**
 * Share Meta Generator - Server-side utility for generating dynamic meta tags
 * Used for social media sharing with proper Open Graph and Twitter Card support
 */

/**
 * Generate HTML with dynamic meta tags for character sharing
 * @param {Object} characterData - Character data from public endpoint
 * @param {string} shareTemplate - HTML template string
 * @returns {string} HTML with replaced meta tags
 */
export const generateShareHTML = (characterData, shareTemplate) => {
    if (!characterData) {
        return shareTemplate.replace(/\{\{[^}]+\}\}/g, '');
    }

    const characterName = characterData.name || 'Unknown Character';
    const characterDescription = characterData.description || 'Experience conversations with legendary characters through AI-powered chat on GigaSpace.';
    const characterImage = characterData.img || '/android-chrome-512x512.png';
    const characterId = characterData.id || '';
    const characterSlug = slugify(characterName);
    
    // Generate URLs
    const baseUrl = process.env.REACT_APP_BASE_URL || 'https://space.gigaspace.org';
    const shareUrl = `${baseUrl}/share/character/${characterId}/${characterSlug}`;
    const appUrl = `${baseUrl}/dashboard/discover/chat/${characterId}/${characterSlug}`;
    
    // Generate meta tag content
    const metaData = {
        // Basic meta tags
        TITLE: `Chat with ${characterName} | GigaSpace`,
        DESCRIPTION: characterDescription.substring(0, 160) + (characterDescription.length > 160 ? '...' : ''),
        KEYWORDS: generateKeywords(characterData),
        URL: shareUrl,
        CANONICAL_URL: appUrl,
        
        // Open Graph tags
        OG_TITLE: `Chat with ${characterName}`,
        OG_DESCRIPTION: characterDescription.substring(0, 300) + (characterDescription.length > 300 ? '...' : ''),
        OG_IMAGE: ensureAbsoluteUrl(characterImage, baseUrl),
        
        // Twitter Card tags
        TWITTER_TITLE: `Chat with ${characterName}`,
        TWITTER_DESCRIPTION: characterDescription.substring(0, 200) + (characterDescription.length > 200 ? '...' : ''),
        TWITTER_IMAGE: ensureAbsoluteUrl(characterImage, baseUrl),
        
        // LinkedIn tags
        LINKEDIN_TITLE: `Chat with ${characterName} on GigaSpace`,
        LINKEDIN_DESCRIPTION: characterDescription.substring(0, 256) + (characterDescription.length > 256 ? '...' : ''),
        LINKEDIN_IMAGE: ensureAbsoluteUrl(characterImage, baseUrl),
        
        // Template replacement values
        CHARACTER_NAME: characterName,
        CHARACTER_DESCRIPTION: characterDescription,
        CHARACTER_ID: characterId,
        CHARACTER_SLUG: characterSlug
    };
    
    // Replace all template variables
    let html = shareTemplate;
    Object.entries(metaData).forEach(([key, value]) => {
        const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
        html = html.replace(regex, escapeHtml(value));
    });
    
    return html;
};

/**
 * Generate SEO keywords from character data
 * @param {Object} characterData - Character data
 * @returns {string} Comma-separated keywords
 */
const generateKeywords = (characterData) => {
    const keywords = ['AI chat', 'character conversation', 'GigaSpace', 'artificial intelligence'];
    
    if (characterData.name) {
        keywords.push(characterData.name);
    }
    
    if (characterData.category) {
        keywords.push(characterData.category.replace(/_/g, ' '));
    }
    
    if (characterData.tags) {
        // Extract keywords from tags string
        const tagKeywords = characterData.tags
            .toLowerCase()
            .split(/[,\s]+/)
            .filter(tag => tag.length > 2)
            .slice(0, 5); // Limit to 5 tag keywords
        keywords.push(...tagKeywords);
    }
    
    // Add common related keywords
    keywords.push('historical figures', 'fictional characters', 'chat bot', 'interactive AI');
    
    return keywords.slice(0, 15).join(', '); // Limit to 15 keywords
};

/**
 * Ensure URL is absolute
 * @param {string} url - URL to check
 * @param {string} baseUrl - Base URL to prepend if relative
 * @returns {string} Absolute URL
 */
const ensureAbsoluteUrl = (url, baseUrl) => {
    if (!url) return `${baseUrl}/android-chrome-512x512.png`;
    
    if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
    }
    
    if (url.startsWith('/')) {
        return `${baseUrl}${url}`;
    }
    
    return `${baseUrl}/${url}`;
};

/**
 * Create URL-friendly slug from text
 * @param {string} text - Text to slugify
 * @returns {string} URL-friendly slug
 */
const slugify = (text) => {
    if (!text) return 'character';
    
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
        .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
};

/**
 * Escape HTML special characters
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
 */
const escapeHtml = (text) => {
    if (typeof text !== 'string') return String(text);
    
    const htmlEscapes = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;'
    };
    
    return text.replace(/[&<>"']/g, (match) => htmlEscapes[match]);
};

/**
 * Fetch character data from public endpoint
 * @param {string} characterId - Character ID
 * @returns {Promise<Object>} Character data
 */
export const fetchCharacterForShare = async (characterId) => {
    try {
        const response = await fetch(`https://space.gigaspace.org/getcharacter/${characterId}`);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch character data for sharing:', error);
        return null;
    }
};

/**
 * Generate structured data (JSON-LD) for better SEO
 * @param {Object} characterData - Character data
 * @returns {string} JSON-LD structured data
 */
export const generateStructuredData = (characterData) => {
    if (!characterData) return '';
    
    const baseUrl = process.env.REACT_APP_BASE_URL || 'https://space.gigaspace.org';
    const characterSlug = slugify(characterData.name);
    const appUrl = `${baseUrl}/dashboard/discover/chat/${characterData.id}/${characterSlug}`;
    
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": characterData.name,
        "description": characterData.description,
        "image": ensureAbsoluteUrl(characterData.img, baseUrl),
        "url": appUrl,
        "sameAs": [appUrl],
        "additionalType": "AICharacter",
        "provider": {
            "@type": "Organization",
            "name": "GigaSpace",
            "url": baseUrl
        }
    };
    
    return `<script type="application/ld+json">${JSON.stringify(structuredData, null, 2)}</script>`;
};

export default {
    generateShareHTML,
    fetchCharacterForShare,
    generateStructuredData,
    generateKeywords,
    ensureAbsoluteUrl,
    slugify,
    escapeHtml
};
