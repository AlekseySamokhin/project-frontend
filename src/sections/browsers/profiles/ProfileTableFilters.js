import PropTypes from 'prop-types';
import { Box, Button, ButtonGroup, Collapse, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import SvgIconStyle from '../../../components/SvgIconStyle';
import CustomIcon from '../../../components/CustomIcon';
import { profileRequested } from '../../../redux/slices/browsers';
import { useDispatch, useSelector } from '../../../redux/store';
import ProfilePopoverQuickCreate from './ProfilePopoverQuickCreate';
import { Search } from '..';
import CustomSelectSimple from '../../../components/CustomSelectSimple';
import FilterWithLabel from '../FilterWithLabel';
import map from 'lodash/map';
import MenuItem from '@mui/material/MenuItem';
import Label from '../../../components/Label';
import { ProfileModalNew } from './index';
import Scrollbar from '../../../components/Scrollbar';

// ----------------------------------------------------------------------

ProfileTableFilters.propTypes = {
  setOpen: PropTypes.func,
  open: PropTypes.bool,
};

// ----------------------------------------------------------------------

export default function ProfileTableFilters({ open, setOpen }) {
  const dispatch = useDispatch();

  const params = useParams();

  const folderId = params.id;

  const [openModalNewProfile, setOpenModalNewProfile] = useState(false);

  const [openQuickCreate, setOpenQuickCreate] = useState({ open: false, anchorEl: null });

  const filterValues = useSelector((state) => state.browsers.profile.params);

  const filterData = useSelector((state) => state.browsers.profile.filtersData);

  const tags = useSelector((state) => state.browsers.tagsSimple.collection);

  const [filterDataTags, setFilterDataTags] = useState([]);

  const statuses = useSelector((state) => state.browsers.statusesSimple.collection);

  const [filterDataStatuses, setFilterDataStatuses] = useState([]);

  const handleFilter = (newValue) => {
    dispatch(profileRequested({ folderId, filters: { ...filterValues, ...newValue } }));
  };

  const resetAllFilter = () => {
    handleFilter({
      name: '',
      profile_user: '',
      tag: '',
      status: '',
      main_website: '',
      proxy: '',
    });
  };

  useEffect(() => {
    const arrayNewTags = [];

    filterData.tags?.forEach(tagId => {
      const tag = tags.find(tag => tag.id === tagId);

      if (tag) {
        arrayNewTags.push(tag);
      }
    });

    setFilterDataTags(arrayNewTags);
  }, [filterData, tags])

  useEffect(() => {
    const arrayNewStatuses = [];

    filterData.status?.forEach(statusId => {
      const status = statuses.find(status => status.id === statusId);

      if (status) {
        arrayNewStatuses.push(status);
      }
    });

    setFilterDataStatuses(arrayNewStatuses);
  }, [filterData, statuses])

  return (
    <Stack>
      <Stack direction='row' justifyContent='center' alignItems='center' spacing={1.5} mb={2}>
        <Search
          value={filterValues.name}
          handleValue={(newValue) => handleFilter(Object.fromEntries([['name', newValue]]))}
        />

        <Button
          variant='standard'
          onClick={() => dispatch(profileRequested({ folderId }))}
          startIcon={<SvgIconStyle src={'/assets/icons/main/ic_refresh.svg'} sx={{ width: 20, height: 20 }} />}
          sx={{
            bgcolor: 'background.paper',
            color: 'grey.600',
            px: 4,
            py: '10px',
            border: 0,
            '&:hover': {
              border: 0,
            },
          }}
        >
          <Typography variant="subtitle2">Refresh</Typography>
        </Button>

        <Button
          variant='default'
          startIcon={<SvgIconStyle src={'/assets/icons/main/ic_filters.svg'} sx={{ width: 20, height: 20 }} />}
          onClick={() => setOpen((prevState) => !prevState)}
          sx={{ height: 42, minWidth: 87, color: 'primary.main', backgroundColor: 'rgba(51, 225, 100, 0.1)' }}
        >
          Filters
        </Button>

        <Box sx={{ minHeight: 42, minWidth: 210 }}>
          <Scrollbar>
            <ButtonGroup variant='contained' sx={{ height: 42 }}>

              <Button
                variant='contained'
                sx={{ whiteSpace: 'nowrap', py: 1, px: '20px', textTransform: 'none' }}
                onClick={() => setOpenModalNewProfile(true)}
                startIcon={<CustomIcon src={'/assets/icons/main/ic_plus.svg'} width={13} height={13} />}
              >
                Create profile
              </Button>

              <Button
                variant='contained'
                sx={{ whiteSpace: 'nowrap', p: '11px 16px' }}
                onClick={(event) => setOpenQuickCreate({ open: true, anchorEl: event.currentTarget })}
              >
                <CustomIcon src={'/assets/icons/main/ic_down.svg'} width={9} height={9.39} />
              </Button>
            </ButtonGroup>
          </Scrollbar>
        </Box>

        <ProfileModalNew
          open={openModalNewProfile}
          closeModal={() => setOpenModalNewProfile(false)}
        />


        <ProfilePopoverQuickCreate
          open={openQuickCreate.open}
          anchorEl={openQuickCreate.anchorEl}
          onClose={() => setOpenQuickCreate({ open: false, anchorEl: null })}
        />
      </Stack>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <Stack direction='row' justifyContent='space-between' alignItems='center' spacing={1} mb='10px'>

          <CustomSelectSimple
            label='Users'
            name='profile_user'
            value={filterValues.profile_user}
            selectData={filterData.profile_user}
            bgcolor='background.neutral'
            handleFilter={handleFilter}
          />

          <FilterWithLabel
            label='Tags'
            name='tag'
            value={filterValues.tag}
            bgcolor='background.neutral'
            handleFilter={handleFilter}
            options={map(filterDataTags, (tag) =>
              <MenuItem key={tag.id} value={tag.id}>
                <Label
                  variant='outlined'
                  color='primary'
                  sx={{ textTransform: 'capitalize' }}
                >
                  {tag.tag_name}
                </Label>
              </MenuItem>)
            }
          />

          <FilterWithLabel
            label='Statuses'
            name='status'
            value={filterValues.status}
            bgcolor='background.neutral'
            handleFilter={handleFilter}
            options={map(filterDataStatuses, (status) =>
              <MenuItem key={status.id} value={status.id}>
                <Label
                  variant='outlined'
                  color={status.status_color}
                  sx={{ textTransform: 'capitalize' }}
                >
                  {status.status}
                </Label>
              </MenuItem>)
            }
          />

          <CustomSelectSimple
            label='Main websites'
            name='main_website'
            value={filterValues.main_website}
            selectData={filterData.main_website}
            bgcolor='background.neutral'
            handleFilter={handleFilter}
            sx={{ minWidth: '18%' }}
          />

          <CustomSelectSimple
            label='Proxy'
            name='proxy'
            value={filterValues.proxy}
            selectData={filterData.proxy}
            bgcolor='background.neutral'
            handleFilter={handleFilter}
            sx={{ minWidth: '18%' }}
          />

          <Button
            variant="outlined"
            onClick={resetAllFilter}
            startIcon={<SvgIconStyle src={'/assets/icons/main/ic_refresh.svg'} sx={{ width: 20, height: 20 }} />}
            sx={{
              minWidth: 84,
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
