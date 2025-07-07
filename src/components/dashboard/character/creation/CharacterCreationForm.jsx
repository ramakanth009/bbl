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
  FormControlLabel,
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
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import {
  Person,
  Psychology,
  Settings,
  Save,
  Close,
  Add,
  Delete,
} from '@mui/icons-material';
import apiService from '../../../../services/api';

const useStyles = makeStyles({
  dialog: {
    '& .MuiDialog-paper': {
      backgroundColor: '#1a1a1a',
      color: '#fff',
      maxWidth: '800px',
      width: '100%',
      maxHeight: '90vh',
    },
  },
  stepContent: {
    minHeight: '400px',
    padding: '24px 0',
  },
  formSection: {
    marginBottom: '24px',
  },
  chipContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginTop: '8px',
  },
  addChipButton: {
    marginTop: '8px',
  },
  switchRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 0',
  },
});

const steps = ['Basic Info', 'Personality', 'Advanced Settings'];

const CharacterCreationForm = ({ open, onClose, onCharacterCreated }) => {
  const classes = useStyles();
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
    <Box>
      <Typography variant="h6" gutterBottom>
        <Person sx={{ verticalAlign: 'middle', mr: 1 }} />
        Character Basic Information
      </Typography>
      
      <Box className={classes.formSection}>
        <TextField
          fullWidth
          label="Character Name *"
          value={characterData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          margin="normal"
          required
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
        />
        
        <TextField
          fullWidth
          label="Image URL"
          value={characterData.img}
          onChange={(e) => handleInputChange('img', e.target.value)}
          margin="normal"
          placeholder="https://example.com/character-image.jpg"
        />
      </Box>

      <Box className={classes.formSection}>
        <FormControl fullWidth margin="normal">
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

        <FormControl fullWidth margin="normal">
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

        <TextField
          fullWidth
          label="Profession"
          value={characterData.profession}
          onChange={(e) => handleInputChange('profession', e.target.value)}
          margin="normal"
        />

        <TextField
          fullWidth
          label="Cultural Background"
          value={characterData.cultural_background}
          onChange={(e) => handleInputChange('cultural_background', e.target.value)}
          margin="normal"
        />
      </Box>

      <Box className={classes.formSection}>
        <Typography variant="subtitle2" gutterBottom>
          Known For
        </Typography>
        <Box display="flex" gap={1}>
          <TextField
            fullWidth
            size="small"
            value={newKnownFor}
            onChange={(e) => setNewKnownFor(e.target.value)}
            placeholder="Add what they're known for..."
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                addToArray('known_for', newKnownFor, setNewKnownFor);
              }
            }}
          />
          <Button
            variant="outlined"
            size="small"
            onClick={() => addToArray('known_for', newKnownFor, setNewKnownFor)}
            startIcon={<Add />}
          >
            Add
          </Button>
        </Box>
        <Box className={classes.chipContainer}>
          {characterData.known_for.map((item, index) => (
            <Chip
              key={index}
              label={item}
              onDelete={() => removeFromArray('known_for', index)}
              deleteIcon={<Delete />}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );

  const renderPersonality = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        <Psychology sx={{ verticalAlign: 'middle', mr: 1 }} />
        Personality & Communication
      </Typography>

      <Box className={classes.formSection}>
        <FormControl fullWidth margin="normal">
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

        <FormControl fullWidth margin="normal">
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

        <FormControl fullWidth margin="normal">
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

      <Box className={classes.formSection}>
        <Typography variant="subtitle2" gutterBottom>
          Personality Traits
        </Typography>
        <Card variant="outlined" sx={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
          <CardContent>
            <Box className={classes.switchRow}>
              <Typography>Optimistic</Typography>
              <Switch
                checked={characterData.personality_optimistic}
                onChange={(e) => handleInputChange('personality_optimistic', e.target.checked)}
              />
            </Box>
            <Box className={classes.switchRow}>
              <Typography>Patient</Typography>
              <Switch
                checked={characterData.personality_patient}
                onChange={(e) => handleInputChange('personality_patient', e.target.checked)}
              />
            </Box>
            <Box className={classes.switchRow}>
              <Typography>Serious</Typography>
              <Switch
                checked={characterData.personality_serious}
                onChange={(e) => handleInputChange('personality_serious', e.target.checked)}
              />
            </Box>
            <Box className={classes.switchRow}>
              <Typography>Introverted</Typography>
              <Switch
                checked={characterData.personality_introverted}
                onChange={(e) => handleInputChange('personality_introverted', e.target.checked)}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>

      <Box className={classes.formSection}>
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
            />
          )}
        />

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
            />
          )}
        />
      </Box>
    </Box>
  );

  const renderAdvancedSettings = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        <Settings sx={{ verticalAlign: 'middle', mr: 1 }} />
        Advanced Character Settings
      </Typography>

      <Box className={classes.formSection}>
        <TextField
          fullWidth
          label="Unique Trait"
          value={characterData.unique_trait}
          onChange={(e) => handleInputChange('unique_trait', e.target.value)}
          margin="normal"
          placeholder="What makes this character special?"
        />

        <FormControl fullWidth margin="normal">
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

        <FormControl fullWidth margin="normal">
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

      <Box className={classes.formSection}>
        <Typography variant="subtitle2" gutterBottom>
          Strengths
        </Typography>
        <Box display="flex" gap={1}>
          <TextField
            fullWidth
            size="small"
            value={newGoodAt}
            onChange={(e) => setNewGoodAt(e.target.value)}
            placeholder="What are they good at?"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                addToArray('good_at', newGoodAt, setNewGoodAt);
              }
            }}
          />
          <Button
            variant="outlined"
            size="small"
            onClick={() => addToArray('good_at', newGoodAt, setNewGoodAt)}
            startIcon={<Add />}
          >
            Add
          </Button>
        </Box>
        <Box className={classes.chipContainer}>
          {characterData.good_at.map((item, index) => (
            <Chip
              key={index}
              label={item}
              color="success"
              onDelete={() => removeFromArray('good_at', index)}
              deleteIcon={<Delete />}
            />
          ))}
        </Box>
      </Box>

      <Box className={classes.formSection}>
        <Typography variant="subtitle2" gutterBottom>
          Weaknesses
        </Typography>
        <Box display="flex" gap={1}>
          <TextField
            fullWidth
            size="small"
            value={newNotGoodAt}
            onChange={(e) => setNewNotGoodAt(e.target.value)}
            placeholder="What are they not good at?"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                addToArray('not_good_at', newNotGoodAt, setNewNotGoodAt);
              }
            }}
          />
          <Button
            variant="outlined"
            size="small"
            onClick={() => addToArray('not_good_at', newNotGoodAt, setNewNotGoodAt)}
            startIcon={<Add />}
          >
            Add
          </Button>
        </Box>
        <Box className={classes.chipContainer}>
          {characterData.not_good_at.map((item, index) => (
            <Chip
              key={index}
              label={item}
              color="error"
              onDelete={() => removeFromArray('not_good_at', index)}
              deleteIcon={<Delete />}
            />
          ))}
        </Box>
      </Box>

      <Box className={classes.formSection}>
        <Typography variant="subtitle2" gutterBottom>
          Knowledge Base
        </Typography>
        <Box display="flex" gap={1}>
          <TextField
            fullWidth
            size="small"
            value={newKnowledgeEntry}
            onChange={(e) => setNewKnowledgeEntry(e.target.value)}
            placeholder="Add specialized knowledge..."
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                addToArray('knowledge_entries', newKnowledgeEntry, setNewKnowledgeEntry);
              }
            }}
          />
          <Button
            variant="outlined"
            size="small"
            onClick={() => addToArray('knowledge_entries', newKnowledgeEntry, setNewKnowledgeEntry)}
            startIcon={<Add />}
          >
            Add
          </Button>
        </Box>
        <Box className={classes.chipContainer}>
          {characterData.knowledge_entries.map((item, index) => (
            <Chip
              key={index}
              label={item}
              color="info"
              onDelete={() => removeFromArray('knowledge_entries', index)}
              deleteIcon={<Delete />}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );

  if (!formOptions && !loading) return null;

  return (
    <Dialog open={open} onClose={handleClose} className={classes.dialog} maxWidth="md">
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5">Create New Character</Typography>
          <Button onClick={handleClose} color="inherit">
            <Close />
          </Button>
        </Box>
      </DialogTitle>

      <DialogContent>
        {loading && (
          <Box display="flex" justifyContent="center" p={4}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Character created successfully! 🎉
          </Alert>
        )}

        {formOptions && !loading && (
          <>
            <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            <Box className={classes.stepContent}>
              {activeStep === 0 && renderBasicInfo()}
              {activeStep === 1 && renderPersonality()}
              {activeStep === 2 && renderAdvancedSettings()}
            </Box>
          </>
        )}
      </DialogContent>

      <DialogActions>
        <Box display="flex" justifyContent="space-between" width="100%" p={2}>
          <Button
            onClick={handleBack}
            disabled={activeStep === 0 || loading}
          >
            Back
          </Button>
          
          <Box>
            {activeStep < steps.length - 1 ? (
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={!characterData.name || !characterData.description || loading}
              >
                Next
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={!characterData.name || !characterData.description || loading}
                startIcon={loading ? <CircularProgress size={20} /> : <Save />}
              >
                {loading ? 'Creating...' : 'Create Character'}
              </Button>
            )}
          </Box>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default CharacterCreationForm;