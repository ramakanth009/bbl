import React from 'react';
import { Box, Card, CardContent, CardHeader, Chip, Button, Typography, Stack, Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { WorkspacePremium, CheckCircleOutline } from '@mui/icons-material';

// Dummy plans for the Upgrade flow. Purely presentational.
// Usage example:
// <UpgradePlans onSelectPlan={(plan) => console.log('Selected plan:', plan)} />
const plans = [
  {
    key: 'free',
    name: 'Free',
    price: '₹0',
    period: '/mo',
    highlight: false,
    badge: 'Current',
    features: [
      'Basic chat with characters',
      '3 active chats per day',
      'Standard response speed',
      'Community support',
      'Limited conversation history (last 10 messages)',
      'Access to public characters',
      'Share links with basic previews',
    ],
  },
  {
    key: 'pro',
    name: 'Pro',
    price: '₹749',
    period: '/mo',
    highlight: true,
    badge: 'Popular',
    features: [
      'Priority chat speeds',
      'Unlimited daily chats',
      'Extended history (90 days)',
      'Create and save custom characters',
      'Early access to new features',
      'Enhanced share previews (high‑res images)',
      'Email support with 24–48h response',
      'Export conversations (TXT/Markdown)',
    ],
  },
  {
    key: 'premium',
    name: 'Premium',
    price: '₹1,499',
    period: '/mo',
    highlight: false,
    badge: 'Best value',
    features: [
      'Fastest chat speeds',
      'Unlimited history (no expiry)',
      'Priority support (same‑day)',
      'Advanced character tools & analytics',
      'Team sharing and collaboration',
      'Custom themes & personalization',
      'Early access + beta program invites',
      'Dedicated feedback channel',
    ],
  },
];

const UpgradePlans = ({ onSelectPlan }) => {
  const handleSelect = (plan) => {
    if (onSelectPlan) onSelectPlan(plan);
  };

  return (
    <Box sx={{
      width: '100%',
      p: { xs: 2, sm: 3 },
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <WorkspacePremium sx={{ color: '#8b5cf6' }} />
        <Typography variant="h6" sx={{ fontWeight: 700 }}>Upgrade plan</Typography>
      </Box>

      <Typography variant="body2" sx={{ color: '#9ca3af', mb: 3 }}>
        Choose a plan to unlock more features. These are dummy plans you can wire to real billing later.
      </Typography>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
        {plans.map((plan) => (
          <Card
            key={plan.key}
            variant="outlined"
            sx={{
              flex: 1,
              borderRadius: 2,
              borderColor: plan.highlight ? 'rgba(99,102,241,0.4)' : 'rgba(255,255,255,0.08)',
              background: 'rgba(26,26,26,0.6)',
              backdropFilter: 'blur(10px)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <CardHeader
              titleTypographyProps={{ sx: { fontWeight: 700 } }}
              title={plan.name}
              action={
                <Stack direction="row" spacing={1} alignItems="center">
                  <Chip size="small" label={plan.badge} sx={{
                    bgcolor: plan.highlight ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.06)',
                    color: plan.highlight ? '#a5b4fc' : '#9ca3af',
                    border: plan.highlight ? '1px solid rgba(99,102,241,0.4)' : '1px solid rgba(255,255,255,0.12)'
                  }} />
                  <Chip size="small" label="Coming soon" sx={{
                    bgcolor: 'rgba(255,255,255,0.06)',
                    color: '#9ca3af',
                    border: '1px solid rgba(255,255,255,0.12)'
                  }} />
                </Stack>
              }
            />
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1, minHeight: '48px' }}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  gap: 0.5,
                  filter: 'blur(4px)',
                  userSelect: 'none',
                  opacity: 0.6,
                  pointerEvents: 'none',
                  flex: 1
                }}>
                  <Typography variant="h4" sx={{ fontWeight: 800 }}>{plan.price}</Typography>
                  <Typography variant="body2" sx={{ color: '#9ca3af' }}>{plan.period}</Typography>
                </Box>
                <Chip 
                  label="Coming soon" 
                  size="small" 
                  sx={{ 
                    bgcolor: 'rgba(255,255,255,0.1)', 
                    color: '#9ca3af',
                    border: '1px solid rgba(255,255,255,0.12)',
                    fontWeight: 500,
                    fontSize: '0.7rem',
                    height: '24px'
                  }} 
                />
              </Box>

              <Divider sx={{ my: 1.5, borderColor: 'rgba(255,255,255,0.08)' }} />

              <List dense sx={{ filter: 'blur(2px)', opacity: 0.6, userSelect: 'none', pointerEvents: 'none' }}>
                {plan.features.map((f, i) => (
                  <ListItem key={i} sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 28 }}>
                      <CheckCircleOutline sx={{ fontSize: 18, color: '#22c55e' }} />
                    </ListItemIcon>
                    <ListItemText primaryTypographyProps={{ sx: { fontSize: 13 } }} primary={f} />
                  </ListItem>
                ))}
              </List>

              <Button
                fullWidth
                variant={plan.highlight ? 'contained' : 'outlined'}
                disabled
                onClick={() => handleSelect(plan)}
                sx={{
                  mt: 2,
                  textTransform: 'none',
                  borderRadius: 1.5,
                  background: plan.highlight ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' : 'transparent',
                  borderColor: plan.highlight ? 'transparent' : 'rgba(255,255,255,0.16)',
                  '&:hover': {
                    background: plan.highlight ? 'linear-gradient(135deg, #5855eb 0%, #7c3aed 100%)' : 'rgba(255,255,255,0.06)'
                  }
                }}
              >
                Coming soon
              </Button>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
};

export default UpgradePlans;
