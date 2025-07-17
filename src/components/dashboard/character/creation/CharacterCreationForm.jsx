import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  Chip,
  Button,
  Stepper,
  Step,
  StepLabel,
  Alert,
  CircularProgress,
  Autocomplete,
  Card,
  CardContent,
  Divider,
  IconButton,
  Fade,
  Grow,
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import {
  Person,
  Psychology,
  Settings,
  Save,
  Close,
  Add,
  Delete,
  NavigateNext,
  NavigateBefore,
  CheckCircleOutline,
} from '@mui/icons-material';
import apiService from '../../../../services/api';

// Styled Components
const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    backgroundColor: '#1f1f23',
    border: '1px solid #2a2a2e',
    borderRadius: 16,
    maxWidth: '900px',
    width: '100%',
    maxHeight: '90vh',
    boxShadow: theme.shadows[8],
    backgroundImage: 'linear-gradient(145deg, #1a1a1a 0%, #1f1f23 100%)',
    backdropFilter: 'blur(20px)',
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(99, 102, 241, 0.02) 100%)',
      pointerEvents: 'none',
      borderRadius: 16,
    },
  },
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  background: 'linear-gradient(135deg, #0c0c0c 0%, #1f1f23 100%)',
  borderBottom: '1px solid #2a2a2e',
  position: 'relative',
  zIndex: 2,
  '& .MuiTypography-root': {
    fontWeight: 600,
    color: '#ffffff',
  },
}));

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  position: 'relative',
  zIndex: 2,
  backgroundColor: 'transparent',
  padding: theme.spacing(3),
}));

const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  background: 'linear-gradient(135deg, #1f1f23 0%, #0c0c0c 100%)',
  borderTop: '1px solid #2a2a2e',
  padding: theme.spacing(2, 3),
  position: 'relative',
  zIndex: 2,
}));

const StyledStepper = styled(Stepper)(({ theme }) => ({
  backgroundColor: 'transparent',
  padding: theme.spacing(2, 0, 3, 0),
  '& .MuiStepLabel-label': {
    color: '#a0a0a0',
    fontWeight: 500,
    '&.Mui-active': {
      color: '#6366f1',
      fontWeight: 600,
    },
    '&.Mui-completed': {
      color: '#ffffff',
      fontWeight: 500,
    },
  },
  '& .MuiStepIcon-root': {
    color: '#0c0c0c',
    border: '2px solid #2a2a2e',
    borderRadius: '50%',
    '&.Mui-active': {
      color: '#6366f1',
      borderColor: '#6366f1',
    },
    '&.Mui-completed': {
      color: '#6366f1',
      borderColor: '#6366f1',
    },
  },
}));

const StepContent = styled(Box)(({ theme }) => ({
  minHeight: '400px',
  padding: theme.spacing(2, 0),
}));

const FormSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  '& .MuiTextField-root': {
    '& .MuiOutlinedInput-root': {
      backgroundColor: '#0c0c0c',
      transition: 'all 0.2s ease',
      '& fieldset': {
        borderColor: '#2a2a2e',
      },
      '&:hover': {
        backgroundColor: '#28282c',
        '& fieldset': {
          borderColor: '#6366f1',
        },
      },
      '&.Mui-focused': {
        backgroundColor: '#28282c',
        '& fieldset': {
          borderColor: '#6366f1',
          borderWidth: 2,
        },
      },
    },
  },
  '& .MuiFormControl-root': {
    '& .MuiOutlinedInput-root': {
      backgroundColor: '#0c0c0c',
      transition: 'all 0.2s ease',
      '& fieldset': {
        borderColor: '#2a2a2e',
      },
      '&:hover': {
        backgroundColor: '#28282c',
        '& fieldset': {
          borderColor: '#6366f1',
        },
      },
      '&.Mui-focused': {
        backgroundColor: '#28282c',
        '& fieldset': {
          borderColor: '#6366f1',
          borderWidth: 2,
        },
      },
    },
  },
}));

const SectionHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
  padding: theme.spacing(2),
  background: 'linear-gradient(135deg, #0c0c0c 0%, rgba(99, 102, 241, 0.05) 100%)',
  borderRadius: 12,
  border: '1px solid #2a2a2e',
  '& .MuiSvgIcon-root': {
    marginRight: theme.spacing(1),
    color: '#6366f1',
    fontSize: '1.5rem',
  },
  '& .MuiTypography-root': {
    fontWeight: 600,
    color: '#ffffff',
  },
}));

const ChipContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(1),
  marginTop: theme.spacing(1),
  '& .MuiChip-root': {
    backgroundColor: '#0c0c0c',
    borderColor: '#2a2a2e',
    color: '#ffffff',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: '#28282c',
      borderColor: '#6366f1',
    },
    '&.MuiChip-colorSuccess': {
      backgroundColor: 'rgba(76, 175, 80, 0.1)',
      borderColor: 'rgba(76, 175, 80, 0.3)',
      color: '#81c784',
    },
    '&.MuiChip-colorError': {
      backgroundColor: 'rgba(244, 67, 54, 0.1)',
      borderColor: 'rgba(244, 67, 54, 0.3)',
      color: '#e57373',
    },
    '&.MuiChip-colorInfo': {
      backgroundColor: 'rgba(33, 150, 243, 0.1)',
      borderColor: 'rgba(33, 150, 243, 0.3)',
      color: '#64b5f6',
    },
  },
}));

const TraitCard = styled(Card)(({ theme }) => ({
  backgroundColor: 'rgba(99, 102, 241, 0.05)',
  border: '1px solid #2a2a2e',
  borderRadius: 12,
  transition: 'all 0.2s ease',
  '&:hover': {
    borderColor: '#6366f1',
    backgroundColor: 'rgba(99, 102, 241, 0.08)',
  },
}));

const SwitchRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(1.5, 0),
  borderBottom: '1px solid #2a2a2e',
  '&:last-child': {
    borderBottom: 'none',
  },
  '& .MuiTypography-root': {
    fontWeight: 500,
    color: '#ffffff',
  },
  '& .MuiSwitch-root': {
    '& .MuiSwitch-switchBase.Mui-checked': {
      color: '#6366f1',
      '& + .MuiSwitch-track': {
        backgroundColor: '#6366f1',
        opacity: 0.5,
      },
    },
  },
}));

const AddButton = styled(Button)(({ theme }) => ({
  borderColor: '#2a2a2e',
  color: '#a0a0a0',
  backgroundColor: 'transparent',
  borderRadius: 8,
  textTransform: 'none',
  fontWeight: 500,
  transition: 'all 0.2s ease',
  '&:hover': {
    borderColor: '#6366f1',
    backgroundColor: 'rgba(99, 102, 241, 0.08)',
    color: '#6366f1',
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: 10,
  textTransform: 'none',
  fontWeight: 600,
  padding: theme.spacing(1.5, 3),
  transition: 'all 0.2s ease',
  position: 'relative',
  overflow: 'hidden',
  '&.MuiButton-contained': {
    background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
    boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
    '&:hover': {
      background: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)',
      transform: 'translateY(-1px)',
      boxShadow: '0 6px 16px rgba(99, 102, 241, 0.4)',
    },
    '&:disabled': {
      background: '#666666',
      color: '#a0a0a0',
      boxShadow: 'none',
    },
  },
  '&.MuiButton-outlined': {
    borderColor: '#2a2a2e',
    color: '#ffffff',
    backgroundColor: 'transparent',
    '&:hover': {
      borderColor: '#6366f1',
      backgroundColor: 'rgba(99, 102, 241, 0.08)',
      color: '#6366f1',
    },
  },
}));

const LoadingOverlay = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(4),
  backgroundColor: 'rgba(31, 31, 35, 0.9)',
  borderRadius: 12,
  backdropFilter: 'blur(10px)',
}));

// Main Component
const steps = ['Basic Info', 'Personality', 'Advanced Settings'];

