import { useState } from 'react';
import { Box, Typography, Skeleton } from '@mui/material';
import { useQuery } from '@apollo/client';
import BsCard from '../../components/BsCard';
import Member from '../../models/Member';
import { GET_ACTIVE_MEMBERS_PREV } from '../../queries/getActiveMembers';
import Pagination from '../../models/Pagination';

function MembersPreview() {
  const [offset, setOffset] = useState<number>(0);
  const [localData, setData] = useState<Member[]>([]);

  const { loading } = useQuery<
    {
      getAllMembers: {
        members: Member[];
        pagination: Pagination;
      };
    },
    { offset: number; limit: number }
  >(GET_ACTIVE_MEMBERS_PREV, {
    variables: {
      offset,
      limit: 10,
    },
    onCompleted(data) {
      setData([...localData, ...data.getAllMembers.members]);
    },
  });

  return (
    <Box sx={{ padding: '24px 0' }}>
      <Typography variant="h6">Miembros Activos</Typography>
      <BsCard>
        {loading && <Skeleton variant="rounded" width="100%" height="100px" />}
      </BsCard>
    </Box>
  );
}

export default MembersPreview;
