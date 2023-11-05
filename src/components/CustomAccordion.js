import PropTypes from 'prop-types';
import { IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import styled from '@emotion/styled';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import SvgIconStyle from './SvgIconStyle';

// ----------------------------------------------------------------------

CustomAccordion.propTypes = {
  name: PropTypes.string,
  children: PropTypes.node,
  isFolder: PropTypes.bool,
  search: PropTypes.bool,
};

// ----------------------------------------------------------------------

const Accordion = styled((props) => <MuiAccordion disableGutters elevation={0} square {...props} />)({
  border: 0,
  boxShadow: 'none!important',
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
});
const AccordionSummary = styled((props) => <MuiAccordionSummary {...props} />)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: '6px',
  padding: 0,
  margin: 0,
  paddingLeft: 12,
  boxShadow: 'none',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
  '& .MuiAccordionDetails-root': {
    marginTop: '13px',
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)({
  marginTop: 15,
  marginLeft: 30,
  padding: 0,
});

export default function CustomAccordion({ name, children, isFolder = false, search = false }) {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={
          <SvgIconStyle
            src='/assets/icons/main/ic_drop_right.svg'
            sx={{
              width: 12,
              height: 12,
              ml: 0.5,
              bgcolor: 'grey.600',
            }}
          />
        }
      >
        <Stack direction='row' alignItems='center' spacing={1}>
          {isFolder ? (
            <SvgIconStyle
              src='/assets/icons/main/ic_folders.svg'
              sx={{
                width: 20,
                height: 16,
                ml: 0.5,
                bgcolor: 'grey.600',
              }}
            />
          ) : (
            <IconButton size='small' sx={{ ml: 0.5 }}>
              <SvgIconStyle src='/assets/icons/main/ic_plus.svg' sx={{ width: 14, height: 14 }} />
            </IconButton>
          )}
          <Typography variant='body2'>{name}</Typography>
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        {search && (
          <Stack spacing={2} mb={1}>
            <TextField
              name='search'
              fullWidth
              size='small'
              placeholder='Search for extension'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <SvgIconStyle src='/assets/icons/main/ic_search.svg' />
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
        )}

        {children}
      </AccordionDetails>
    </Accordion>
  );
}
