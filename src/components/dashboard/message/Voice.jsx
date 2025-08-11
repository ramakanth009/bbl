import React, { useState } from 'react';
import { 
  Box, 
  IconButton, 
  Slider, 
  Typography, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel,
  FormControlLabel,
  Checkbox,
  Button,
  Menu,
  Divider
} from '@mui/material';
import { 
  Mic, 
  MicOff, 
  VolumeUp, 
  VolumeOff, 
  Settings,
  PlayArrow,
  Stop
} from '@mui/icons-material';

// Voice Service Class
class VoiceService {
  constructor() {
    this.synthesis = window.speechSynthesis;
    this.recognition = null;
    this.mediaRecorder = null;
    this.audioContext = null;
    this.currentAudio = null;
    this.isRecording = false;
    this.isPlaying = false;
    
    // Default settings
    this.settings = {
      voice: null,
      rate: 1.0,
      pitch: 1.0,
      volume: 1.0,
      language: 'en-US',
      autoPlay: false,
      recordingFormat: 'webm',
    };
    
    this.loadSettings();
    this.initializeVoices();
    this.initializeSpeechRecognition();
  }

  // Initialize available voices
  initializeVoices() {
    if (this.synthesis) {
      // Wait for voices to be loaded
      if (this.synthesis.getVoices().length === 0) {
        this.synthesis.addEventListener('voiceschanged', () => {
          this.loadSettings();
        });
      }
    }
  }

  // Get available voices
  getAvailableVoices() {
    if (!this.synthesis) return [];
    return this.synthesis.getVoices();
  }

  // Initialize speech recognition
  initializeSpeechRecognition() {
    if ('webkitSpeechRecognition' in window) {
      this.recognition = new window.webkitSpeechRecognition();
    } else if ('SpeechRecognition' in window) {
      this.recognition = new window.SpeechRecognition();
    }

    if (this.recognition) {
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = this.settings.language;
    }
  }

  // Load settings from localStorage
  loadSettings() {
    try {
      const saved = localStorage.getItem('voice_settings');
      if (saved) {
        this.settings = { ...this.settings, ...JSON.parse(saved) };
      }
      
      // Set default voice if not set
      if (!this.settings.voice && this.synthesis) {
        const voices = this.getAvailableVoices();
        const defaultVoice = voices.find(voice => voice.default) || voices[0];
        if (defaultVoice) {
          this.settings.voice = defaultVoice.name;
        }
      }
    } catch (error) {
      console.error('Error loading voice settings:', error);
    }
  }

  // Save settings to localStorage
  saveSettings() {
    try {
      localStorage.setItem('voice_settings', JSON.stringify(this.settings));
    } catch (error) {
      console.error('Error saving voice settings:', error);
    }
  }

  // Update settings
  updateSettings(newSettings) {
    this.settings = { ...this.settings, ...newSettings };
    this.saveSettings();
    
    if (this.recognition && newSettings.language) {
      this.recognition.lang = newSettings.language;
    }
  }

  // Text-to-speech
  async speakText(text, options = {}) {
    return new Promise((resolve, reject) => {
      if (!this.synthesis) {
        reject(new Error('Speech synthesis not supported'));
        return;
      }

      // Stop any current speech
      this.stopSpeaking();

      const utterance = new SpeechSynthesisUtterance(text);
      
      // Apply settings
      const voices = this.getAvailableVoices();
      const selectedVoice = voices.find(voice => 
        voice.name === (options.voice || this.settings.voice)
      );
      
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
      
      utterance.rate = options.rate || this.settings.rate;
      utterance.pitch = options.pitch || this.settings.pitch;
      utterance.volume = options.volume || this.settings.volume;
      utterance.lang = options.language || this.settings.language;

      utterance.onend = () => {
        this.isPlaying = false;
        resolve();
      };
      
      utterance.onerror = (error) => {
        this.isPlaying = false;
        reject(error);
      };

      this.isPlaying = true;
      this.synthesis.speak(utterance);
    });
  }

  // Stop current speech
  stopSpeaking() {
    if (this.synthesis) {
      this.synthesis.cancel();
      this.isPlaying = false;
    }
  }

  // Play audio from base64 voice data
  async playVoiceData(voiceData) {
    try {
      // Stop any current audio
      this.stopAudio();

      if (!voiceData) {
        throw new Error('No voice data provided');
      }

      // Create audio blob from base64
      const audioBlob = new Blob(
        [Uint8Array.from(atob(voiceData), c => c.charCodeAt(0))],
        { type: 'audio/wav' }
      );
      
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      
      this.currentAudio = audio;
      this.isPlaying = true;

      audio.onended = () => {
        this.isPlaying = false;
        URL.revokeObjectURL(audioUrl);
        this.currentAudio = null;
      };

      audio.onerror = (e) => {
        console.error('Audio playback error:', e);
        this.isPlaying = false;
        URL.revokeObjectURL(audioUrl);
        this.currentAudio = null;
      };

      await audio.play();
    } catch (error) {
      console.error('Voice playback failed:', error);
      this.isPlaying = false;
      throw error;
    }
  }

