# Backend Meta Tag Endpoint Implementation Guide

## Problem
Social media platforms (WhatsApp, Facebook, Twitter, etc.) crawl server-side HTML to extract meta tags for rich previews. Our current React SPA only updates meta tags client-side after JavaScript loads, so crawlers only see default meta tags.

## Solution: Server-Side Meta Tag Injection

### Required Backend Endpoint

**Endpoint:** `GET /character/{character_id}/meta`

**Response Format:**
```json
{
  "character_id": "123",
  "name": "Albert Einstein",
  "description": "Theoretical physicist known for the theory of relativity...",
  "image_url": "https://example.com/einstein.jpg",
  "category": "Historical Figures",
  "bio": "Full character biography...",
  "meta_tags": {
    "title": "Chat with Albert Einstein | GigaSpace",
    "description": "Experience conversations with Albert Einstein. Theoretical physicist known for the theory of relativity... Start chatting now on GigaSpace.",
    "og_title": "Chat with Albert Einstein",
    "og_description": "Experience conversations with Albert Einstein. Theoretical physicist known for...",
    "og_image": "https://example.com/einstein.jpg",
    "og_url": "https://yourdomain.com/dashboard/discover/chat/123/albert-einstein",
    "twitter_title": "Chat with Albert Einstein",
    "twitter_description": "Experience conversations with Albert Einstein...",
    "twitter_image": "https://example.com/einstein.jpg",
    "keywords": "Albert Einstein, AI chat, historical figures, physics, relativity"
  }
}
```

### Alternative: HTML Route for Direct Sharing

**Endpoint:** `GET /share/character/{character_id}/{character_name?}`

This should return full HTML with proper meta tags:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- Basic Meta Tags -->
    <title>Chat with Albert Einstein | GigaSpace</title>
    <meta name="description" content="Experience conversations with Albert Einstein. Theoretical physicist known for the theory of relativity...">
    
    <!-- Open Graph Meta Tags -->
    <meta property="og:title" content="Chat with Albert Einstein">
    <meta property="og:description" content="Experience conversations with Albert Einstein...">
    <meta property="og:image" content="https://example.com/einstein.jpg">
    <meta property="og:url" content="https://yourdomain.com/dashboard/discover/chat/123/albert-einstein">
    <meta property="og:type" content="profile">
    <meta property="og:site_name" content="GigaSpace">
    
    <!-- Twitter Card Meta Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Chat with Albert Einstein">
    <meta name="twitter:description" content="Experience conversations with Albert Einstein...">
    <meta name="twitter:image" content="https://example.com/einstein.jpg">
    
    <!-- Redirect to React App -->
    <meta http-equiv="refresh" content="0; url=/dashboard/discover/chat/123/albert-einstein">
    <script>
        window.location.href = "/dashboard/discover/chat/123/albert-einstein";
    </script>
</head>
<body>
    <p>Redirecting to chat with Albert Einstein...</p>
    <a href="/dashboard/discover/chat/123/albert-einstein">Click here if not redirected automatically</a>
</body>
</html>
```

### Implementation Steps

1. **Backend Implementation:**
   - Add `/character/{character_id}/meta` endpoint
   - Add `/share/character/{character_id}/{character_name?}` HTML route
   - Ensure proper CORS headers for meta endpoint

2. **Frontend Updates:**
   - Update share URLs to use `/share/character/...` format
   - Keep existing MetaTagService for client-side updates
   - Add fallback handling for missing backend endpoints

3. **URL Structure:**
   - **Share URLs:** `https://yourdomain.com/share/character/123/albert-einstein`
   - **App URLs:** `https://yourdomain.com/dashboard/discover/chat/123/albert-einstein`

### Testing

Use these tools to test meta tag extraction:
- **Facebook Debugger:** https://developers.facebook.com/tools/debug/
- **Twitter Card Validator:** https://cards-dev.twitter.com/validator
- **WhatsApp Link Preview:** Send link in WhatsApp to test
- **LinkedIn Post Inspector:** https://www.linkedin.com/post-inspector/

### Current API Base URL
`https://clone-7040.onrender.com`

The backend team should implement these endpoints to enable proper social media sharing with rich previews.
