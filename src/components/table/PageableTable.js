import { filter } from "lodash";
import { useState } from "react";
import Parser from 'html-react-parser';
// @mui
import {
  Card,
  Table,
  Paper,
  Popover,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from "@mui/material";
// components
import Iconify from "../iconify";
import Scrollbar from "../scrollbar";
// sections
import TableListHead from "./TableListHead";
import TableListToolbar from "./TableListToolbar";

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  const startWithNumber = (str) => /^\d/.test(str);
  const getNumberAtStartOrString = (str) =>
    startWithNumber(str) ? Number(str.match(/^\d+/)[0]) : str;
  const a_orderBy = getNumberAtStartOrString(a[orderBy]);
  const b_orderBy = getNumberAtStartOrString(b[orderBy]);
  if (b_orderBy < a_orderBy) {
    return -1;
  }
  if (b_orderBy > a_orderBy) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_item) => _item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function PageableTable({
  tableHead,
  tableContent,
  onEditButtonClicked,
  onDeleteButtonClicked,
  searchPlaceholder
}) {
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleOpenMenu = (event, id) => {
    setOpen(event.currentTarget);
    setSelected(id);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tableContent.length) : 0;

  const filteredUsers = applySortFilter(
    tableContent,
    getComparator(order, orderBy),
    filterName
  );

  const handleEditClicked = () => {
    onEditButtonClicked(selected);
    setOpen(null);
  };

  const handleDeleteClicked = () => {
    onDeleteButtonClicked(selected);
    setOpen(null);
  }

  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      <Card>
        <TableListToolbar
          filterName={filterName}
          onFilterName={handleFilterByName}
          searchPlaceholder={searchPlaceholder || "Search..."}
        />

        <Scrollbar>
          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <TableListHead
                order={order}
                orderBy={orderBy}
                headLabel={tableHead}
                rowCount={tableContent.length}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {filteredUsers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <TableRow hover key={index} tabIndex={-1} role="checkbox">
                        {tableHead.map((tableHeadItem, index) => {
                          if (tableHeadItem.id === "") {
                            return (
                              <TableCell align="right" key={index}>
                                <IconButton
                                  size="large"
                                  color="inherit"
                                  onClick={(e) => handleOpenMenu(e, row.id)}
                                >
                                  <Iconify icon={"eva:more-vertical-fill"} />
                                </IconButton>
                              </TableCell>
                            );
                          }
                          if (!index) {
                            return (
                              <TableCell
                                key={index}
                                component="th"
                                scope="row"
                                align="left"
                              >
                                <Typography variant="subtitle2">
                                  { Parser(row[tableHeadItem.id]) }
                                </Typography>
                              </TableCell>
                            );
                          }
                          return (
                            <TableCell key={index} align="left">
                              {row[tableHeadItem.id]}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>

              {isNotFound && (
                <TableBody>
                  <TableRow>
                    <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                      <Paper
                        sx={{
                          textAlign: "center",
                        }}
                      >
                        <Typography variant="h6" paragraph>
                          Not found
                        </Typography>

                        <Typography variant="body2">
                          No results found for &nbsp;
                          <strong>&quot;{filterName}&quot;</strong>.
                          <br /> Try checking for typos or using complete words.
                        </Typography>
                      </Paper>
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={tableContent.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            "& .MuiMenuItem-root": {
              px: 1,
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem onClick={handleEditClicked}>
          <Iconify icon={"eva:edit-fill"} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={handleDeleteClicked} sx={{ color: "error.main" }}>
          <Iconify icon={"eva:trash-2-outline"} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}
