import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Box,
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
  background: theme.palette.grey[100],
  borderRadius: '10px',
  padding: '10px',
  '& ul': {
    margin: '0 1rem',
  },
}));

function Class(props: { gymClass: GymClass }) {
  const { gymClass } = props;

  return (
    <Accordion defaultExpanded sx={{ margin: '10px 0' }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`panel-${gymClass.id}-content`}
        id={`panel-${gymClass.id}-header`}
      >
        <Typography
          variant="h5"
          color="primary"
          sx={{
            fontWeight: "600",
            textTransform: 'capitalize'
          }}>
          {gymClass.classType}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box>
          {gymClass.classDurationInMinutes && (
            <Box>
              <Typography component="span" sx={{
                fontWeight: "700"
              }}>
                Tiempo de clase:
              </Typography>
              <Typography component="span" sx={{ paddingLeft: '10px' }}>
                {gymClass.classDurationInMinutes} Minutos
              </Typography>
            </Box>
          )}
          {gymClass.classDescription && (
            <Box>
              <Typography sx={{
                fontWeight: "700"
              }}>Descripción:</Typography>
              <MarkDown remarkPlugins={[remarkGfm]}>
                {gymClass.classDescription}
              </MarkDown>
            </Box>
          )}
        </Box>
        <ClassSchedules
          classId={gymClass.id}
          schedules={gymClass.gymClassOnTimes?.map((g) => g.gymClassTime) ?? []}
          attendanceList={gymClass.attendanceList}
        />
      </AccordionDetails>
    </Accordion>
  );
}

export default Class;
