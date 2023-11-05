// ----------------------------------------------------------------------

export default function Table(theme) {
  return {
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            // backgroundColor: 'rgba(51, 102, 255, 0.08)',
            backgroundColor: `#00AB5514`,
            '&:hover': {
              backgroundColor: `#00AB5514`,
            },
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          border: 'none',
          '&:first-of-type': {
            borderTopLeftRadius: theme.shape.borderRadius,
            borderBottomLeftRadius: theme.shape.borderRadius,
          },
          '&:last-of-type': {
            borderTopRightRadius: theme.shape.borderRadius,
            borderBottomRightRadius: theme.shape.borderRadius,
          },
        },
        head: {
          color: theme.palette.text.secondary,
          backgroundColor: theme.palette.grey[500_8],
          padding: '14px 8px',
          '&:first-of-type': {
            paddingLeft: theme.spacing(1),
            borderTopLeftRadius: theme.shape.borderRadius,
            borderBottomLeftRadius: theme.shape.borderRadius,
          },
          '&:last-of-type': {
            paddingRight: theme.spacing(1),
            borderTopRightRadius: theme.shape.borderRadius,
            borderBottomRightRadius: theme.shape.borderRadius,
          },
        },
        stickyHeader: {
          backgroundColor: theme.palette.background.paper,
          backgroundImage: `linear-gradient(to bottom, ${theme.palette.background.neutral} 0%, ${theme.palette.background.neutral} 100%)`,
        },
        body: {
          padding: '2px 8px',
          '&:first-of-type': {
            paddingLeft: theme.spacing(1),
          },
          '&:last-of-type': {
            paddingRight: theme.spacing(1),
          },
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        root: {
          // borderTop: `solid 1px ${theme.palette.divider}`,
        },
        toolbar: {
          backgroundColor: theme.palette.background.light,
          height: 56,
        },
        select: {
          backgroundColor: theme.palette.background.light,
          '&:focus': {
            backgroundColor: theme.palette.background.light,
          },
        },
        selectIcon: {
          width: 20,
          height: 20,
          marginTop: -4,
        },
      },
    },
  };
}
