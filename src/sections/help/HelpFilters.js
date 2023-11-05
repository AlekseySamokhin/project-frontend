import { useState } from 'react';
import { Button, Grid, Stack } from '@mui/material';
import { HelpSearchDropDown } from ".";
import { Search } from '../index';
import SvgIconStyle from '../../components/SvgIconStyle';

// ----------------------------------------------------------------------

export default function HelpFilters() {

  const [search, setSearch] = useState('');

  const [popover, setPopover] = useState({open: false, anchorEl: null})

  return (
    <Grid container>
      <Grid item xs={12}>

        <Stack direction="row">

          <Search
            value={search}
            handleValue={(newValue) => setSearch(newValue)}
          />

          <Button
            onClick={(event) => setPopover({open: true, anchorEl: event.currentTarget})}
            variant="contained"
            startIcon={<SvgIconStyle src="/assets/icons/main/ic_more.svg" sx={{ width: 15, height: 15 }} />}
            sx={{ml: 1.5}}
          >
            Navigation
          </Button>

          <HelpSearchDropDown
            open={popover.open}
            anchorEl={popover.anchorEl}
            onClose={() => setPopover({open: false, anchorEl: null})}
          />

        </Stack>

      </Grid>
    </Grid>
  );
}
