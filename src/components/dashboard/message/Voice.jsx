import React, { useState } from 'react';
import { Box, IconButton, Slider, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Mic, MicOff, VolumeUp, VolumeOff, Settings } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

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

      // Convert base64 to blob
      const byteCharacters = atob(voiceData);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const audioBlob = new Blob([byteArray], { type: 'audio/mpeg' });
      
      const audioUrl = URL.createObjectURL(audioBlob);
      await this.playAudioFromUrl(audioUrl);
      
      // Clean up URL after playing
      setTimeout(() => URL.revokeObjectURL(audioUrl), 1000);
    } catch (error) {
      console.error('Error playing voice data:', error);
      throw error;
    }
  }

  // Play audio from URL
  async playAudioFromUrl(audioUrl) {
    return new Promise((resolve, reject) => {
      try {
        this.stopAudio();
        
        this.currentAudio = new Audio(audioUrl);
        this.currentAudio.volume = this.settings.volume;
        
        this.currentAudio.onended = () => {
          this.isPlaying = false;
          resolve();
        };
        
        this.currentAudio.onerror = (error) => {
          this.isPlaying = false;
          reject(error);
        };
        
        this.isPlaying = true;
        this.currentAudio.play();
      } catch (error) {
        this.isPlaying = false;
        reject(error);
      }
    });
  }

  // Stop current audio
  stopAudio() {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.currentAudio = null;
      this.isPlaying = false;
    }
  }

  // Start voice recording
  async startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      this.mediaRecorder = new MediaRecorder(stream, {
        mimeType: `audio/${this.settings.recordingFormat}; codecs=opus`
      });
      
      const audioChunks = [];
      
      this.mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };
      
      return new Promise((resolve, reject) => {
        this.mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunks, { 
            type: `audio/${this.settings.recordingFormat}` 
          });
          this.isRecording = false;
          
          // Stop all tracks to free up microphone
          stream.getTracks().forEach(track => track.stop());
          
          resolve(audioBlob);
        };
        
        this.mediaRecorder.onerror = (error) => {
          this.isRecording = false;
          stream.getTracks().forEach(track => track.stop());
          reject(error);
        };
        
        this.mediaRecorder.start();
        this.isRecording = true;
      });
    } catch (error) {
      console.error('Error starting recording:', error);
      throw error;
    }
  }

  // Stop voice recording
  stopRecording() {
    if (this.mediaRecorder && this.isRecording) {
      this.mediaRecorder.stop();
    }
  }

  // Speech recognition
  async startSpeechRecognition() {
    return new Promise((resolve, reject) => {
      if (!this.recognition) {
        reject(new Error('Speech recognition not supported'));
        return;
      }

      this.recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        resolve(transcript);
      };

      this.recognition.onerror = (error) => {
        reject(error);
      };

      this.recognition.start();
    });
  }

  // Check browser support
  static getBrowserSupport() {
    return {
      synthesis: 'speechSynthesis' in window,
      recognition: 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window,
      mediaRecorder: 'MediaRecorder' in window,
      getUserMedia: 'mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices,
    };
  }
}

// Create singleton instance
const voiceService = new VoiceService();

// Voice Controls Component
const VoiceControlsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
}));

const VoiceButton = styled(IconButton)(({ theme, active }) => ({
  color: active ? theme.palette.primary.main : theme.palette.text.secondary,
  backgroundColor: active ? theme.palette.primary.light + '20' : 'transparent',
  '&:hover': {
    backgroundColor: active 
      ? theme.palette.primary.light + '30' 
      : theme.palette.action.hover,
  },
}));

