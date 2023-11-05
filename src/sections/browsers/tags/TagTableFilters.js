import { Box, Button, Stack } from '@mui/material';
import { useState } from 'react';
import Iconify from '../../../components/Iconify';
import { Search } from '..';
import { TagModalNew } from './index';
import Scrollbar from '../../../components/Scrollbar';


export default function TagTableFilters() {
  // const dispatch = useDispatch();

  // const filterValues = useSelector((state) => state.browsers.proxy.filtersValues);

  const [openModalNewTag, setOpenModalNewTag] = useState(false);

  const handleFilter = () => {
    // dispatch(statusesRequested({ folderId, filters: { ...filterValues, ...object } }));
  };

  return (
    <Stack direction='row' justifyContent='center' alignItems='center' spacing={1.5} mb={2}>
      <Search value='' handleValue={handleFilter} />

      <Box sx={{ minHeight: 42, minWidth: 114 }}>
        <Scrollbar>
          <Button
            variant='contained'
            sx={{ height: 42, whiteSpace: 'nowrap', py: 1 }}
            startIcon={<Iconify icon={'eva:plus-fill'} />}
            onClick={() => setOpenModalNewTag(true)}
          >
            New tag
          </Button>
        </Scrollbar>
      </Box>

      <TagModalNew openNewTag={openModalNewTag} onCloseModal={() => setOpenModalNewTag(false)} />
    </Stack>
  );
}
