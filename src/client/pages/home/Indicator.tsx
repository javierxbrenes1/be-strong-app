import { Skeleton, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router';
import BsButton from '../../components/BsButton';
import IconType from '../../../common/models/Icon';

const Container = styled(Box)<{ gradientColors: string[] }>(
  ({ gradientColors }) => ({
    background: '#fff',
    borderRadius: '10px',
    padding: '20px',
    width: '200px',
    height: 'fit-content',
    maxWidth: '80%',

    backgroundImage: `linear-gradient(${gradientColors.join(',')})`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
  })
);

const IconContainer = styled(Box)<{ backgroundColor: string }>(
  ({ backgroundColor }) => ({
    borderRadius: '100%',
    border: `1px solid ${backgroundColor}`,
    backgroundColor,
    padding: '5px',
    '& svg': {
      fontSize: '60px',
    },
  })
);

function Indicator(props: {
  title: string;
  value?: number;
  loading?: boolean;
  Icon: IconType;
  iconBackgroundColor: string;
  gradientColors: string[];
  goToPath?: string;
  btnHoverColor?: string;
}) {
  const {
    title,
    value,
    loading,
    Icon,
    gradientColors,
    iconBackgroundColor,
    goToPath,
    btnHoverColor,
  } = props;

  const navigate = useNavigate();

  return (
    <Container gradientColors={gradientColors}>
      <IconContainer backgroundColor={iconBackgroundColor}>
        <Icon />
      </IconContainer>
      <Typography
        variant="h6"
        sx={{ fontWeight: 'bold', margin: '0', fontSize: '16px' }}
      >
        {title}
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{ fontSize: '32px', color: '#757a79', lineHeight: '1' }}
        textAlign="center"
      >
        {loading ? <Skeleton /> : value}
      </Typography>
      {goToPath && (
        <BsButton
          onClick={() => {
            navigate(goToPath, { replace: true });
          }}
          text="Ver Mas"
          hoverColor={btnHoverColor}
        />
      )}
    </Container>
  );
}

export default Indicator;
