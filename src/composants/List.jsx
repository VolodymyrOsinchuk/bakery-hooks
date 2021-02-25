import React from "react";
import { 
  Paper,
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow 
} from "@material-ui/core";

export default function List (props) {
  console.log('props list', props);

  return (
    <TableContainer component={Paper} style={{maxWidth: 300}}>
      <Table style={{maxWidth: 300}}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.listItems.map((row, index) => (
            <TableRow key={index}>
              <TableCell>
                {row.name}
              </TableCell>
              <TableCell>
                {row.price}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    // <ul>
    //   {props.listItems.map((curr, index) => {
    //     return (<li key={index}>{curr.name} - {curr.price}</li>)
    //   })} 
    // </ul>
  );
};