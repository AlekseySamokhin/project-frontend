import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { Stack } from '@mui/material';
import { useDispatch } from '../../redux/store';
import Page from '../../components/Page';
import { StatusesTableBottom, StatusesTableFilters, StatusesTableRow } from '../../sections/browsers/statuses';
import { STATUSES_TABLE_HEAD } from '../../sections/browsers/statuses/StatusesConfig';
import { statusesRequested } from '../../redux/slices/browsers';
import { BrowsersTable } from '../../sections/browsers';
import useEffectWithoutFirstRender from '../../hooks/useEffectWithoutFirstRender';
import { useSnackbar } from 'notistack';

// ----------------------------------------------------------------------

export default function StatusesPage() {

  const dispatch = useDispatch();

  const params = useParams();

  const folderId = params.id;

  const { enqueueSnackbar } = useSnackbar();

  const folders = useSelector((state) => state.browsers.folder.collection);

  const { collection: statuses,
    loading: loadingStatus,
    error: errorStatus,
    total: totalStatus} = useSelector((state) => state.browsers.statuses);

  useEffect(() => {
    if (folders.find((element) => element.id === folderId)) {
      dispatch(statusesRequested({ folderId }));
    }
  }, [folders, folderId]);

  // Errors
  useEffectWithoutFirstRender(() => {
    enqueueSnackbar(errorStatus, { variant: 'error'});
  }, [errorStatus]);


  return (
    <Page title={`Browsers Folder - ${folderId}`}>
      <Stack
        direction='column'
        justifyContent='space-between'
        alignItems='stretch'
        height='100%'
      >

        <StatusesTableFilters />

        <BrowsersTable
          tableData={statuses}
          tabsValue='statuses'
          tableHead={STATUSES_TABLE_HEAD}
          loading={loadingStatus}
          total={totalStatus}
          tableRow={(row, selected, onSelectRow) => (
            <StatusesTableRow
              key={row?.id}
              row={row}
              selected={selected.includes(row?.id)}
              onSelectRow={() => onSelectRow(row?.id)}
            />
          )}
          tableBottom={(selected, setSelected) =>
            <StatusesTableBottom selected={selected} setSelected={setSelected} />
          }
        />
      </Stack>
    </Page>
  );
}