const CharacterCreationForm = ({ open, onClose, onCharacterCreated }) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formOptions, setFormOptions] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  // Form state
  const [characterData, setCharacterData] = useState({
    name: '',
    description: '',
    img: '',
    age_range: '',
    setting: '',
    profession: '',
    cultural_background: '',
    known_for: [],
    speaking_style: '',
    common_phrases: '',
    response_length: '',
    communication_quirks: [],
    excited_about: [],
    frustrated_by: [],
    deep_values: '',
    good_at: [],
    not_good_at: [],
    love_discussing: '',
    avoid_discussing: '',
    personality_optimistic: false,
    personality_patient: false,
    personality_serious: false,
    personality_introverted: false,
    character_flaws: [],
    unique_trait: '',
    disagreement_style: '',
    emotional_triggers: '',
    help_style: '',
    safety_level: '',
    content_tone: '',
    restricted_topics: '',
    knowledge_entries: [],
  });

  // Temporary input states for array fields
  const [newKnownFor, setNewKnownFor] = useState('');
  const [newGoodAt, setNewGoodAt] = useState('');
  const [newNotGoodAt, setNewNotGoodAt] = useState('');
  const [newKnowledgeEntry, setNewKnowledgeEntry] = useState('');

  useEffect(() => {
    if (open) {
      loadFormOptions();
    }
  }, [open]);

  const loadFormOptions = async () => {
    try {
      setLoading(true);
      const options = await apiService.getCharacterFormOptions();
      setFormOptions(options);
    } catch (err) {
      setError('Failed to load form options: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setCharacterData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addToArray = (field, value, clearInput) => {
    if (value.trim()) {
      handleInputChange(field, [...characterData[field], value.trim()]);
      clearInput('');
    }
  };

  const removeFromArray = (field, index) => {
    const newArray = characterData[field].filter((_, i) => i !== index);
    handleInputChange(field, newArray);
  };

  const handleNext = () => {
    setActiveStep(prev => prev + 1);
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Filter out empty fields
      const cleanedData = Object.fromEntries(
        Object.entries(characterData).filter(([key, value]) => {
          if (Array.isArray(value)) return value.length > 0;
          if (typeof value === 'string') return value.trim() !== '';
          return value !== null && value !== undefined;
        })
      );

      const result = await apiService.createCharacter(cleanedData);
      
      setSuccess(true);
      setTimeout(() => {
        onCharacterCreated?.(result.character);
        handleClose();
      }, 2000);
      
    } catch (err) {
      setError('Failed to create character: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setActiveStep(0);
    setError(null);
    setSuccess(false);
    setCharacterData({
      name: '',
      description: '',
      img: '',
      age_range: '',
      setting: '',
      profession: '',
      cultural_background: '',
      known_for: [],
      speaking_style: '',
      common_phrases: '',
      response_length: '',
      communication_quirks: [],
      excited_about: [],
      frustrated_by: [],
      deep_values: '',
      good_at: [],
      not_good_at: [],
      love_discussing: '',
      avoid_discussing: '',
      personality_optimistic: false,
      personality_patient: false,
      personality_serious: false,
      personality_introverted: false,
      character_flaws: [],
      unique_trait: '',
      disagreement_style: '',
      emotional_triggers: '',
      help_style: '',
      safety_level: '',
      content_tone: '',
      restricted_topics: '',
      knowledge_entries: [],
    });
    onClose();
  };

  const renderBasicInfo = () => (
    <Fade in={activeStep === 0} timeout={300}>
      <Box>
        <SectionHeader>
          <Person />
          <Typography variant="h6">Character Basic Information</Typography>
        </SectionHeader>
        
        <FormSection>
          <TextField
            fullWidth
            label="Character Name *"
            value={characterData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            margin="normal"
            required
            variant="outlined"
          />
          
          <TextField
            fullWidth
            label="Description *"
            value={characterData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            margin="normal"
            multiline
            rows={3}
            required
            placeholder="Describe your character's background and role..."
            variant="outlined"
          />
          
          <TextField
            fullWidth
            label="Image URL"
            value={characterData.img}
            onChange={(e) => handleInputChange('img', e.target.value)}
            margin="normal"
            placeholder="https://example.com/character-image.jpg"
            variant="outlined"
          />
        </FormSection>

        <FormSection>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
            <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel>Age Range</InputLabel>
              <Select
                value={characterData.age_range}
                onChange={(e) => handleInputChange('age_range', e.target.value)}
                label="Age Range"
              >
                {formOptions?.age_ranges?.map((age) => (
                  <MenuItem key={age} value={age}>{age}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel>Setting</InputLabel>
              <Select
                value={characterData.setting}
                onChange={(e) => handleInputChange('setting', e.target.value)}
                label="Setting"
              >
                {formOptions?.settings?.map((setting) => (
                  <MenuItem key={setting} value={setting}>{setting}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
            <TextField
              fullWidth
              label="Profession"
              value={characterData.profession}
              onChange={(e) => handleInputChange('profession', e.target.value)}
              margin="normal"
              variant="outlined"
            />

            <TextField
              fullWidth
              label="Cultural Background"
              value={characterData.cultural_background}
              onChange={(e) => handleInputChange('cultural_background', e.target.value)}
              margin="normal"
              variant="outlined"
            />
          </Box>
        </FormSection>

        <FormSection>
          <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600, color: 'text.primary' }}>
            Known For
          </Typography>
          <Box display="flex" gap={1}>
            <TextField
              fullWidth
              size="small"
              value={newKnownFor}
              onChange={(e) => setNewKnownFor(e.target.value)}
              placeholder="Add what they're known for..."
              variant="outlined"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  addToArray('known_for', newKnownFor, setNewKnownFor);
                }
              }}
            />
            <AddButton
              variant="outlined"
              size="small"
              onClick={() => addToArray('known_for', newKnownFor, setNewKnownFor)}
              startIcon={<Add />}
            >
              Add
            </AddButton>
          </Box>
          <ChipContainer>
            {characterData.known_for.map((item, index) => (
              <Chip
                key={index}
                label={item}
                variant="outlined"
                onDelete={() => removeFromArray('known_for', index)}
                deleteIcon={<Delete />}
              />
            ))}
          </ChipContainer>
        </FormSection>
      </Box>
    </Fade>
  );

  const renderPersonality = () => (
    <Fade in={activeStep === 1} timeout={300}>
      <Box>
        <SectionHeader>
          <Psychology />
          <Typography variant="h6">Personality & Communication</Typography>
        </SectionHeader>

        <FormSection>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr' }, gap: 2 }}>
            <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel>Speaking Style</InputLabel>
              <Select
                value={characterData.speaking_style}
                onChange={(e) => handleInputChange('speaking_style', e.target.value)}
                label="Speaking Style"
              >
                {formOptions?.speaking_styles?.map((style) => (
                  <MenuItem key={style.key} value={style.key}>
                    {style.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel>Response Length</InputLabel>
              <Select
                value={characterData.response_length}
                onChange={(e) => handleInputChange('response_length', e.target.value)}
                label="Response Length"
              >
                {formOptions?.response_lengths?.map((length) => (
                  <MenuItem key={length.key} value={length.key}>
                    {length.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel>Help Style</InputLabel>
              <Select
                value={characterData.help_style}
                onChange={(e) => handleInputChange('help_style', e.target.value)}
                label="Help Style"
              >
                {formOptions?.help_styles?.map((style) => (
                  <MenuItem key={style.key} value={style.key}>
                    {style.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </FormSection>

        <FormSection>
          <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600, color: 'text.primary', mb: 2 }}>
            Personality Traits
          </Typography>
          <TraitCard variant="outlined">
            <CardContent>
              <SwitchRow>
                <Typography>Optimistic</Typography>
                <Switch
                  checked={characterData.personality_optimistic}
                  onChange={(e) => handleInputChange('personality_optimistic', e.target.checked)}
                />
              </SwitchRow>
              <SwitchRow>
                <Typography>Patient</Typography>
                <Switch
                  checked={characterData.personality_patient}
                  onChange={(e) => handleInputChange('personality_patient', e.target.checked)}
                />
              </SwitchRow>
              <SwitchRow>
                <Typography>Serious</Typography>
                <Switch
                  checked={characterData.personality_serious}
                  onChange={(e) => handleInputChange('personality_serious', e.target.checked)}
                />
              </SwitchRow>
              <SwitchRow>
                <Typography>Introverted</Typography>
                <Switch
                  checked={characterData.personality_introverted}
                  onChange={(e) => handleInputChange('personality_introverted', e.target.checked)}
                />
              </SwitchRow>
            </CardContent>
          </TraitCard>
        </FormSection>

        <FormSection>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
            <Box>
              <Autocomplete
                multiple
                freeSolo
                options={formOptions?.excitement_topics || []}
                value={characterData.excited_about}
                onChange={(_, value) => handleInputChange('excited_about', value)}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Excited About"
                    placeholder="Topics that excite them..."
                    margin="normal"
                    variant="outlined"
                  />
                )}
              />
            </Box>

            <Box>
              <Autocomplete
                multiple
                freeSolo
                options={formOptions?.frustration_topics || []}
                value={characterData.frustrated_by}
                onChange={(_, value) => handleInputChange('frustrated_by', value)}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Frustrated By"
                    placeholder="Things that frustrate them..."
                    margin="normal"
                    variant="outlined"
                  />
                )}
              />
            </Box>
          </Box>
        </FormSection>
      </Box>
    </Fade>
  );

  const renderAdvancedSettings = () => (
    <Fade in={activeStep === 2} timeout={300}>
      <Box>
        <SectionHeader>
          <Settings />
          <Typography variant="h6">Advanced Character Settings</Typography>
        </SectionHeader>

        <FormSection>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr' }, gap: 2 }}>
            <TextField
              fullWidth
              label="Unique Trait"
              value={characterData.unique_trait}
              onChange={(e) => handleInputChange('unique_trait', e.target.value)}
              margin="normal"
              placeholder="What makes this character special?"
              variant="outlined"
            />

            <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel>Disagreement Style</InputLabel>
              <Select
                value={characterData.disagreement_style}
                onChange={(e) => handleInputChange('disagreement_style', e.target.value)}
                label="Disagreement Style"
              >
                {formOptions?.disagreement_styles?.map((style) => (
                  <MenuItem key={style.key} value={style.key}>
                    {style.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel>Safety Level</InputLabel>
              <Select
                value={characterData.safety_level}
                onChange={(e) => handleInputChange('safety_level', e.target.value)}
                label="Safety Level"
              >
                {formOptions?.safety_levels?.map((level) => (
                  <MenuItem key={level.key} value={level.key}>
                    {level.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </FormSection>

        <FormSection>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3 }}>
            <Box>
              <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600, color: 'text.primary' }}>
                Strengths
              </Typography>
              <Box display="flex" gap={1}>
                <TextField
                  fullWidth
                  size="small"
                  value={newGoodAt}
                  onChange={(e) => setNewGoodAt(e.target.value)}
                  placeholder="What are they good at?"
                  variant="outlined"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      addToArray('good_at', newGoodAt, setNewGoodAt);
                    }
                  }}
                />
                <AddButton
                  variant="outlined"
                  size="small"
                  onClick={() => addToArray('good_at', newGoodAt, setNewGoodAt)}
                  startIcon={<Add />}
                >
                  Add
                </AddButton>
              </Box>
              <ChipContainer>
                {characterData.good_at.map((item, index) => (
                  <Chip
                    key={index}
                    label={item}
                    color="success"
                    variant="outlined"
                    onDelete={() => removeFromArray('good_at', index)}
                    deleteIcon={<Delete />}
                  />
                ))}
              </ChipContainer>
            </Box>

            <Box>
              <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600, color: 'text.primary' }}>
                Weaknesses
              </Typography>
              <Box display="flex" gap={1}>
                <TextField
                  fullWidth
                  size="small"
                  value={newNotGoodAt}
                  onChange={(e) => setNewNotGoodAt(e.target.value)}
                  placeholder="What are they not good at?"
                  variant="outlined"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      addToArray('not_good_at', newNotGoodAt, setNewNotGoodAt);
                    }
                  }}
                />
                <AddButton
                  variant="outlined"
                  size="small"
                  onClick={() => addToArray('not_good_at', newNotGoodAt, setNewNotGoodAt)}
                  startIcon={<Add />}
                >
                  Add
                </AddButton>
              </Box>
              <ChipContainer>
                {characterData.not_good_at.map((item, index) => (
                  <Chip
                    key={index}
                    label={item}
                    color="error"
                    variant="outlined"
                    onDelete={() => removeFromArray('not_good_at', index)}
                    deleteIcon={<Delete />}
                  />
                ))}
              </ChipContainer>
            </Box>
          </Box>
        </FormSection>

        <FormSection>
          <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600, color: 'text.primary' }}>
            Knowledge Base
          </Typography>
          <Box display="flex" gap={1}>
            <TextField
              fullWidth
              size="small"
              value={newKnowledgeEntry}
              onChange={(e) => setNewKnowledgeEntry(e.target.value)}
              placeholder="Add specialized knowledge..."
              variant="outlined"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  addToArray('knowledge_entries', newKnowledgeEntry, setNewKnowledgeEntry);
                }
              }}
            />
            <AddButton
              variant="outlined"
              size="small"
              onClick={() => addToArray('knowledge_entries', newKnowledgeEntry, setNewKnowledgeEntry)}
              startIcon={<Add />}
            >
              Add
            </AddButton>
          </Box>
          <ChipContainer>
            {characterData.knowledge_entries.map((item, index) => (
              <Chip
                key={index}
                label={item}
                color="info"
                variant="outlined"
                onDelete={() => removeFromArray('knowledge_entries', index)}
                deleteIcon={<Delete />}
              />
            ))}
          </ChipContainer>
        </FormSection>
      </Box>
    </Fade>
  );

  if (!formOptions && !loading) return null;

  return (
    <StyledDialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <StyledDialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5">Create New Character</Typography>
          <IconButton onClick={handleClose} color="inherit" size="large">
            <Close />
          </IconButton>
        </Box>
      </StyledDialogTitle>

      <StyledDialogContent>
        {loading && (
          <LoadingOverlay>
            <CircularProgress size={40} />
          </LoadingOverlay>
        )}

        {error && (
          <Grow in={!!error}>
            <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
              {error}
            </Alert>
          </Grow>
        )}

        {success && (
          <Grow in={success}>
            <Alert 
              severity="success" 
              sx={{ mb: 2, borderRadius: 2 }}
              icon={<CheckCircleOutline />}
            >
              Character created successfully! 🎉
            </Alert>
          </Grow>
        )}

        {formOptions && !loading && (
          <>
            <StyledStepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </StyledStepper>

            <StepContent>
              {activeStep === 0 && renderBasicInfo()}
              {activeStep === 1 && renderPersonality()}
              {activeStep === 2 && renderAdvancedSettings()}
            </StepContent>
          </>
        )}
      </StyledDialogContent>

      <StyledDialogActions>
        <Box display="flex" justifyContent="space-between" width="100%">
          <ActionButton
            variant="outlined"
            onClick={handleBack}
            disabled={activeStep === 0 || loading}
            startIcon={<NavigateBefore />}
          >
            Back
          </ActionButton>
          
          <Box>
            {activeStep < steps.length - 1 ? (
              <ActionButton
                variant="contained"
                onClick={handleNext}
                disabled={!characterData.name || !characterData.description || loading}
                endIcon={<NavigateNext />}
              >
                Next
              </ActionButton>
            ) : (
              <ActionButton
                variant="contained"
                onClick={handleSubmit}
                disabled={!characterData.name || !characterData.description || loading}
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Save />}
              >
                {loading ? 'Creating...' : 'Create Character'}
              </ActionButton>
            )}
          </Box>
        </Box>
      </StyledDialogActions>
    </StyledDialog>
  );
};

export default CharacterCreationForm;