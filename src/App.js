import React, { useState } from "react";
import { makeStyles} from "@material-ui/core/styles"
import ButtonMat from "./composants/ButtonMat";
import Add from "./composants/Add";
import List from "./composants/List";
import Pay from "./composants/Pay";
import { 
  ButtonGroup, 
  Grid 
} from "@material-ui/core";

// import './App.css';

const useStyle = makeStyles((theme) => ({
  root: {
    '& > *' : {
      margin: theme.spacing(1),
    }
    // flexFlow: 1,
  }
}));

const names = ['add','list', 'pay'];

function App(props) {
  const classes = useStyle();
  const [items, setItems] = useState([]);
  const [activeTab, setActiveTab] = useState(names[0]);

  // console.log('items >>>', items);
  // console.log('props App', props);

  const add = (name, price) => {
    console.log('app name',name);
    console.log('app price',price);
    const obj = {
      name: name,
      price: price
    }
    console.log('obj', obj);

    const list = items;
    list.push(obj);
    console.log('list', list);
    setItems(list);
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'add':
        return <Add addItem={add}></Add>
      case 'list':
      return <List listItems={items}></List>
      case 'pay':
        return <Pay></Pay>
      
      default:
        break;
    }
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ButtonGroup  aria-label="contained primary button group" >
          {names.map(name => (
            <ButtonMat 
              key={name}
              onClick={() => setActiveTab(name)}   
              isSelected={activeTab === name ? true : false}  
            >
              {name}
            </ButtonMat>
          ))}
          </ButtonGroup> 
        </Grid>
        <Grid item xs={12}> 
        { renderContent()}
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
