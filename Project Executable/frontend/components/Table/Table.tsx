import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { Button } from "../Button";

export const TableComponent = (props: any) => {
  const { data, columns, btnLabel, handleBtnClick } = props;

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(100);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 800 }}>
        <Table size="medium" stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column: any) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  sx={{ background: "#163658" }}
                >
                  <Typography color="white" fontWeight={600}>
                    {column.label}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length > 0 ? (
              data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: any, index: number) => {
                  return (
                    <TableRow
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                      sx={{
                        background: index % 2 == 0 ? "#bad3ee" : "#d9e7f6",
                      }}
                    >
                      {columns.map((column: any) => {
                        const Component = column.Component;
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {Component ? (
                              <Component row={row} />
                            ) : (
                              row[column.id]
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })
            ) : (
              <TableCell colSpan={columns.length}>
                <Box
                  width="100%"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Typography fontSize={25}>No data!</Typography>
                </Box>
              </TableCell>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box py={2} display="flex" alignContent="center">
        <Box
          width="50%"
          display="flex"
          alignItems="center"
          justifyContent="start"
          px={10}
        >
          <Button
            label={btnLabel}
            onClick={handleBtnClick}
            variant="contained"
          />
        </Box>
        <Box width="50%">
          <TablePagination
            rowsPerPageOptions={[100, 200]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </Box>
    </Paper>
  );
};
