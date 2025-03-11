import React from 'react'
import { Button } from '@mui/material'

export default function ButtonMat(props) {
  return (
    <div>
      <Button
        onClick={props.onClick}
        type="button"
        variant="contained"
        color={props.isSelected ? 'primary' : 'inherit'}
      >
        {props.children}
      </Button>
    </div>
  )
}