  // Play audio from URL
  async playAudioFromUrl(audioUrl) {
    try {
      this.stopAudio();
      
      const audio = new Audio(audioUrl);
      this.currentAudio = audio;
      this.isPlaying = true;

      audio.onended = () => {
        this.isPlaying = false;
        this.currentAudio = null;
      };

      audio.onerror = (e) => {
        console.error('Audio URL playback error:', e);
        this.isPlaying = false;
        this.currentAudio = null;
      };

      await audio.play();
    } catch (error) {
      console.error('Audio URL playback failed:', error);
      this.isPlaying = false;
      throw error;
    }
  }

  // Stop current audio
  stopAudio() {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.isPlaying = false;
    }
  }

  // Start recording
  async startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      this.mediaRecorder = new MediaRecorder(stream);
      const audioChunks = [];

      this.mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      return new Promise((resolve, reject) => {
        this.mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
          stream.getTracks().forEach(track => track.stop());
          resolve(audioBlob);
        };

        this.mediaRecorder.onerror = reject;
        this.mediaRecorder.start();
        this.isRecording = true;
      });
    } catch (error) {
      console.error('Recording failed:', error);
      throw error;
    }
  }

  // Stop recording
  stopRecording() {
    if (this.mediaRecorder && this.isRecording) {
      this.mediaRecorder.stop();
      this.isRecording = false;
    }
  }

  // Speech recognition
  async speechToText() {
    if (!this.recognition) {
      throw new Error('Speech recognition not supported');
    }

    return new Promise((resolve, reject) => {
      this.recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        resolve(transcript);
      };

      this.recognition.onerror = reject;
      this.recognition.start();
    });
  }

  // Check browser support
  checkSupport() {
    return {
      synthesis: !!window.speechSynthesis,
      recognition: !!(window.SpeechRecognition || window.webkitSpeechRecognition),
      mediaRecorder: !!window.MediaRecorder,
    };
  }
}

// Create singleton instance
const voiceService = new VoiceService();

// React Components

// Voice Controls Component
export const VoiceControls = ({ 
  onRecord, 
  onSpeechToText, 
  onVoiceToggle,
  disabled = false 
}) => {
  const [showSettings, setShowSettings] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [settingsAnchor, setSettingsAnchor] = useState(null);
  
  const support = voiceService.checkSupport();

  const handleStartRecording = async () => {
    try {
      setIsRecording(true);
      const audioBlob = await voiceService.startRecording();
      setIsRecording(false);
      if (onRecord) onRecord(audioBlob);
    } catch (error) {
      setIsRecording(false);
      console.error('Recording error:', error);
    }
  };

  const handleStopRecording = () => {
    voiceService.stopRecording();
    setIsRecording(false);
  };

  const handleSpeechToText = async () => {
    try {
      const text = await voiceService.speechToText();
      if (onSpeechToText) onSpeechToText(text);
    } catch (error) {
      console.error('Speech to text error:', error);
    }
  };

  const handleSettingsOpen = (event) => {
    setSettingsAnchor(event.currentTarget);
  };

  const handleSettingsClose = () => {
    setSettingsAnchor(null);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      {/* Recording button */}
      {support.mediaRecorder && (
        <IconButton
          onClick={isRecording ? handleStopRecording : handleStartRecording}
          disabled={disabled}
          title={isRecording ? 'Stop recording' : 'Start voice recording'}
          sx={{ 
            color: isRecording ? '#f44336' : '#4fc3f7',
            '&:hover': {
              backgroundColor: 'rgba(79, 195, 247, 0.1)'
            }
          }}
        >
          {isRecording ? <MicOff /> : <Mic />}
        </IconButton>
      )}

      {/* Speech-to-text button */}
      {support.recognition && (
        <IconButton
          onClick={handleSpeechToText}
          disabled={disabled || isRecording}
          title="Speech to text"
          sx={{ 
            color: '#4fc3f7',
            '&:hover': {
              backgroundColor: 'rgba(79, 195, 247, 0.1)'
            }
          }}
        >
          <VolumeUp />
        </IconButton>
      )}

      {/* Settings button */}
      <IconButton
        onClick={handleSettingsOpen}
        title="Voice settings"
        sx={{ 
          color: 'rgba(255,255,255,0.7)',
          '&:hover': {
            backgroundColor: 'rgba(255,255,255,0.1)'
          }
        }}
      >
        <Settings />
      </IconButton>

      {/* Voice settings menu */}
      <VoiceSettingsMenu 
        anchorEl={settingsAnchor}
        open={Boolean(settingsAnchor)}
        onClose={handleSettingsClose}
      />
    </Box>
  );
};

