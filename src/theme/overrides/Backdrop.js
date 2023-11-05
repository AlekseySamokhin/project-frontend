
// ----------------------------------------------------------------------

export default function Backdrop() {

  return {
    MuiBackdrop: {
      styleOverrides: {
        root: {
          '&.MuiBackdrop-invisible': {
            background: 'transparent',
          },
        },
      },
    },
  };
}
