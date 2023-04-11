import { Box, Typography } from '@mui/material';

function MemberInfoInput(props: {
  label: string;
  value?: string;
  editMode: boolean;
  inputType?: 'textbox' | 'date' | 'select';
  selectOptions?: { value: string; label: string }[];
}) {
  const { label, value, editMode } = props;
  return (
    <Box>
      <Typography color="primary" variant="subtitle1">
        {label}
      </Typography>
      {!editMode && (
        <Typography color="#757a79" variant="subtitle2">
          {value || 'No Definido'}
        </Typography>
      )}
    </Box>
  );
}

export default MemberInfoInput;
