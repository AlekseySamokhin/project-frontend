export const popoverSetting =  {
  anchorOrVer: 'bottom',
  transformOrVer: 'top',
  anchorOrHor: 'center',
  transformOrHor: 'center',
  sx: (theme) => ({
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
      width: 16,
      height: 16,
      backgroundColor: 'background.paper',
      transform: ' rotate(45deg)',
      boxShadow: theme.customShadows.before.top,
    },
  }),
}