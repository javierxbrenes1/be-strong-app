import { useState } from 'react';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router';
import Box from '@mui/material/Box/Box';
import Member from '../../../common/models/Member';
import MemberCard from './MemberCard';
import AddMeasures from './AddMeasure';
import { PATHS } from '../../../common/enums';

function MemberCardsVisualization(props: { members?: Member[] }) {
  const { members } = props;
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [openMeasuresDialog, setOpenMeasuresDialog] = useState(false);
  const navigate = useNavigate();

  const handleAddMeasuresClick = (memberClicked: Member) => {
    setSelectedMember(memberClicked);
    setOpenMeasuresDialog(true);
  };

  const handleViewClick = (code: string) => {
    navigate(`${PATHS.MEMBERS}/${code}`);
  };

  const handleClose = () => {
    setSelectedMember(null);
    setOpenMeasuresDialog(false);
  };

  return (
    <Box marginY="10px">
      <Grid container columnSpacing="16px" rowSpacing="16px">
        {members?.map((member) => (
          <Grid item sm={4} md={3} width="100%" key={member.code}>
            <MemberCard
              member={member}
              onAddMeasuresClick={handleAddMeasuresClick}
              onViewClick={handleViewClick}
            />
          </Grid>
        ))}
      </Grid>
      <AddMeasures
        open={openMeasuresDialog}
        onClose={handleClose}
        member={selectedMember}
      />
    </Box>
  );
}

export default MemberCardsVisualization;
