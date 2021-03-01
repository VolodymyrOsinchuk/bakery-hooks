import React, { useState } from "react";
import { 
  Button, 
  Slider, 
  TextField, 
  Typography 
} from "@material-ui/core";

export default function Add (props) {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState(1);

  // console.log('productName is: ', productName);
  // console.log('price', price);
  // console.log('props Add >>>>>>', props);

  const updateItemName = (event) => {
    console.log('updateItemName >>>',)
    setProductName( event.target.value)
  };

  const updatePrice = (event,newPrice) => {
    setPrice(newPrice);
  };

  const click = () => {
    console.log('click add')
    props.addItem(productName, price)
  }


  return (
    <div>
      <form>
        <TextField 
          variant="outlined"
          onChange={updateItemName}
        />
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={click}
          style={{height: 55}}
        >
          Add
        </Button>
      </form> 
      <Typography>
        {price} €
      </Typography>
      <Slider 
        value={price}
        min={1}
        max={10}
        step={1}
        valueLabelDisplay="auto"
        marks={true}
        style={{width: 500}}
        onChange={updatePrice}
      />
    </div>
  );
};