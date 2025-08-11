import { useState, useCallback } from 'react';

// Configuration for your TTS server
const TTS_CONFIG = {
  baseUrl: 'http://localhost:8004', // Change this to your TTS server URL
  defaultVoice: 'default_sample.wav',
  defaultSettings: {
    temperature: 0.7,
    exaggeration: 1.0,
    cfg_weight: 3.0,
    speed_factor: 1.0,
    language: 'en'
  }
};

export const useTTS = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [error, setError] = useState(null);

  // Stop current audio
  const stopAudio = useCallback(() => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      setIsPlaying(false);
    }
  }, [currentAudio]);

  // Generate and play TTS
  const speak = useCallback(async (text, options = {}) => {
    if (!text?.trim()) return;
    
    try {
      setIsLoading(true);
      setError(null);
      
      // Stop any currently playing audio
      stopAudio();

      const requestBody = {
        text: text.trim(),
        voice_mode: options.voiceMode || 'predefined',
        predefined_voice_id: options.voiceId || TTS_CONFIG.defaultVoice,
        output_format: 'wav',
        split_text: text.length > 500, // Auto-chunk for long text
        chunk_size: 50,
        ...TTS_CONFIG.defaultSettings,
        ...options.ttsSettings
      };

      const response = await fetch(`${TTS_CONFIG.baseUrl}/tts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error(`TTS request failed: ${response.status} ${response.statusText}`);
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);

      // Set up audio event listeners
      audio.onloadstart = () => setIsLoading(true);
      audio.oncanplay = () => setIsLoading(false);
      audio.onplay = () => setIsPlaying(true);
      audio.onpause = () => setIsPlaying(false);
      audio.onended = () => {
        setIsPlaying(false);
        URL.revokeObjectURL(audioUrl);
        setCurrentAudio(null);
      };
      audio.onerror = () => {
        setError('Failed to play audio');
        setIsPlaying(false);
        setIsLoading(false);
        URL.revokeObjectURL(audioUrl);
      };

      setCurrentAudio(audio);
      await audio.play();

    } catch (err) {
      console.error('TTS Error:', err);
      setError(err.message);
      setIsLoading(false);
      setIsPlaying(false);
    }
  }, [stopAudio]);

  // Check if TTS server is available
  const checkTTSServer = useCallback(async () => {
    try {
      const response = await fetch(`${TTS_CONFIG.baseUrl}/api/ui/initial-data`);
      return response.ok;
    } catch {
      return false;
    }
  }, []);

  return {
    speak,
    stopAudio,
    isPlaying,
    isLoading,
    error,
    checkTTSServer
  };
};