import { useState } from 'react';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router';
import Member from '../../models/Member';
import MemberCard from './MemberCard';
import AddMeasures from './AddMeasure';
import { PATHS } from '../../constants';

function MemberCardsVisualization(props: { members: Member[] }) {
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
    <>
      <Grid container columnSpacing="16px" rowSpacing="16px">
        {members.map((member) => (
          <Grid item md={3} width="100%" key={member.code}>
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
    </>
  );
}

export default MemberCardsVisualization;
