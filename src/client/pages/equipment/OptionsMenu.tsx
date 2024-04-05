import { ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import { ReactElement } from 'react';
import IconType from '../../../common/models/Icon';

export type Options = {
  Icon?: IconType;
  label: string | ReactElement;
  action?: () => void;
}[];

type Props = {
  options: Options;
  anchorEl: null | HTMLElement;
  onClose: () => void;
};
function OptionsMenu(props: Props) {
  const { options, anchorEl, onClose } = props;

  return (
    <Menu
      id="options-menu"
      anchorEl={anchorEl}
      open
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
    >
      {options.map(({ label, action, Icon }, index) => (
        <MenuItem
          key={index}
          onClick={() => {
            action?.();
          }}
        >
          {Icon && (
            <ListItemIcon>
              <Icon fontSize="small" />
            </ListItemIcon>
          )}
          <ListItemText>{label}</ListItemText>
        </MenuItem>
      ))}
    </Menu>
  );
}

export default OptionsMenu;
