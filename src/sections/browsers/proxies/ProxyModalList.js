import PropTypes from 'prop-types';
import { Button, Card, Stack, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { useState } from 'react';
import map from 'lodash/map';
import CreateDrawer from '../../../components/browsers/CreateDrawer';
import { MODAL_TABLE_HEAD } from './ProxyConfig';
import Scrollbar from '../../../components/Scrollbar';
import { TableEmptyRows, TableHeadCustom, TableNoData } from '../../../components/table';
import useTable, { emptyRows } from '../../../hooks/useTable';
import { ProxyModalListTableRow } from '.';
import { useDispatch, useSelector } from '../../../redux/store';
import { ModalTabs } from '../../index';

// ----------------------------------------------------------------------

const TABLE_HEADS = [
  {
    id: 'newProxy',
    label: 'New proxy',
    src: '/assets/icons/main/ic_add.svg',
    iconWidth: 14,
    iconHeight: 14,
  },
];

// ----------------------------------------------------------------------

ProxyModalList.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

// ----------------------------------------------------------------------

export default function ProxyModalList({open, close}) {

  const { dense, page, order, orderBy, rowsPerPage } = useTable();

  const tableData = useSelector((state) => state.browsers.proxy.collection);

  const [tab, setTab] = useState(TABLE_HEADS[0].id);

  const denseHeight = dense ? 52 : 72;

  return (
    <CreateDrawer open={open} toggleDrawer={close} sx={{ width: 869 }}>
      <ModalTabs
        onCloseModal={close}
        tabValue={tab}
        tableHeads={TABLE_HEADS}
        handleChange={(newValue) => setTab(newValue)}
      />

      <Card sx={{ borderRadius: 1, height: '100%' }}>
        <Scrollbar sx={{ mx: '0.7rem', mt: '0.7rem' }}>
          <TableContainer sx={{ minWidth: 500, position: 'relative', maxHeight: '80vh' }}>
            <Table sx={{ border: 'none' }} stickyHeader>
              <TableHeadCustom
                order={order}
                orderBy={orderBy}
                headLabel={MODAL_TABLE_HEAD}
                rowCount={tableData.length}
              />

              <TableBody>
                <TableRow sx={{ height: 1 }}>
                  <TableCell />
                </TableRow>

                {map(tableData, (row, index) => <ProxyModalListTableRow key={index} row={row} />)}

                <TableEmptyRows height={denseHeight} emptyRows={emptyRows(page, rowsPerPage, tableData.length)} />

                <TableNoData isNotFound={!tableData.length} />
              </TableBody>
            </Table>
          </TableContainer>
          <Stack direction='row' justifyContent='center'>
            <Button
              sx={{ width: 350 }}
              size='large'
              variant='contained'
              onClick={close}
            >
              Add proxies
            </Button>
          </Stack>
        </Scrollbar>
      </Card>
    </CreateDrawer>
  );
}
