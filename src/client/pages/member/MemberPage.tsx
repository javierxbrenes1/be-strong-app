import { useParams } from 'react-router';
import PageContainer from '../../components/PageContainer';

function MemberPage() {
  const { code } = useParams();

  return (
    <PageContainer text="her">
      <div>usuario ${code}</div>
    </PageContainer>
  );
}

export default MemberPage;
