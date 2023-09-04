import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Box,
  Stack,
  styled,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import GymClass from '../../../../common/models/GymClass';
import ClassSchedules from './classSchedules';

const MarkDown = styled(ReactMarkdown)(({ theme }) => ({
  fontFamily: theme.typography.fontFamily,
  whiteSpace: 'pre-wrap',
  padding: '5px',
  background: theme.palette.grey[100],
  borderRadius: '10px',
}));

function Class(props: { gymClass: GymClass }) {
  const { gymClass } = props;

  return (
    <Accordion defaultExpanded>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`panel-${gymClass.id}-content`}
        id={`panel-${gymClass.id}-header`}
      >
        <Typography
          variant="h5"
          sx={{ textTransform: 'capitalize' }}
          color="primary"
          fontWeight="600"
        >
          {gymClass.classType}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack flexDirection="row" gap="1rem">
          <Box>
            <Typography fontWeight="700">Tiempo de clase</Typography>
            <Typography>{gymClass.classDurationInMinutes} Minutos</Typography>
          </Box>
          {gymClass.classDescription && (
            <Box>
              <Typography fontWeight="700">Descripción</Typography>
              <MarkDown remarkPlugins={[remarkGfm]}>
                {gymClass.classDescription}
              </MarkDown>
            </Box>
          )}
        </Stack>
        <ClassSchedules
          classId={gymClass.id}
          schedules={gymClass.gymClassOnTimes?.map((g) => g.gymClassTime) ?? []}
        />
      </AccordionDetails>
    </Accordion>
  );
}

export default Class;
