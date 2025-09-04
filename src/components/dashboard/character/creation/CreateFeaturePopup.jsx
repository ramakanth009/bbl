import React from "react";
import { Modal, Box, Typography, Button, Divider, Stack, Chip } from "@mui/material";
import { 
  AddCircleOutline, 
  SmartToyOutlined, 
  NotificationsOutlined,
  InfoOutlined 
} from "@mui/icons-material";

const style = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 380,
  maxWidth: 480,
  bgcolor: 'background.paper',
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  zIndex: 1500,
};

const CreateFeaturePopup = ({ open, onClose }) => (
  <Modal
    open={open}
    onClose={onClose}
    aria-labelledby="create-feature-title"
    aria-describedby="create-feature-desc"
    closeAfterTransition
    sx={{ 
      zIndex: 1500,
      backdropFilter: 'blur(8px)',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    }}
  >
    <Box sx={style}>
      {/* Header with Icon */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <AddCircleOutline sx={{ fontSize: 32, color: 'primary.main', mr: 1.5 }} />
        <Typography 
          id="create-feature-title" 
          variant="h5" 
          fontWeight={700} 
          color="primary"
        >
          Create Your Own Character
        </Typography>
      </Box>

      {/* Status Chip */}
      <Chip 
        label="Coming Soon" 
        color="warning" 
        variant="outlined" 
        sx={{ mb: 3, fontWeight: 600 }}
      />

      {/* Description */}
      <Typography 
        id="create-feature-desc" 
        variant="body1" 
        mb={3} 
        align="center"
        color="text.secondary"
        sx={{ lineHeight: 1.6 }}
      >
        We're working on an exciting new feature that will let you create and customize 
        your own AI characters! You'll be able to design unique personalities, 
        set conversation styles, and bring your creative ideas to life.
      </Typography>

      <Divider sx={{ width: '100%', mb: 3 }} />

      {/* Upcoming Features */}
      <Typography variant="h6" fontWeight={600} mb={2} color="text.primary">
        What's Coming:
      </Typography>
      
      <Stack spacing={1.5} sx={{ width: '100%', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <SmartToyOutlined sx={{ color: 'primary.main', mr: 1.5, fontSize: 20 }} />
          <Typography variant="body2" color="text.secondary">
            Custom character personalities and traits
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <AddCircleOutline sx={{ color: 'primary.main', mr: 1.5, fontSize: 20 }} />
          <Typography variant="body2" color="text.secondary">
            Easy character creation tools
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <InfoOutlined sx={{ color: 'primary.main', mr: 1.5, fontSize: 20 }} />
          <Typography variant="body2" color="text.secondary">
            Multi-language support for your characters
          </Typography>
        </Box>
      </Stack>

      <Divider sx={{ width: '100%', mb: 3 }} />

      {/* Notification Option */}
      <Box sx={{ 
        bgcolor: 'primary.50', 
        p: 2, 
        borderRadius: 2, 
        width: '100%', 
        mb: 3,
        display: 'flex',
        alignItems: 'center',
        border: '1px solid',
        borderColor: 'primary.100'
      }}>
        <NotificationsOutlined sx={{ color: 'primary.main', mr: 1.5 }} />
        <Typography variant="body2" color="primary.main" sx={{ fontWeight: 500 }}>
          Stay tuned! We'll notify all users when this feature launches.
        </Typography>
      </Box>

      {/* Action Button */}
      <Button 
        variant="contained" 
        color="primary" 
        onClick={onClose}
        size="large"
        sx={{ 
          minWidth: 120,
          textTransform: 'none',
          fontWeight: 600
        }}
      >
        Got it!
      </Button>
    </Box>
  </Modal>
);

export default CreateFeaturePopup;