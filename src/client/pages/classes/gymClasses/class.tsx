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
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import GymClass from '../../../../common/models/GymClass';
import ClassSchedules from './classSchedules';
import { INDEX_DAYS } from '../../../labels';

dayjs.extend(utc);

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

  const dayIndex = gymClass.classDate
    ? dayjs(gymClass.classDate.split('T')[0]).day()
    : 7;
  const classDay = INDEX_DAYS[dayIndex];

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
        <Box>
          {gymClass.classDurationInMinutes && (
            <Box>
              <Typography fontWeight="700" component="span">
                Tiempo de clase:
              </Typography>
              <Typography component="span" sx={{ paddingLeft: '10px' }}>
                {gymClass.classDurationInMinutes} Minutos
              </Typography>
            </Box>
          )}
          {gymClass.classDescription && (
            <Box>
              <Typography fontWeight="700">Descripción:</Typography>
              <MarkDown remarkPlugins={[remarkGfm]}>
                {gymClass.classDescription}
              </MarkDown>
            </Box>
          )}
        </Box>
        <ClassSchedules
          day={classDay}
          classId={gymClass.id}
          schedules={gymClass.gymClassOnTimes?.map((g) => g.gymClassTime) ?? []}
        />
      </AccordionDetails>
    </Accordion>
  );
}

export default Class;
