import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Tooltip,
  IconButton,
  Avatar,
  ListItemButton,
  Typography,
  Chip,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  Button
} from "@mui/material";
import {
  HelpOutline,
  ChevronRight,
  Logout,
  Article,
  Policy,
  ExpandMore,
} from "@mui/icons-material";

// Deterministic avatar color generation based on a stable identifier (email/name)
const hashCode = (str) => {
  let hash = 0;
  if (!str) return hash;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
};

const hsl = (h, s, l) => `hsl(${h}, ${s}%, ${l}%)`;

const generateAvatarStyle = (key) => {
  const hash = hashCode(key || "default");
  // Derive a single solid color from the hash (no gradients)
  const h = hash % 360;      // hue
  const s = 65;              // saturation
  const l = 45;              // lightness
  const background = hsl(h, s, l);
  // Choose text color based on lightness for contrast
  const color = l < 50 ? "#fff" : "#111";
  return { background, color };
};

const ProfileSection = ({ open, isMobile, logout, displayEmail, displayName, avatarInitials, compact = false, fixedBottomMenu = true }) => {
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const [helpAnchorEl, setHelpAnchorEl] = useState(null);
  const [helpMenuOpen, setHelpMenuOpen] = useState(false);
  const helpCloseTimerRef = useRef(null);

  const avatarKey = displayEmail || displayName || avatarInitials || "user";
  const { background: avatarBg, color: avatarFg } = generateAvatarStyle(avatarKey);

  const handleOpenProfileMenu = (event) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleCloseProfileMenu = () => {
    setProfileAnchorEl(null);
    setHelpAnchorEl(null);
    setHelpMenuOpen(false);
    if (helpCloseTimerRef.current) {
      clearTimeout(helpCloseTimerRef.current);
      helpCloseTimerRef.current = null;
    }
  };

  const handleOpenHelpMenu = (event) => {
    setHelpAnchorEl(event?.currentTarget || null);
    if (helpCloseTimerRef.current) {
      clearTimeout(helpCloseTimerRef.current);
      helpCloseTimerRef.current = null;
    }
    setHelpMenuOpen(true);
  };

  const handleCloseHelpMenu = () => {
    // Close only the submenu; keep anchor so we can re-open on hover quickly
    setHelpMenuOpen(false);
  };

  const handleHelpMenuEnter = () => {
    if (helpCloseTimerRef.current) {
      clearTimeout(helpCloseTimerRef.current);
      helpCloseTimerRef.current = null;
    }
    setHelpMenuOpen(true);
  };

  const handleHelpMenuLeave = () => {
    if (helpCloseTimerRef.current) {
      clearTimeout(helpCloseTimerRef.current);
    }
    helpCloseTimerRef.current = setTimeout(() => {
      setHelpMenuOpen(false);
    }, 200);
  };

  return (
    <Box sx={{ mt: compact ? 0 : "auto" }}>
      {/* Profile trigger */}
      {(compact || (!open && !isMobile)) ? (
        <Tooltip title={displayEmail || displayName} placement={compact ? "bottom" : "right"} arrow>
          <IconButton
            onClick={handleOpenProfileMenu}
            sx={{
              padding: "2px !important",
              borderRadius: "8px !important",
              border: "1px solid rgba(255,255,255,0.08) !important",
              "&:hover": { backgroundColor: "#252525 !important" },
            }}
          >
            <Avatar sx={{ width: 28, height: 28, fontSize: 12, bgcolor: "transparent", background: avatarBg, color: avatarFg, fontWeight: 700 }}>
              {avatarInitials}
            </Avatar>
          </IconButton>
        </Tooltip>
      ) : (
        <ListItemButton
          onClick={handleOpenProfileMenu}
          sx={{
            border: "1px solid rgba(255, 255, 255, 0.08) !important",
            "&:hover": { border: "1px solid rgba(255, 255, 255, 0.12) !important" },
            display: "flex",
            alignItems: "center",
            gap: "10px",
            borderRadius: "6px",
            padding: "8px 12px",
            color: "#ccc",
            backgroundColor: "transparent",
          }}
          disableRipple
        >
          <Avatar sx={{ width: 28, height: 28, fontSize: 12, bgcolor: "transparent", background: avatarBg, color: avatarFg, fontWeight: 700 }}>
            {avatarInitials}
          </Avatar>
          {open && (
            <Box sx={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
              {displayEmail && (
                <Typography noWrap sx={{ fontSize: "13px", color: "#e5e7eb", fontWeight: 600 }}>
                  {displayEmail}
                </Typography>
              )}
              <Box sx={{ mt: 0.5 }}>
                <Chip
                  label="Free"
                  size="small"
                  sx={{
                    height: "18px",
                    fontSize: "10px",
                    color: "#9ca3af",
                    backgroundColor: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.12)",
                  }}
                />
              </Box>
            </Box>
          )}
          {open && (
            <ExpandMore
              sx={{
                marginLeft: "auto",
                color: "#9ca3af",
                fontSize: 18,
                transform: profileAnchorEl ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.2s ease-in-out",
              }}
            />
          )}
        </ListItemButton>
      )}

      {/* Profile menu */}
      <Menu
        anchorEl={profileAnchorEl}
        open={Boolean(profileAnchorEl)}
        onClose={handleCloseProfileMenu}
        PaperProps={{
          sx: {
            width: "240px",
            maxHeight: "400px",
            background: "rgba(26, 26, 26, 0.95)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(99, 102, 241, 0.2)",
            borderRadius: "12px",
            overflow: "hidden",
            "& .MuiMenu-list": {
              padding: "8px 0",
            },
            "& .MuiMenuItem-root": {
              padding: "8px 16px",
              margin: "0 8px",
              borderRadius: "6px",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.08)",
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        sx={fixedBottomMenu ? {
          "& .MuiPaper-root": {
            position: "fixed",
            bottom: "100px",
            top: "auto !important",
            margin: 0,
          },
        } : undefined}
      >
        {/* Header with email */}
        <Box sx={{ px: 2, pt: 1.5, pb: 1 }}>
          {displayEmail && (
            <Typography noWrap sx={{ fontSize: 13, color: "#e5e7eb", fontWeight: 600 }}>
              {displayEmail}
            </Typography>
          )}
        </Box>
        <Divider sx={{ opacity: 0.12 }} />

        {/* Blog */}
        <MenuItem
          component={Link}
          to="/blog"
          onClick={handleCloseProfileMenu}
        >
          <ListItemIcon>
            <Article fontSize="small" />
          </ListItemIcon>
          Blog
        </MenuItem>

        {/* Help with submenu */}
        <MenuItem
          onMouseEnter={handleOpenHelpMenu}
          onMouseLeave={handleCloseHelpMenu}
          sx={{ "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.08)" } }}
        >
          <ListItemIcon>
            <HelpOutline fontSize="small" />
          </ListItemIcon>
          Help
          <ChevronRight sx={{ marginLeft: "auto", fontSize: 18, color: "#9ca3af" }} />
        </MenuItem>

        <Divider sx={{ my: 0.5 }} />

        {/* Log out */}
        <MenuItem
          onClick={() => {
            handleCloseProfileMenu();
            logout();
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Log out
        </MenuItem>
      </Menu>

      {/* Help submenu */}
      <Menu
        anchorEl={helpAnchorEl}
        open={helpMenuOpen}
        onClose={handleCloseHelpMenu}
        disableAutoFocusItem
        disableAutoFocus
        disableEnforceFocus
        MenuListProps={{
          onMouseEnter: handleHelpMenuEnter,
          onMouseLeave: handleHelpMenuLeave,
        }}
        PaperProps={{
          sx: {
            width: "200px",
            maxHeight: "300px",
            background: "rgba(26, 26, 26, 0.95)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(99, 102, 241, 0.2)",
            borderRadius: "12px",
            overflow: "hidden",
            "& .MuiMenu-list": {
              padding: "8px 0",
            },
            "& .MuiMenuItem-root": {
              padding: "8px 16px",
              margin: "0 8px",
              borderRadius: "6px",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.08)",
              },
            },
          },
        }}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
        transformOrigin={{ horizontal: "left", vertical: "top" }}
        sx={fixedBottomMenu ? {
          pointerEvents: "none",
          "& .MuiPaper-root": {
            pointerEvents: "auto",
            position: "fixed",
            bottom: "100px",
            top: "auto !important",
            margin: 0,
          },
        } : {}}
      >
        <MenuItem onClick={handleCloseHelpMenu}
        component={Link}
        to="/faq"
        >
          <ListItemIcon>
            <HelpOutline fontSize="small" />
          </ListItemIcon>
          FAQs
        </MenuItem>
        <MenuItem onClick={handleCloseHelpMenu}
        component={Link}
        to="/terms"
        >
          <ListItemIcon>
            <Policy fontSize="small" />
          </ListItemIcon>
          Terms & Policies
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default ProfileSection;
