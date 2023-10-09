import { SxProps, Theme, styled } from '@mui/material/styles';

const Avatar = styled('img')(() => ({
  width: '64px',
  height: '64px',
  borderRadius: '100%',
}));

function BsAvatar(props: { src: string; alt?: string; sx?: SxProps<Theme> }) {
  const { src, alt = 'avatar', sx } = props;

  return <Avatar src={src} alt={alt} sx={sx} />;
}

export default BsAvatar;
