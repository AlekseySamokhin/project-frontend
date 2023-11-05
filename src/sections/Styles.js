import { styled } from '@mui/material/styles';
import { Button, ListItemButton } from '@mui/material';

export const AdditionalNavbarButton = styled(Button)(({ theme }) => ({
  color: theme.palette.grey[600],
  borderColor: theme.palette.border.button,
  minWidth: 0,
  width: 36,
  height: 36,
  marginLeft: 8,
  padding: 0,
  '&:hover': {
    borderColor: theme.palette.grey[100],
  },
}));

export const AdditionalNavbarListItemButton = styled(ListItemButton)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.text.secondary,
  height: 48,
  marginBottom: theme.spacing(0.5),
  textTransform: 'capitalize',
  // '&.Mui-selected': {
  //   backgroundColor: color,
  //   '&.Mui-focusVisible, &:hover': {
  //     backgroundColor: color,
  //   },
  // },
  // '&.Mui-focusVisible, &:hover': {
  //   backgroundColor: color,
  // },
}));

