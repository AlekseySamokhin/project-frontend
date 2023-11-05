import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  Divider,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import SvgIconStyle from '../../components/SvgIconStyle';
import Scrollbar from '../../components/Scrollbar';
import { TableHeadCustom, TableNoData } from '../../components/table';
import useTable from '../../hooks/useTable';
import { BrowsersTabs } from './index';
import Loading from '../../components/Loading';
import useEffectWithoutFirstRender from '../../hooks/useEffectWithoutFirstRender';

// ----------------------------------------------------------------------

BrowsersTable.propTypes = {
  tableData: PropTypes.array,
  tabsValue: PropTypes.string,
  tableHead: PropTypes.array,
  tableRow: PropTypes.func,
  tableBottom: PropTypes.func,
  loading: PropTypes.bool,
  settingHeads: PropTypes.bool,
  isFilterOpen: PropTypes.bool,
  dragActive: PropTypes.bool,
  visibleTab: PropTypes.bool,
};

// ----------------------------------------------------------------------

export default function BrowsersTable({
                                        tableData,
                                        tabsValue,
                                        tableHead,
                                        tableRow,
                                        tableBottom,
                                        total,
                                        pagination,
                                        loading = false,
                                        dragActive = false,
                                        settingHeads = false,
                                        visibleTab = true,
                                      }) {
  const {
    page,
    order,
    orderBy,
    rowsPerPage,
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const [drag, setDrag] = useState(false);

  function dragStartHandler(e) {
    e.preventDefault();
    setDrag(true);
  }

  function dragEndHandler(e) {
    e.preventDefault();
    setDrag(false);
  }

  useEffectWithoutFirstRender(() => {
    pagination(page + 1, rowsPerPage);
  }, [rowsPerPage, page]);

  return (
    <Card
      sx={{ borderRadius: 1, display: 'flex', flexDirection: 'column', height: '100%' }}
      onDragOver={(e) => (dragActive && dragStartHandler(e))}
    >
      {drag && (
        <Stack
          display='flex'
          position='absolute'
          width={1}
          height={1}
          justifyContent='center'
          alignItems='center'
          zIndex={1000}
          border='3px dashed #3366FF'
          bgcolor='#ffffffb3'
          onDragLeave={(e) => dragEndHandler(e)}
          onDrop={(e) => dragEndHandler(e)}
        >
          <Stack alignItems='center' sx={{ pointerEvents: 'none' }}>
            <SvgIconStyle
              src={'/assets/icons/main/ic_cloud.svg'}
              sx={{ width: 172, height: 132, mb: 2, color: 'grey.600' }}
            />
            <Typography color='grey.600' variant='h4' textAlign='center'>
              Drop your files right here
            </Typography>
            <Typography color='grey.600' textAlign='center' variant='h4'>
              to upload from file
            </Typography>
          </Stack>
        </Stack>
      )}

      {visibleTab && <BrowsersTabs tabsValue={tabsValue} />}

      <Divider />

      <Scrollbar sx={{ mx: '0.7rem', mt: '0.7rem', height: '100%', '& .simplebar-content': { height: '98.3%' } }}>
        {!loading ?
          <>
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
                minWidth: 550,
                height: '100%',
                position: 'relative',
                pr: 0.25,
              })}
            >
              <Table sx={{ border: 'none' }} stickyHeader>

                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={tableHead}
                  rowCount={tableData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).length}
                  numSelected={selected.length}
                  onSort={onSort}
                  settingHeads={settingHeads}
                  onSelectAllRows={(checked) => {
                    onSelectAllRows(
                      checked,
                      tableData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => row.id),
                    );
                  }}
                />

                <TableBody>

                  <TableRow>
                    <TableCell sx={{ p: '4px' }} />
                  </TableRow>

                  {tableData?.map((row, key) =>
                    <React.Fragment
                      key={key}>
                      {tableRow(row, selected, onSelectRow)}

                      <TableRow>
                        <TableCell sx={{ p: '1px' }} />
                      </TableRow>
                    </React.Fragment>)
                  }

                  <TableNoData isNotFound={!tableData?.length} />
                </TableBody>
              </Table>
            </TableContainer>
          </> : <Loading height='70vh' />
        }
      </Scrollbar>

      <Stack
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        sx={(theme) => ({
          borderTop: `solid 1px ${theme.palette.divider}`,
          backgroundColor: theme.palette.background.light,
        })}
      >
        <Stack p={1}>
          {tableBottom(selected, setSelected)}
        </Stack>

        <TablePagination
          rowsPerPageOptions={[25, 50, 100]}
          component='div'
          count={total}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={onChangePage}
          onRowsPerPageChange={onChangeRowsPerPage}
        />


      </Stack>
    </Card>
  );
}