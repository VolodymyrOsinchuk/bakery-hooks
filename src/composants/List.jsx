import React from "react";
import { 
  Button,
  Paper,
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow 
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  table: {
    maxWidth: 500,
  }
})

export default function List (props, ) {
  const classes = useStyles();
  // console.log('props list', props);

  return (
    <TableContainer component={Paper} className={classes.table}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Price €</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.listItems.map((row, index) => (
            <TableRow key={index}>
              <TableCell>
                {row.name}
              </TableCell>
              <TableCell>
                {row.price} €
              </TableCell>
              <TableCell>
               <Button 
                color="secondary"
                variant="contained"
                onClick={() => {props.deleteItem(index)}}
               >
                 Delete
               </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};