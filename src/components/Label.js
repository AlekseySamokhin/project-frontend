import PropTypes from 'prop-types';
// @mui
import { alpha, styled } from '@mui/material/styles';

import { Box, Stack } from '@mui/material';

// ----------------------------------------------------------------------

const RootStyle = styled('span')(({ theme, ownerState }) => {
  const isLight = theme.palette.mode === 'light';
  const { color, variant, large } = ownerState;

  const styleFilled = (color) => ({
    color: theme.palette[color].contrastText,
    backgroundColor: theme.palette[color].main,
  });

  const styleOutlined = (color) => ({
    // if color is hex color, use it as is
    color: /^#/.test(color) ? color : theme.palette[color].main,
    backgroundColor: 'transparent',
    border: `1px solid ${/^#/.test(color) ? color : theme.palette[color].main}}`,
  });

  const styleGhost = (color) => ({
    color: theme.palette[color][isLight ? 'dark' : 'light'],
    backgroundColor: alpha(theme.palette[color].main, 0.16),
  });

  return {
    height: large ? 26 : 22,
    minWidth: large ? 72 : 22,
    lineHeight: 0,
    borderRadius: 6,
    cursor: 'default',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    display: 'inline-flex',
    justifyContent: 'center',
    padding: theme.spacing(0.125, 1),
    color: theme.palette.grey[800],
    fontSize: theme.typography.pxToRem(large ? 14 : 12),
    fontFamily: theme.typography.fontFamily,
    backgroundColor: theme.palette.grey[300],
    fontWeight: theme.typography.fontWeightBold,

    ...(color !== 'default'
      ? {
        ...(variant === 'filled' && { ...styleFilled(color) }),
        ...(variant === 'outlined' && { ...styleOutlined(color) }),
        ...(variant === 'ghost' && { ...styleGhost(color) }),
      }
      : {
        ...(variant === 'outlined' && {
          backgroundColor: 'transparent',
          color: theme.palette.text.primary,
          border: `1px solid ${theme.palette.grey[500_32]}`,
        }),
        ...(variant === 'ghost' && {
          color: isLight ? theme.palette.text.secondary : theme.palette.common.white,
          backgroundColor: theme.palette.grey[500_16],
        }),
      }),
  };
});

// ----------------------------------------------------------------------

Label.propTypes = {
  children: PropTypes.node,
  startIcon: PropTypes.node,
  endIcon: PropTypes.node,
  color: PropTypes.string,
  variant: PropTypes.oneOf(['filled', 'outlined', 'ghost']),
  large: PropTypes.bool,
  sx: PropTypes.object,
};

// ----------------------------------------------------------------------

export default function Label({
                                children,
                                color = 'default',
                                variant = 'ghost',
                                startIcon,
                                endIcon,
                                large = false,
                                sx,
                              }) {
  const style = {
    '& svg, img': { width: 1, height: 1, objectFit: 'cover' },
  };

  return (
    <RootStyle
      ownerState={{ color, variant, large }}
      sx={{
        ...(startIcon && { pl: 0.75 }),
        ...(endIcon && { pr: 0.75 }),
        ...sx,
      }}
    >
      {startIcon && (
        <Stack justifyContent="center" alignItems="center" sx={{ mr: '5px', ...style }}>
          {startIcon}
        </Stack>
      )}

      {children}

      {endIcon && <Box sx={{ ml: 0.75, ...style }}>{endIcon}</Box>}
    </RootStyle>
  );
}