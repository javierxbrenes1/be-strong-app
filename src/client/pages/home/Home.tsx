import React from 'react';
import Grid from '@mui/material/Grid';
import { Typography, styled } from '@mui/material';
import MembersPreview from './MembersPreview';
import ClassesPreview from './ClassesPreview';

const Container = styled(Grid)({
  padding: '32px',
});

function HomePage() {
  return (
    <Container container flexDirection="column">
      <Typography variant="h3">Your name here</Typography>
      <Grid container flexDirection="column">
        <MembersPreview />
        <ClassesPreview />
      </Grid>
    </Container>
  );
}

export default HomePage;
