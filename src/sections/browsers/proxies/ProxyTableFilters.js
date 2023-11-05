import PropTypes from 'prop-types';
import { Box, Button, ButtonGroup, Collapse, Stack, Typography } from '@mui/material';
import Iconify from '../../../components/Iconify';
import SvgIconStyle from '../../../components/SvgIconStyle';
import { Search } from '..';
import { proxyRequested } from '../../../redux/slices/browsers';
import { useDispatch, useSelector } from '../../../redux/store';
import CustomIcon from '../../../components/CustomIcon';
import CustomSelectSimple from '../../../components/CustomSelectSimple';
import { ProxyModalList, ProxyModalNew } from './index';
import { useState } from 'react';
import Scrollbar from '../../../components/Scrollbar';

// ----------------------------------------------------------------------

ProxyTableFilters.propTypes = {
  folderId: PropTypes.string,
  setOpen: PropTypes.func,
  open: PropTypes.bool,
};

// ----------------------------------------------------------------------

export default function ProxyTableFilters({ folderId, open, setOpen }) {
  const dispatch = useDispatch();

  const [openModalNewProxy, setOpenModalNewProxy] = useState(false);

  const [openModalListProxy, setOpenModalListProxy] = useState(false);

  const filterValues = useSelector((state) => state.browsers.proxy.params);

  const filterData = useSelector((state) => state.browsers.proxy.filtersData);

  const handleFilter = (newValue) => {
    dispatch(proxyRequested({ folderId, filters: { ...filterValues, ...newValue } }));
  };

  const resetAllFilter = () => {
    handleFilter({
      name: '',
      proxy_type: '',
      status: '',
      country: '',
    });
  };


  return (
    <Stack>
      <Stack direction='row' justifyContent='center' alignItems='center' spacing={1.5} mb={2}>
        <Search
          value={filterValues.name}
          handleValue={(newValue) => handleFilter(Object.fromEntries([['name', newValue]]))}
        />

        <Button
          variant='outlined'
          startIcon={<SvgIconStyle src={'/assets/icons/main/ic_filters.svg'} sx={{ width: 20, height: 20 }} />}
          sx={{
            bgcolor: open ? '#00AB5525' : '#00AB5514',
            paddingX: '20px',
            paddingY: '9px',
            border: 0,
            '&:hover': {
              border: 0,
            },
          }}
          onClick={() => setOpen((prevState) => !prevState)}
        >
          Filters
        </Button>

        <Box sx={{ minHeight: 42, minWidth: 210 }}>
          <Scrollbar>
            <ButtonGroup variant='contained' sx={{ height: 42 }}>
              <Button
                sx={{ whiteSpace: 'nowrap', py: 1, px: '20px', minWidth: '157.60px!important' }}
                startIcon={<Iconify icon={'eva:plus-fill'} />}
                onClick={() => setOpenModalNewProxy(true)}
              >
                New proxy
              </Button>

              <Button onClick={() => setOpenModalListProxy(true)} sx={{ p: '11px 16px' }}>
                <CustomIcon src={'/assets/icons/main/ic_clipboard.svg'} width={15} height={17} />
              </Button>
            </ButtonGroup>
          </Scrollbar>
        </Box>

        <ProxyModalNew
          folderId={folderId}
          open={openModalNewProxy}
          close={() => setOpenModalNewProxy(false)}
        />

        <ProxyModalList
          open={openModalListProxy}
          close={() => setOpenModalListProxy(false)}
        />

      </Stack>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1} mb="10px">

          <CustomSelectSimple
            label="Type"
            name='proxy_type'
            value={filterValues?.proxy_type}
            selectData={filterData?.proxy_type}
            bgcolor="background.neutral"
            handleFilter={handleFilter}
          />

          <CustomSelectSimple
            label="Status"
            name='status'
            value={filterValues?.status}
            selectData={filterData?.status}
            bgcolor="background.neutral"
            handleFilter={handleFilter}
            size='small'
          />

          <CustomSelectSimple
            label="Location"
            name='country'
            value={filterValues?.country}
            selectData={filterData?.country}
            bgcolor="background.neutral"
            handleFilter={handleFilter}
            size='small'
          />

          <Button
            variant="outlined"
            onClick={resetAllFilter}
            startIcon={<SvgIconStyle src={'/assets/icons/main/ic_refresh.svg'} sx={{ width: 20, height: 20 }} />}
            sx={{
              width: 150,
              bgcolor: 'background.paper',
              color: 'grey.600',
              paddingX: '20px',
              paddingY: '8px',
              border: 0,
              '&:hover': {
                border: 0,
              },
            }}
          >
            <Typography variant="subtitle2">Clear</Typography>
          </Button>
        </Stack>
      </Collapse>
    </Stack>
  );
}
