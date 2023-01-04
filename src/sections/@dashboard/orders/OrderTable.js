import * as React from "react";
// mui
import {
  TableHead,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography
} from "@mui/material";

export default function OrderTable({ products }) {
  const totalPrice = products.reduce((accumulator, current) => accumulator + current.price * current.quantity, 0);

  return (
    <Card>
      <Typography variant="subtitle1" p={2}>
        Order summary
      </Typography>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="Order summary">
          <TableHead>
            <TableRow>
              <TableCell>Product name</TableCell>
              <TableCell align="right">Price per item</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Total price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.productName}
                </TableCell>
                <TableCell align="right">{row.price} RON</TableCell>
                <TableCell align="right">{row.quantity}</TableCell>
                <TableCell align="right">
                  {row.price * row.quantity} RON
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              { [...Array(3)].map(() => <TableCell></TableCell>) }
              <TableCell align="right" variant="footer">Total: { totalPrice } RON</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}
