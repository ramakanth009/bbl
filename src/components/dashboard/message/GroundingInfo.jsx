import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Chip, 
  Collapse, 
  IconButton, 
  Link,
  Divider
} from '@mui/material';
import { 
  ExpandMore, 
  ExpandLess, 
  Search as SearchIcon,
  Link as LinkIcon 
} from '@mui/icons-material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  groundingContainer: {
    marginTop: '8px',
    padding: '8px 12px',
    backgroundColor: 'rgba(99, 102, 241, 0.05)',
    border: '1px solid rgba(99, 102, 241, 0.2)',
    borderRadius: '8px',
    fontSize: '0.75rem',
    '@media (max-width: 600px)': {
      padding: '6px 8px',
      fontSize: '0.7rem',
    },
  },
  groundingHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'rgba(99, 102, 241, 0.08)',
    },
    borderRadius: '4px',
    padding: '2px 4px',
    transition: 'background-color 0.2s ease',
  },
  groundingTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '0.75rem',
    fontWeight: 500,
    color: '#818cf8',
    '@media (max-width: 600px)': {
      fontSize: '0.7rem',
      gap: '4px',
    },
  },
  groundingContent: {
    marginTop: '8px',
    '@media (max-width: 600px)': {
      marginTop: '6px',
    },
  },
  searchQueriesSection: {
    marginBottom: '8px',
    '@media (max-width: 600px)': {
      marginBottom: '6px',
    },
  },
  searchQueriesTitle: {
    fontSize: '0.7rem',
    fontWeight: 500,
    color: '#a5b4fc',
    marginBottom: '4px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    '@media (max-width: 600px)': {
      fontSize: '0.65rem',
      gap: '3px',
    },
  },
  searchQueryChip: {
    fontSize: '0.65rem',
    height: '20px',
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    border: '1px solid rgba(139, 92, 246, 0.3)',
    color: '#c4b5fd',
    margin: '2px',
    '&:hover': {
      backgroundColor: 'rgba(139, 92, 246, 0.15)',
    },
    '@media (max-width: 600px)': {
      fontSize: '0.6rem',
      height: '18px',
    },
  },
  sourcesSection: {
    marginTop: '8px',
    '@media (max-width: 600px)': {
      marginTop: '6px',
    },
  },
  sourcesTitle: {
    fontSize: '0.7rem',
    fontWeight: 500,
    color: '#a5b4fc',
    marginBottom: '6px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    '@media (max-width: 600px)': {
      fontSize: '0.65rem',
      gap: '3px',
      marginBottom: '4px',
    },
  },
  sourceItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    padding: '6px 8px',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderRadius: '4px',
    marginBottom: '4px',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
    },
    '@media (max-width: 600px)': {
      padding: '4px 6px',
      gap: '1px',
    },
  },
  sourceTitle: {
    fontSize: '0.7rem',
    fontWeight: 500,
    color: '#e2e8f0',
    textDecoration: 'none',
    '&:hover': {
      color: '#818cf8',
      textDecoration: 'underline',
    },
    '@media (max-width: 600px)': {
      fontSize: '0.65rem',
    },
  },
  sourceDomain: {
    fontSize: '0.65rem',
    color: '#94a3b8',
    '@media (max-width: 600px)': {
      fontSize: '0.6rem',
    },
  },
  expandIcon: {
    color: '#818cf8',
    fontSize: '18px !important',
    '@media (max-width: 600px)': {
      fontSize: '16px !important',
    },
  },
  divider: {
    margin: '6px 0',
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
    '@media (max-width: 600px)': {
      margin: '4px 0',
    },
  },
});

const GroundingInfo = ({ groundingInfo }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  if (!groundingInfo || !groundingInfo.grounding_used) {
    return null;
  }

  const { search_queries = [], sources = [] } = groundingInfo;

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <Box className={classes.groundingContainer}>
      <Box className={classes.groundingHeader} onClick={handleToggle}>
        <Box className={classes.groundingTitle}>
          <SearchIcon sx={{ fontSize: '14px' }} />
          <Typography variant="caption">
            Enhanced with web search
          </Typography>
        </Box>
        <IconButton size="small" sx={{ padding: '2px' }}>
          {expanded ? (
            <ExpandLess className={classes.expandIcon} />
          ) : (
            <ExpandMore className={classes.expandIcon} />
          )}
        </IconButton>
      </Box>

      <Collapse in={expanded} timeout={200}>
        <Box className={classes.groundingContent}>
          {search_queries.length > 0 && (
            <Box className={classes.searchQueriesSection}>
              <Typography className={classes.searchQueriesTitle}>
                <SearchIcon sx={{ fontSize: '12px' }} />
                Search Queries:
              </Typography>
              <Box>
                {search_queries.map((query, index) => (
                  <Chip
                    key={index}
                    label={query}
                    size="small"
                    className={classes.searchQueryChip}
                  />
                ))}
              </Box>
            </Box>
          )}

          {search_queries.length > 0 && sources.length > 0 && (
            <Divider className={classes.divider} />
          )}

          {sources.length > 0 && (
            <Box className={classes.sourcesSection}>
              <Typography className={classes.sourcesTitle}>
                <LinkIcon sx={{ fontSize: '12px' }} />
                Sources ({sources.length}):
              </Typography>
              {sources.map((source, index) => (
                <Box key={index} className={classes.sourceItem}>
                  <Link
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={classes.sourceTitle}
                  >
                    {source.title || 'Untitled'}
                  </Link>
                  <Typography className={classes.sourceDomain}>
                    {source.domain || new URL(source.url).hostname}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Collapse>
    </Box>
  );
};

export default GroundingInfo;
