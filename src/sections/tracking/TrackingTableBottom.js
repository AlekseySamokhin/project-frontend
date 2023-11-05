import { Button, Stack } from '@mui/material';
import PropTypes from 'prop-types';
// import { useState } from 'react';
// import { useDispatch } from '../../redux/store';
// import { TableBottomIconButtom } from '../browsers/BrowsersStyles';
// import SvgIconStyle from '../../components/SvgIconStyle';
// import Label from '../../components/Label';

// ----------------------------------------------------------------------

TrackingTableBottom.propTypes = {
  selected: PropTypes.array,
  // setSelected: PropTypes.func,
};

// ----------------------------------------------------------------------

export default function TrackingTableBottom({ selected }) {
  const isNotSelectedRows = selected.length === 0;

  return (
    <Stack direction='row' spacing={1}>
      <Button disabled={isNotSelectedRows} variant='outlined' color='inherit'>
        Cancel tracking
      </Button>
      <Button disabled={isNotSelectedRows} variant='outlined' color='inherit'>
        Unfollow
      </Button>

      {/* {!isNotSelectedRows && ( */}
      {/*  <Stack */}
      {/*    direction="row" */}
      {/*    justifyContent="center" */}
      {/*    alignItems="center" */}
      {/*    sx={{ width: 40, height: 40 }} */}
      {/*  > */}
      {/*    <Label */}
      {/*      color="primary" */}
      {/*    > */}
      {/*      {selected.length} */}
      {/*    </Label> */}
      {/*  </Stack> */}
      {/* )} */}
    </Stack>
  );
}
