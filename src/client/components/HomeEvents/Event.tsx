import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { ReactNode } from 'react';

const EventContainer = styled(Box)({
  padding: '12px 0',
});

const EventDescription = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  color: '#f96d00',
  fontWeight: 'bolder',
});

const EventContent = styled(Box)({
  margin: '16px 0',
});

function Event(props: {
  emoji: string;
  title: string;
  children: ReactNode | ReactNode[];
}) {
  const { emoji, title, children } = props;
  return (
    <EventContainer>
      <EventDescription>
        <Typography fontSize="32px">{emoji}</Typography>
        <Typography variant="h5">{title}</Typography>
      </EventDescription>
      <EventContent>{children}</EventContent>
    </EventContainer>
  );
}

export default Event;
