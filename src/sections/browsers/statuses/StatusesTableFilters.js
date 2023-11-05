import { Box, Button, Stack } from '@mui/material';
import { useState } from 'react';
import Iconify from '../../../components/Iconify';
import { StatusesModalNew } from './index';
import { Search } from '..';
import Scrollbar from '../../../components/Scrollbar';

// ----------------------------------------------------------------------

export default function StatusesTableFilters() {
  // const dispatch = useDispatch();

  // const filterValues = useSelector((state) => state.browsers.proxy.filtersValues);

  const [openModalNewStatus, setOpenModalNewStatus] = useState(false);

  const handleFilter = () => {
    // dispatch(statusesRequested({ folderId, filters: { ...filterValues, ...object } }));
  };

  return (
    <Stack direction='row' justifyContent='center' alignItems='center' spacing={1.5} mb={2}>
      <Search handleValue={handleFilter} />

      <Box sx={{ minHeight: 42, minWidth: 134 }}>
        <Scrollbar>
          <Button
            variant='contained'
            sx={{ height: 42, whiteSpace: 'nowrap', py: 1 }}
            startIcon={<Iconify icon={'eva:plus-fill'} />}
            onClick={() => setOpenModalNewStatus(true)}
          >
            New status
          </Button>
        </Scrollbar>
      </Box>

      <StatusesModalNew openNewStatuses={openModalNewStatus} onCloseModal={() => setOpenModalNewStatus(false)} />
    </Stack>
  );
}
