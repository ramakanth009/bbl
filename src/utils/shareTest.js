/**
 * Test script for the new share functionality using public endpoint
 * Run this in browser console to test the share URLs
 */

import metaTagService from '../services/metaTagService';

// Test data matching the public endpoint response format
const testCharacter = {
    "name": "Martin Luther King Jr.",
    "description": "Iconic civil rights leader and Baptist minister who led the movement for racial equality through nonviolent protest. Known for his \"I Have a Dream\" speech and unwavering commitment to justice, love, and human dignity.",
    "img": "https://upload.wikimedia.org/wikipedia/commons/0/05/Martin_Luther_King%2C_Jr..jpg",
    "native_language": "english",
    "is_multilingual": true,
    "category": "leaders_historical",
    "tags": " Chat with Martin Luther King Jr., civil rights leader and visionary. On Gigaspace history dialogues, explore his dream of equality, timeless speeches, and global influence on justice movements.",
    "id": 50,
    "created_at": "2025-07-07T05:23:15"
};

// Test all share URL generation methods
console.log('=== Share URL Tests ===');
console.log('Public URL:', metaTagService.generatePublicShareUrl(testCharacter));
console.log('Facebook:', metaTagService.generateFacebookShareUrl(testCharacter));
console.log('Twitter:', metaTagService.generateTwitterShareUrl(testCharacter));
console.log('LinkedIn:', metaTagService.generateLinkedInShareUrl(testCharacter));
console.log('WhatsApp:', metaTagService.generateWhatsAppShareUrl(testCharacter));
console.log('Telegram:', metaTagService.generateTelegramShareUrl(testCharacter));
console.log('Reddit:', metaTagService.generateRedditShareUrl(testCharacter));
console.log('Email:', metaTagService.generateEmailShareUrl(testCharacter));

// Test meta tag generation with new image field
console.log('\n=== Meta Tag Tests ===');
const metaTags = metaTagService.generateCharacterMeta(testCharacter, 'discover');
console.log('Title:', metaTags.title);
console.log('Description:', metaTags.description);
console.log('Image:', metaTags.image);
console.log('URL:', metaTags.url);

export { testCharacter };
