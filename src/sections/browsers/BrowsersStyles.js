import { styled } from '@mui/material/styles';
import { IconButton } from '@mui/material';

export const TableBottomIconButtom = styled(IconButton)(({ theme }) => ({
  width: 40,
  height: 40,
  '&.MuiIconButton-colorPrimary': {
    color: theme.palette.button.bottom,
  },
  '&.Mui-disabled': {
    color: theme.palette.text.disabled,
  },
}));
