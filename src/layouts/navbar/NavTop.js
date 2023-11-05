import { Box, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import Logo from '../../components/Logo';
import SvgIconStyle from '../../components/SvgIconStyle';


NavTop.propTypes = {
  isCollapse: PropTypes.bool,
};

// ----------------------------------------------------------------------

export default function NavTop({ isCollapse }) {
  return (
    <Stack
      sx={{
        px: 2,
        pt: isCollapse ? '13px' : '19px',
        pb: 1.25,
        flexShrink: 0,
        ...(isCollapse && { alignItems: 'center' }),
      }}
    >
      <Stack direction='row' alignItems='center' justifyContent='space-between'>
        <Stack
          direction={isCollapse ? 'column' : 'row'}
          alignItems='center'
          justifyContent='space-between'
          minWidth='100%'
        >
          <Logo collapsed={isCollapse && true} />

          <Stack direction='row' mt={isCollapse ? 1.25 : 0}>
            <SvgIconStyle
              src='/assets/icons/main/ic_notification.svg'
              sx={{ width: 16, height: 18, mr: isCollapse ? 0.5 : 1 }}
            />

            <Box
              bgcolor='primary.main'
              width={19}
              height={19}
              borderRadius={50}
              justifyContent='center'
              alignItems='center'
              display='flex'
            >
              <Typography fontSize={13} color='grey.0' fontWeight='bold'>
                1
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
