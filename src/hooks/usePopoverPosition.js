import { useTheme } from '@mui/material/styles';

export default function usePopoverPosition(event, height, orientation, width = 0) {

  const theme = useTheme();

  const rangeBottom = window.innerHeight - event?.target?.getBoundingClientRect().bottom - 16;

  const rangeRight = window.innerWidth - event?.target?.getBoundingClientRect().right - 16;

  const widthElement = event?.target?.getBoundingClientRect().width / 2;

  const heightElement = event?.target?.getBoundingClientRect().height / 2;

  const beforeWidth = 16;
  const beforeHeight = 16;

  if(orientation === 'left') {
    return {
      anchorOrVer: 'top',
      transformOrVer: 'bottom',
      anchorOrHor: 'center',
      transformOrHor: 'center',
      sx: {
        ml: 0,
        mt: -2,
        overflowX: 'unset',
        overflowY: 'unset',
        '&::before': {
          content: '""',
          borderRadius: '0 0 3px 0',
          position: 'absolute',
          top: 'calc(100% - 8px)',
          left: '14px',
          width: beforeWidth,
          height: beforeHeight,
          backgroundColor: 'background.paper',
          transform: ' rotate(45deg)',
          boxShadow: theme.customShadows.before.bottom,
        },
      },
    };
  }

  if (orientation === 'vertical') {
    if (rangeBottom > height) {
      return {
        anchorOrVer: 'bottom',
        transformOrVer: 'top',
        anchorOrHor: 'center',
        transformOrHor: 'center',
        sx: {
          ml: 0,
          mt: 2,
          overflowX: 'unset',
          overflowY: 'unset',
          '&::before': {
            content: '""',
            borderRadius: '3px 0 0 0',
            position: 'absolute',
            bottom: 'calc(100% - 8px)',
            left: 'calc(50% - 8px)',
            width: beforeWidth,
            height: beforeHeight,
            backgroundColor: 'background.paper',
            transform: ' rotate(45deg)',
            boxShadow: theme.customShadows.before.top,
          },
        },
      };
    }
    return {
      anchorOrVer: 'top',
      transformOrVer: 'bottom',
      anchorOrHor: 'center',
      transformOrHor: 'center',
      sx: {
        ml: 0,
        mt: -2,
        overflowX: 'unset',
        overflowY: 'unset',
        '&::before': {
          content: '""',
          borderRadius: '0 0 3px 0',
          position: 'absolute',
          top: 'calc(100% - 8px)',
          left: 'calc(50% - 8px)',
          width: beforeWidth,
          height: beforeHeight,
          backgroundColor: 'background.paper',
          transform: ' rotate(45deg)',
          boxShadow: theme.customShadows.before.bottom,
        },
      },
    };
  }
  if (orientation === 'horizontal') {
    if (rangeBottom > height) {
      return {
        anchorOrVer: 'top',
        transformOrVer: 'top',
        anchorOrHor: 'left',
        transformOrHor: 'right',
        sx: {
          ml: -2,
          mt: '-30px',
          overflowX: 'unset',
          overflowY: 'unset',
          '&::before': {
            content: '""',
            borderRadius: '0 3px 0 0',
            position: 'absolute',
            top: 28 + heightElement / 2,
            left: 'calc(100% - 8px)',
            width: beforeWidth,
            height: beforeHeight,
            backgroundColor: 'background.paper',
            transform: ' rotate(45deg)',
            boxShadow: theme.customShadows.before.right,
          },
        },
      };
    }
    if (width / 2 > rangeRight) {
      return {
        anchorOrVer: 'top',
        transformOrVer: 'bottom',
        anchorOrHor: 'right',
        transformOrHor: 'right',
        sx: {
          ml: 0,
          mt: -2,
          overflowX: 'unset',
          overflowY: 'unset',
          '&::before': {
            content: '""',
            borderRadius: '0 0 3px 0',
            position: 'absolute',
            top: 'calc(100% - 8px)',
            right: widthElement - 8,
            width: beforeWidth,
            height: beforeHeight,
            backgroundColor: 'background.paper',
            transform: ' rotate(45deg)',
            boxShadow: theme.customShadows.before.bottom,
          },
        },
      };
    }
    return {
      anchorOrVer: 'top',
      transformOrVer: 'bottom',
      anchorOrHor: 'center',
      transformOrHor: 'center',
      sx: {
        ml: 0,
        mt: -2,
        overflowX: 'unset',
        overflowY: 'unset',
        '&::before': {
          content: '""',
          borderRadius: '0 0 3px 0',
          position: 'absolute',
          top: 'calc(100% - 8px)',
          left: 'calc(50% - 8px)',
          width: beforeWidth,
          height: beforeHeight,
          backgroundColor: 'background.paper',
          transform: ' rotate(45deg)',
          boxShadow: theme.customShadows.before.bottom,
        },
      },
    };
  }

  return null;
}
