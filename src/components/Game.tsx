import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery';
import GameField from './GameField';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Game = () => {
  const matches = useMediaQuery('(max-width:768px)');

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        sx={{
          display: 'flex',
          gap: matches ? '20px' : 0,
          background: 'linear-gradient(90deg, #092d42,#005672,#2683b1)',
        }}
      >
        <Grid
          item
          xs={matches ? 12 : 3}
          sx={{
            height: matches ? '100px' : '100vh',
          }}
        >
          <Item sx={{
            height: 'inherit',
            background: 'linear-gradient(90deg, #092d42,#005672,#2683b1)',
          }}
          >
            gg
          </Item>
        </Grid>
        <Grid
          item
          xs={matches ? 12 : 9}
          sx={{
            height: '100vh',
            display: 'flex',
            alignItems: matches ? 'flex-start' : 'center',
            justifyContent: 'center',
          }}
        >
          <Item sx={{ background: 'linear-gradient(90deg, #092d42,#005672,#2683b1)' }}>
            <GameField />
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Game;