// Voice Settings Menu Component
export const VoiceSettingsMenu = ({ anchorEl, open, onClose }) => {
  const [settings, setSettings] = useState(voiceService.settings);
  const [voices] = useState(voiceService.getAvailableVoices());

  const handleSettingChange = (key, value) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    voiceService.updateSettings(newSettings);
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          backgroundColor: 'rgba(30, 30, 30, 0.95)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          color: '#ffffff',
          minWidth: 320,
          p: 2
        }
      }}
    >
      <Box sx={{ p: 1 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
          Voice Settings
        </Typography>

        {/* Voice selection */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel sx={{ color: '#ffffff' }}>Voice</InputLabel>
          <Select
            value={settings.voice || ''}
            onChange={(e) => handleSettingChange('voice', e.target.value)}
            sx={{ 
              color: '#ffffff',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(255, 255, 255, 0.23)',
              },
            }}
          >
            {voices.map((voice) => (
              <MenuItem key={voice.name} value={voice.name}>
                {voice.name} ({voice.lang})
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.12)', mb: 2 }} />

        {/* Rate slider */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Speech Rate: {settings.rate.toFixed(1)}x
          </Typography>
          <Slider
            value={settings.rate}
            onChange={(_, value) => handleSettingChange('rate', value)}
            min={0.5}
            max={2}
            step={0.1}
            sx={{
              color: '#4fc3f7',
              '& .MuiSlider-thumb': {
                backgroundColor: '#4fc3f7',
              },
              '& .MuiSlider-track': {
                backgroundColor: '#4fc3f7',
              },
            }}
          />
        </Box>

        {/* Pitch slider */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Pitch: {settings.pitch.toFixed(1)}
          </Typography>
          <Slider
            value={settings.pitch}
            onChange={(_, value) => handleSettingChange('pitch', value)}
            min={0}
            max={2}
            step={0.1}
            sx={{
              color: '#4fc3f7',
              '& .MuiSlider-thumb': {
                backgroundColor: '#4fc3f7',
              },
              '& .MuiSlider-track': {
                backgroundColor: '#4fc3f7',
              },
            }}
          />
        </Box>

        {/* Volume slider */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Volume: {Math.round(settings.volume * 100)}%
          </Typography>
          <Slider
            value={settings.volume}
            onChange={(_, value) => handleSettingChange('volume', value)}
            min={0}
            max={1}
            step={0.1}
            sx={{
              color: '#4fc3f7',
              '& .MuiSlider-thumb': {
                backgroundColor: '#4fc3f7',
              },
              '& .MuiSlider-track': {
                backgroundColor: '#4fc3f7',
              },
            }}
          />
        </Box>

        {/* Auto-play checkbox */}
        <FormControlLabel
          control={
            <Checkbox
              checked={settings.autoPlay}
              onChange={(e) => handleSettingChange('autoPlay', e.target.checked)}
              sx={{ color: '#4fc3f7' }}
            />
          }
          label="Auto-play responses"
          sx={{ color: '#ffffff' }}
        />

        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={onClose} sx={{ color: '#4fc3f7' }}>
            Close
          </Button>
        </Box>
      </Box>
    </Menu>
  );
};

// Voice Recorder Hook
export const useVoiceRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);

  const startRecording = async () => {
    try {
      setIsRecording(true);
      const blob = await voiceService.startRecording();
      setAudioBlob(blob);
      return blob;
    } catch (error) {
      setIsRecording(false);
      throw error;
    } finally {
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    voiceService.stopRecording();
    setIsRecording(false);
  };

  return {
    isRecording,
    audioBlob,
    startRecording,
    stopRecording,
  };
};

// Voice Player Hook
export const useVoicePlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const playText = async (text, options = {}) => {
    try {
      setIsPlaying(true);
      await voiceService.speakText(text, options);
    } catch (error) {
      console.error('Error playing text:', error);
      throw error;
    } finally {
      setIsPlaying(false);
    }
  };

  const playVoiceData = async (voiceData) => {
    try {
      setIsPlaying(true);
      await voiceService.playVoiceData(voiceData);
    } catch (error) {
      console.error('Error playing voice data:', error);
      throw error;
    } finally {
      setIsPlaying(false);
    }
  };

  const playAudioUrl = async (audioUrl) => {
    try {
      setIsPlaying(true);
      await voiceService.playAudioFromUrl(audioUrl);
    } catch (error) {
      console.error('Error playing audio URL:', error);
      throw error;
    } finally {
      setIsPlaying(false);
    }
  };

  const stop = () => {
    voiceService.stopSpeaking();
    voiceService.stopAudio();
    setIsPlaying(false);
  };

  return {
    isPlaying,
    playText,
    playVoiceData,
    playAudioUrl,
    stop,
  };
};

export default voiceService;