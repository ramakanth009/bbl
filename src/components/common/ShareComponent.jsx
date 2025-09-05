/**
 * ShareComponent - Social Media Sharing for GigaSpace Characters
 * Provides share buttons and functionality for character pages
 */

import React, { useState, useEffect } from 'react';
import { Share2, Copy, Facebook, Twitter, Linkedin, MessageCircle, Send, Mail, ExternalLink } from 'lucide-react';
import metaTagService from '../../services/metaTagService';

const ShareComponent = ({ 
    characterId, 
    characterData = null, 
    section = 'discover',
    showLabel = true,
    variant = 'default', // 'default', 'minimal', 'floating'
    className = ''
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [shareUrls, setShareUrls] = useState({});
    const [metaTags, setMetaTags] = useState(null);
    const [copied, setCopied] = useState(false);
    const [loading, setLoading] = useState(false);

    // Generate share URLs and meta tags
    useEffect(() => {
        const generateShareData = async () => {
            if (!characterId && !characterData) return;
            
            setLoading(true);
            try {
                // Use the new sharing-optimized method
                const meta = await metaTagService.generateCharacterMetaForSharing(
                    characterData || characterId, 
                    section
                );
                
                const urls = metaTagService.generateShareUrls(meta);
                
                setMetaTags(meta);
                setShareUrls(urls);
            } catch (error) {
                console.error('Failed to generate share data:', error);
            } finally {
                setLoading(false);
            }
        };

        generateShareData();
    }, [characterId, characterData, section]);

    // Copy to clipboard functionality
    const handleCopyLink = async () => {
        if (!shareUrls.copy) return;
        
        try {
            await navigator.clipboard.writeText(shareUrls.copy);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error('Failed to copy link:', error);
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = shareUrls.copy;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    // Open share URL in new window
    const handleShare = (platform) => {
        if (!shareUrls[platform]) return;
        
        const width = 600;
        const height = 400;
        const left = (window.innerWidth - width) / 2;
        const top = (window.innerHeight - height) / 2;
        
        window.open(
            shareUrls[platform],
            `share-${platform}`,
            `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes`
        );
    };

    // Share platforms configuration
    const platforms = [
        {
            key: 'facebook',
            name: 'Facebook',
            icon: Facebook,
            color: 'bg-blue-600 hover:bg-blue-700',
            textColor: 'text-blue-600'
        },
        {
            key: 'twitter',
            name: 'Twitter',
            icon: Twitter,
            color: 'bg-sky-500 hover:bg-sky-600',
            textColor: 'text-sky-500'
        },
        {
            key: 'linkedin',
            name: 'LinkedIn',
            icon: Linkedin,
            color: 'bg-blue-700 hover:bg-blue-800',
            textColor: 'text-blue-700'
        },
        {
            key: 'whatsapp',
            name: 'WhatsApp',
            icon: MessageCircle,
            color: 'bg-green-600 hover:bg-green-700',
            textColor: 'text-green-600'
        },
        {
            key: 'telegram',
            name: 'Telegram',
            icon: Send,
            color: 'bg-blue-500 hover:bg-blue-600',
            textColor: 'text-blue-500'
        },
        {
            key: 'email',
            name: 'Email',
            icon: Mail,
            color: 'bg-gray-600 hover:bg-gray-700',
            textColor: 'text-gray-600'
        }
    ];

    // Render minimal variant (just share icon)
    if (variant === 'minimal') {
        return (
            <div className={`relative ${className}`}>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                    title="Share character"
                    disabled={loading}
                >
                    <Share2 size={18} />
                </button>
                
                {isOpen && (
                    <div className="absolute right-0 top-full mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50 min-w-[200px]">
                        <div className="p-3">
                            <div className="text-sm font-medium text-white mb-2">Share Character</div>
                            <div className="grid grid-cols-3 gap-2">
                                {platforms.slice(0, 6).map((platform) => (
                                    <button
                                        key={platform.key}
                                        onClick={() => handleShare(platform.key)}
                                        className={`p-2 rounded-lg ${platform.color} text-white transition-all duration-200 flex items-center justify-center`}
                                        title={`Share on ${platform.name}`}
                                        disabled={loading || !shareUrls[platform.key]}
                                    >
                                        <platform.icon size={16} />
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={handleCopyLink}
                                className="w-full mt-2 p-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                                disabled={loading || !shareUrls.copy}
                            >
                                <Copy size={14} />
                                <span className="text-sm">{copied ? 'Copied!' : 'Copy Link'}</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    // Render floating variant
    if (variant === 'floating') {
        return (
            <div className={`fixed right-6 top-1/2 transform -translate-y-1/2 z-40 ${className}`}>
                <div className="bg-gray-800/90 backdrop-blur-sm border border-gray-700 rounded-lg p-2 shadow-xl">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 block mb-2"
                        title="Share character"
                        disabled={loading}
                    >
                        <Share2 size={20} />
                    </button>
                    
                    {isOpen && (
                        <div className="space-y-2">
                            {platforms.slice(0, 4).map((platform) => (
                                <button
                                    key={platform.key}
                                    onClick={() => handleShare(platform.key)}
                                    className={`p-2 rounded-lg ${platform.color} text-white transition-all duration-200 flex items-center justify-center w-full`}
                                    title={`Share on ${platform.name}`}
                                    disabled={loading || !shareUrls[platform.key]}
                                >
                                    <platform.icon size={16} />
                                </button>
                            ))}
                            <button
                                onClick={handleCopyLink}
                                className="p-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all duration-200 flex items-center justify-center w-full"
                                disabled={loading || !shareUrls.copy}
                            >
                                <Copy size={16} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // Default variant - full component
    return (
        <div className={`bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4 ${className}`}>
            <div className="flex items-center gap-3 mb-4">
                <Share2 size={20} className="text-blue-400" />
                {showLabel && (
                    <h3 className="text-lg font-semibold text-white">
                        Share {metaTags?.characterName || 'Character'}
                    </h3>
                )}
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
                </div>
            ) : (
                <>
                    {/* Social Media Platforms */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                        {platforms.map((platform) => (
                            <button
                                key={platform.key}
                                onClick={() => handleShare(platform.key)}
                                className={`p-3 rounded-lg ${platform.color} text-white transition-all duration-200 flex items-center justify-center gap-2 hover:scale-105`}
                                disabled={!shareUrls[platform.key]}
                            >
                                <platform.icon size={18} />
                                <span className="text-sm font-medium">{platform.name}</span>
                            </button>
                        ))}
                    </div>

                    {/* Copy Link Section */}
                    <div className="border-t border-gray-700 pt-4">
                        <div className="flex items-center gap-2 mb-2">
                            <ExternalLink size={16} className="text-gray-400" />
                            <span className="text-sm text-gray-400">Direct Link</span>
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={shareUrls.copy || ''}
                                readOnly
                                className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Generating share link..."
                            />
                            <button
                                onClick={handleCopyLink}
                                className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 ${
                                    copied 
                                        ? 'bg-green-600 text-white' 
                                        : 'bg-gray-700 hover:bg-gray-600 text-white'
                                }`}
                                disabled={!shareUrls.copy}
                            >
                                <Copy size={16} />
                                <span className="text-sm">{copied ? 'Copied!' : 'Copy'}</span>
                            </button>
                        </div>
                    </div>

                    {/* Meta Preview (for debugging/development) */}
                    {process.env.NODE_ENV === 'development' && metaTags && (
                        <div className="mt-4 p-3 bg-gray-900/50 rounded-lg border border-gray-700">
                            <div className="text-xs text-gray-400 mb-2">Share Preview:</div>
                            <div className="text-sm text-white font-medium">{metaTags.title}</div>
                            <div className="text-xs text-gray-400 mt-1">{metaTags.description}</div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default ShareComponent;
