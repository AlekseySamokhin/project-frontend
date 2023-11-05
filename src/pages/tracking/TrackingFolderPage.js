import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { TrackingTable, TrackingTableBottom, TrackingTableRow } from '../../sections/tracking';
import Page from '../../components/Page';
import { useDispatch } from '../../redux/store';
import { trackingRequested } from '../../redux/slices/tracking';
import { Stack } from '@mui/material';

// ----------------------------------------------------------------------

export const TRACKING_TABLE_HEAD = [
  { id: 'profileName', label: 'Profile name' },
  { id: 'initiator', label: 'Initiator' },
  { id: 'lastMessage', label: 'Last message' },
  { id: 'date', label: 'Date' },
];

// ----------------------------------------------------------------------

export default function TrackingFolderPage() {
  const dispatch = useDispatch();

  const params = useParams();

  const folderId = params.id;

  const folders = useSelector((state) => state.tracking.folder.collection);

  const { collection: tracingData } = useSelector((state) => state.tracking.trackingList);

  useEffect(() => {
    if (folders.length) {
      dispatch(trackingRequested(folderId));
    }
  }, [folders, folderId]);

  return (
    <Page title={`Tracking Folder - ${folderId}`}>
      <Stack
        direction='column'
        justifyContent='space-between'
        alignItems='stretch'
        height='100%'
      >
        <TrackingTable
          tableData={tracingData}
          tableHead={TRACKING_TABLE_HEAD}
          tableRow={(row, selected, onSelectRow) => (
            <TrackingTableRow
              key={row?.id}
              row={row}
              selected={selected.includes(row?.id)}
              onSelectRow={() => onSelectRow(row?.id)}
            />
          )}
          tableBottom={(selected, setSelected) => <TrackingTableBottom selected={selected} setSelected={setSelected} />}
        />
      </Stack>
    </Page>
  );
}
