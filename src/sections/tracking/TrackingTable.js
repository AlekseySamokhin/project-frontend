import PropTypes from 'prop-types';
import { Card, Stack, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow } from '@mui/material';
import { alpha } from '@mui/material/styles';
import Scrollbar from '../../components/Scrollbar';
import { TableHeadCustom, TableNoData } from '../../components/table';
import useTable from '../../hooks/useTable';
import { TrackingTableBottom } from './index';
import React from 'react';

// ----------------------------------------------------------------------

TrackingTable.propTypes = {
  tableData: PropTypes.array,
  tableHead: PropTypes.array,
  tableRow: PropTypes.func,
};

// ----------------------------------------------------------------------

export default function TrackingTable({ tableData, tableHead, tableRow }) {

  const {
    page,
    order,
    orderBy,
    rowsPerPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  return (
    <Card sx={{ borderRadius: 1, display: "flex", flexDirection: "column" , height: "100%"}}>

      <Scrollbar sx={{ mx: '0.7rem', mt: '0.7rem', height: "100%", "& .simplebar-content": {height: "98.3%"}}}>
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
            height: "100%",
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
              onSelectAllRows={(checked) =>
                onSelectAllRows(
                  checked,
                  tableData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => row.id),
                )
              }
            />

            <TableBody>

              <TableRow>
                <TableCell sx={{ p: '4px' }} />
              </TableRow>

              {tableData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                <React.Fragment key={index}>
                  {tableRow(row, selected, onSelectRow)}

                  <TableRow>
                    <TableCell sx={{ p: '1px' }} />
                  </TableRow>
                </React.Fragment>
              ))}

              <TableNoData isNotFound={!tableData?.length} />
            </TableBody>
          </Table>
        </TableContainer>
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
          <TrackingTableBottom selected={selected} setSelected={setSelected} />
        </Stack>

        <TablePagination
          rowsPerPageOptions={[25, 50, 100]}
          component='div'
          count={tableData?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={onChangePage}
          onRowsPerPageChange={onChangeRowsPerPage}
        />

      </Stack>

    </Card>
  );
}
