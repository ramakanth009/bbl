import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

const style = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 320,
  maxWidth: 400,
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
    sx={{ zIndex: 1500 }}
  >
    <Box sx={style}>
      <Typography id="create-feature-title" variant="h6" fontWeight={700} mb={2} color="primary">
        Coming Soon!
      </Typography>
      <Typography id="create-feature-desc" variant="body1" mb={3} align="center">
        The "Create" feature is not yet available.<br />
        Stay tuned for updates!
      </Typography>
      <Button variant="contained" color="primary" onClick={onClose}>
        Close
      </Button>
    </Box>
  </Modal>
);

export default CreateFeaturePopup;
