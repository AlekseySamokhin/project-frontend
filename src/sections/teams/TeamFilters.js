import { Button, Stack, ToggleButton } from '@mui/material';
import { useEffect, useState } from 'react';
import { sortBy } from 'lodash/collection';
import PropTypes from 'prop-types';
import { Search } from '../index';
import SvgIconStyle from '../../components/SvgIconStyle';
import CustomIcon from '../../components/CustomIcon';
import TeamModalInviteUser from './TeamModalInviteUser';
import TeamListPopoverSortBy from './TeamListPopoverSortBy';
import { switchDate } from './TeamListMemberCards';

// ----------------------------------------------------------------------

TeamFilters.propTypes = {
  team: PropTypes.object,
  empty: PropTypes.bool,
  members: PropTypes.array,
  handleFilterMembers: PropTypes.func,
};

// ----------------------------------------------------------------------

export default function TeamFilters({ team, empty, members, handleFilterMembers }) {

  const [popoverSortBy, setPopoverSortBy] = useState({ open: false, anchorEl: null });

  const [openModalInviteUser, setOpenModalInviteUser] = useState(false);

  const [filterValues, setFilterValues] = useState({
    search: '',
    sort: 'status',
  });

  useEffect(() => {
    handleFilterMembers(filter(members, filterValues));
  }, [filterValues]);

  const isWrite = !team?.permissions?.write;

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1.5} mb={1.25}>
      <Search
        value={filterValues.search}
        handleValue={(newValue) => setFilterValues((prevState) => ({ ...prevState, search: newValue }))}
        disabled={empty}
      />

      <ToggleButton
        value={false}
        disabled={empty}
        onClick={(event) => setPopoverSortBy({ open: true, anchorEl: event.currentTarget })}
        sx={{
          bgcolor: 'background.paper',
          minHeight: 42,
          minWidth: 94,
          textTransform: 'none',
          whiteSpace: 'nowrap',
          border: 0,
          '&:hover': {
            border: 0,
          },
        }}
      >
        <Stack mr={1}>
          <SvgIconStyle src={'/assets/icons/main/ic_filters.svg'} sx={{ width: 20, height: 20 }} />
        </Stack>
        Sort by
      </ToggleButton>

      <TeamListPopoverSortBy
        value={filterValues.sort}
        handleValue={(newValue) => setFilterValues((prevState) => ({ ...prevState, sort: newValue }))}
        open={popoverSortBy.open}
        onClose={() => setPopoverSortBy({ open: false, anchorEl: null })}
        anchorEl={popoverSortBy.anchorEl}
      />

      <Button
        variant="contained"
        disabled={isWrite || empty}
        sx={{
          whiteSpace: 'nowrap',
          py: 1,
          px: '20px',
          height: 42,
          minWidth: 119,
          textTransform: 'none',
        }}
        onClick={() => setOpenModalInviteUser(true)}
        startIcon={<CustomIcon src={'/assets/icons/main/ic_plus.svg'} width={13} height={13} />}
      >
        Invite user
      </Button>

      <TeamModalInviteUser team={team} open={openModalInviteUser} onClose={() => setOpenModalInviteUser(false)} />
    </Stack>
  );
}

function filter(members, filterValues) {
  const { search, sort } = filterValues;

  let newMembers = members;

  switch (sort) {
    case 'status':
      newMembers = sortBy(members, ['invite_status']);
      break;
    case 'date':
      newMembers = sortBy(members, [(member) => switchDate(member, member?.invite_status)]);
      break;
    case 'position':
      newMembers = sortBy(members, ['position']);
      break;
    default:
      break;
  }

  newMembers = newMembers.filter((member) => {
    const result = {
      username: false,
      display_name: false,
      position: false,
    };

    if (member.username) {
      result.username = member.username.toLowerCase().search(search.toLowerCase()) !== -1;
    }

    if (member.display_name) {
      result.display_name = member.display_name.toLowerCase().search(search.toLowerCase()) !== -1;
    }

    if (member.position) {
      result.position = member.position.toLowerCase().search(search.toLowerCase()) !== -1;
    }

    return result.username || result.display_name || result.position;
  });

  return newMembers;
}
