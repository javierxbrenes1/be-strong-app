import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

const CustomDivider = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  height: '1px',
  backgroundColor: theme.palette.divider,
}));

function BsExpandButton(props: {
  onButtonClick: () => void;
  showLessIcon?: boolean;
}) {
  const { onButtonClick, showLessIcon = false } = props;
  return (
    <Stack direction="row" alignItems="center">
      <CustomDivider />
      <IconButton onClick={onButtonClick}>
        {showLessIcon ? <RemoveCircleOutlineIcon /> : <AddCircleOutlineIcon />}
      </IconButton>
      <CustomDivider />
    </Stack>
  );
}

export default BsExpandButton;
