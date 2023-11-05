import { useSelector } from 'react-redux';
import { Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import Scrollbar from '../../components/Scrollbar';
import { TableHeadCustom, TableNoData } from '../../components/table';
import useWindowSize from '../../hooks/useWindowSize';
import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

const TRACKING_MODAL_TABLE_HEAD = [
  { id: 'message', label: 'Message' },
  { id: 'date', label: 'Date' },
];

// ----------------------------------------------------------------------

export default function TrackingModalTable() {
  const [, windowHeight] = useWindowSize();

  const tableData = useSelector((state) => state.tracking.changelog.collection);

  return (
    <Stack>
      <Scrollbar heightAuto sx={{ mt: '0.7rem' }}>
        <TableContainer
          sx={(theme) => ({
            '::-webkit-scrollbar': {
              width: 7,
              height: 7,
            },
            '::-webkit-scrollbar-thumb': {
              backgroundColor: alpha(theme.palette.grey[600], 0.48),
              borderRadius: 100,
            },
            '::-webkit-scrollbar-track': {
              background: 'rgba(0,0,0,0)',
            },

            height: windowHeight - (16 + 49 + 52),
            position: 'relative',
            pr: 0.25,
          })}
        >
          <Table sx={{ border: 'none' }} stickyHeader>
            <TableHeadCustom headLabel={TRACKING_MODAL_TABLE_HEAD} />

            <TableBody>
              <TableRow>
                <TableCell />
              </TableRow>

              {tableData.map((row, key) => (
                <TableRow key={key} height="44px">
                  <TableCell sx={{ width: '75%' }} align="left">
                    <Typography variant="body2">{row.message}</Typography>
                  </TableCell>

                  <TableCell align="left">
                    <Typography variant="body2">{row.date}</Typography>
                  </TableCell>
                </TableRow>
              ))}

              <TableNoData isNotFound={!tableData?.length} />
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>
    </Stack>
  );
}