export const VoiceControls = ({ onVoiceMessage, onTextMessage, disabled = false }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [recordingPromise, setRecordingPromise] = useState(null);
  const [support] = useState(VoiceService.getBrowserSupport());

  const handleStartRecording = async () => {
    try {
      setIsRecording(true);
      const promise = voiceService.startRecording();
      setRecordingPromise(promise);
      
      const audioBlob = await promise;
      if (onVoiceMessage) {
        onVoiceMessage(audioBlob);
      }
    } catch (error) {
      console.error('Recording error:', error);
      alert('Recording failed: ' + error.message);
    } finally {
      setIsRecording(false);
      setRecordingPromise(null);
    }
  };

  const handleStopRecording = () => {
    voiceService.stopRecording();
    setIsRecording(false);
  };

  const handleSpeechToText = async () => {
    try {
      const transcript = await voiceService.startSpeechRecognition();
      if (onTextMessage) {
        onTextMessage(transcript);
      }
    } catch (error) {
      console.error('Speech recognition error:', error);
      alert('Speech recognition failed: ' + error.message);
    }
  };

  return (
    <VoiceControlsContainer>
      {/* Recording button */}
      {support.mediaRecorder && support.getUserMedia && (
        <VoiceButton
          active={isRecording}
          onClick={isRecording ? handleStopRecording : handleStartRecording}
          disabled={disabled}
          title={isRecording ? 'Stop recording' : 'Start voice recording'}
        >
          {isRecording ? <MicOff /> : <Mic />}
        </VoiceButton>
      )}

      {/* Speech-to-text button */}
      {support.recognition && (
        <VoiceButton
          onClick={handleSpeechToText}
          disabled={disabled || isRecording}
          title="Speech to text"
        >
          <VolumeUp />
        </VoiceButton>
      )}

      {/* Settings button */}
      <VoiceButton
        onClick={() => setShowSettings(!showSettings)}
        title="Voice settings"
      >
        <Settings />
      </VoiceButton>

      {/* Voice settings panel */}
      {showSettings && (
        <VoiceSettings onClose={() => setShowSettings(false)} />
      )}
    </VoiceControlsContainer>
  );
};

// Voice Settings Component
const SettingsPanel = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '100%',
  right: 0,
  zIndex: 1000,
  minWidth: 300,
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[4],
}));

export const VoiceSettings = ({ onClose }) => {
  const [settings, setSettings] = useState(voiceService.settings);
  const [voices] = useState(voiceService.getAvailableVoices());

  const handleSettingChange = (key, value) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    voiceService.updateSettings(newSettings);
  };

  return (
    <SettingsPanel>
      <Typography variant="h6" gutterBottom>
        Voice Settings
      </Typography>

      {/* Voice selection */}
      <FormControl fullWidth margin="normal">
        <InputLabel>Voice</InputLabel>
        <Select
          value={settings.voice || ''}
          onChange={(e) => handleSettingChange('voice', e.target.value)}
        >
          {voices.map((voice) => (
            <MenuItem key={voice.name} value={voice.name}>
              {voice.name} ({voice.lang})
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Rate slider */}
      <Box margin="normal">
        <Typography gutterBottom>Speech Rate</Typography>
        <Slider
          value={settings.rate}
          onChange={(e, value) => handleSettingChange('rate', value)}
          min={0.5}
          max={2}
          step={0.1}
          marks={[
            { value: 0.5, label: '0.5x' },
            { value: 1, label: '1x' },
            { value: 2, label: '2x' },
          ]}
        />
      </Box>

      {/* Pitch slider */}
      <Box margin="normal">
        <Typography gutterBottom>Pitch</Typography>
        <Slider
          value={settings.pitch}
          onChange={(e, value) => handleSettingChange('pitch', value)}
          min={0.5}
          max={2}
          step={0.1}
          marks={[
            { value: 0.5, label: 'Low' },
            { value: 1, label: 'Normal' },
            { value: 2, label: 'High' },
          ]}
        />
      </Box>

      {/* Volume slider */}
      <Box margin="normal">
        <Typography gutterBottom>Volume</Typography>
        <Slider
          value={settings.volume}
          onChange={(e, value) => handleSettingChange('volume', value)}
          min={0}
          max={1}
          step={0.1}
          marks={[
            { value: 0, label: '0%' },
            { value: 0.5, label: '50%' },
            { value: 1, label: '100%' },
          ]}
        />
      </Box>

      <Box display="flex" justifyContent="flex-end" marginTop={2}>
        <IconButton onClick={onClose} size="small">
          <VolumeOff />
        </IconButton>
      </Box>
    </SettingsPanel>
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