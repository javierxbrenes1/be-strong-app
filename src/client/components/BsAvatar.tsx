import { styled } from '@mui/material/styles';

const Avatar = styled('img')({
  width: '64px',
  height: '64px',
  borderRadius: '100%',
});

function BsAvatar(props: { src: string; alt?: string }) {
  const { src, alt = 'avatar' } = props;

  return <Avatar src={src} alt={alt} />;
}

export default BsAvatar;
