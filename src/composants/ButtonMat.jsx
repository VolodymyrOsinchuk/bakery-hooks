import React from "react";
import { Button } from "@material-ui/core";

export default function ButtonMat (props) {

  // console.log('buton props', props);

  return (
    <div>
      <Button 
        onClick={props.onClick}
        type="button"
        variant="contained"
        color={props.isSelected ? "primary": "default" }
      >
      {props.children}
      </Button> 
    </div>
  );
};