import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useSnackbar } from 'notistack';
import { Stack } from '@mui/material';
import { useDispatch } from '../../redux/store';
import Page from '../../components/Page';
import { BrowsersTable } from '../../sections/browsers';
import { ProfileTableBottom, ProfileTableFilters, ProfileTableRow } from '../../sections/browsers/profiles';
import {
  profileFilterDataRequested,
  profileRequested,
  statusesSimpleRequested,
  tagsSimpleRequested,
} from '../../redux/slices/browsers';
import useEffectWithoutFirstRender from '../../hooks/useEffectWithoutFirstRender';

// ----------------------------------------------------------------------

export default function ProfilesPage() {

  const dispatch = useDispatch();

  const params = useParams();

  const folderId = params.id;

  const { enqueueSnackbar } = useSnackbar();

  const folders = useSelector((state) => state.browsers.folder.collection);

  const {
    collection: profiles,
    loading: loadingProfiles,
    error: errorProfile,
    total: totalProfile,
  } = useSelector((state) => state.browsers.profile);

  // const tableHeads = useSelector((state) => state.browsers.profile.tableHeads);

  const tableHeads = [
    { id: 'name', label: 'Name' },
    { id: 'notes', label: 'Notes' },
    { id: 'tags', label: 'Tags' },
    { id: 'proxy', label: 'Proxy' },
    { id: 'status', label: 'Statuses' },
    { id: 'worktime', label: 'Worktime' },
    { id: 'timer', label: 'Timer' },
  ];

  const [openFilters, setOpenFilters] = useState(false);

  // Profile Request
  useEffect(() => {
    if (folders.find((element) => element.id === folderId)) {
      dispatch(profileRequested({ folderId }));
      dispatch(profileFilterDataRequested({ folderId }));
      dispatch(tagsSimpleRequested({ folderId }));
      dispatch(statusesSimpleRequested({ folderId }));
    }
  }, [folders, folderId]);

  // Errors
  useEffectWithoutFirstRender(() => {
    enqueueSnackbar(errorProfile, { variant: 'error'});
  }, [errorProfile]);


  return (
    <Page title={`Browsers Folder - ${folderId}`}>
      <Stack
        direction='column'
        justifyContent='space-between'
        alignItems='stretch'
        height='100%'
      >
        <ProfileTableFilters open={openFilters} setOpen={setOpenFilters} />

        <BrowsersTable
          tableData={profiles}
          tabsValue='profiles'
          tableHead={tableHeads}
          loading={loadingProfiles}
          dragActive
          isFilterOpen={openFilters}
          pagination={(pn, ps) => dispatch(profileRequested({ folderId, pn, ps }))}
          total={totalProfile}
        settingHeads
        tableRow={(row, selected, onSelectRow) => (
          <ProfileTableRow
            key={row?.id}
            row={row}
            selected={selected.includes(row?.id)}
            onSelectRow={() => onSelectRow(row?.id)}
          />
        )}
          tableBottom={(selected, setSelected) =>
            <ProfileTableBottom selected={selected} setSelected={setSelected} />
          }
        />
      </Stack>

    </Page>
  );
}
