import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Member from '../../models/Member';
import MemberCard from './MemberCard';
import AddMeasures from './AddMeasure';

function MemberCardsVisualization(props: { members: Member[] }) {
  const { members } = props;
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [openMeasuresDialog, setOpenMeasuresDialog] = useState(false);
  const onAddMeasuresClick = (memberClicked: Member) => {
    setSelectedMember(memberClicked);
    setOpenMeasuresDialog(true);
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
              onAddMeasuresClick={onAddMeasuresClick}
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
