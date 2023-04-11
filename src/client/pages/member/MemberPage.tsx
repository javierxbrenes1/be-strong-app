import { useQuery } from '@apollo/client';
import { useParams } from 'react-router';
import Loading from '../../components/Loading';
import PageContainer from '../../components/PageContainer';
import Member from '../../models/Member';
import { GET_MEMBER_DETAILS } from '../../queries/memberPage';
import { createAvatarLink } from '../utils/helpers';
import MemberInfo from './MemberInfo';
import MemberMeasures from './MemberMeasures';

function MemberPage() {
  const { code } = useParams();
  const { loading, data } = useQuery<{ getMember: Member }>(
    GET_MEMBER_DETAILS,
    {
      fetchPolicy: 'no-cache',
      variables: {
        code,
        take: 4,
      },
      onError(error) {
        console.error(error);
      },
    }
  );

  if (loading) {
    return <Loading />;
  }

  const { getMember: member } = data || {};

  if (!member) return null;

  console.log(member.memberMeasures);

  return (
    <PageContainer
      text={member?.name || ''}
      Icon={member?.avatar || createAvatarLink(member?.name || '')}
    >
      <MemberInfo member={member} />
      <MemberMeasures memberMeasures={member.memberMeasures || []} />
    </PageContainer>
  );
}

export default MemberPage;
