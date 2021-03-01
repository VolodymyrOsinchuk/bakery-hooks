import React, { useState } from "react";
import SimpleCard from "./Card"

export default function Pay (props) {
  const [basket, setBasket] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalEcoTax, setTotalEcoTax] = useState(0);
  const [totalTVA, setTotalTVA] = useState(0);
  const [totalTTC, setTotalTTC] = useState(0);

  function handleSelect (name, price) {

    const itemSelected = {
      name,
      price
    }

    const newBasket = basket;

    newBasket.push(itemSelected);
    let sum = 0;
    for (let i = 0; i < newBasket.length; i++) {
      sum += newBasket[i].price;
    };

    // const newSum = newBasket.reduce((acc, item) => {
    //   return acc + item.price
    // }, 0);

    // console.log('newSum', newSum);

    setBasket( newBasket );

    setTotal(sum);

    setTotalEcoTax( newBasket.length * 0.03 );

    setTotalTVA( sum * 20 / 100 );

    setTotalTTC( sum + newBasket.length * 0.03 + sum * 20 / 100 )
  }
  
  
  function itemCount (itemName) {
    return basket.filter((item) => {
      return item.name === itemName;
    });
  }
  // const croissants = itemCount("croissant");
  // const coffees = itemCount("coffee");
  // const cakes = itemCount("cake");
  

  return (
    <div>
        {/* {basket.map((item, index) => {
          return <p key={index}> {item.name} x</p>
        })} */}
      {/* {croissants.length > 0 && <p>Croissant x {croissants.length}</p>}
      {coffees.length > 0 && <p>Coffee x {coffees.length}</p>}
      {cakes.length > 0 && <p>Cake x {cakes.length}</p>} */}
      {props.items.map((item, index) => {
        console.log('item', item)
        return <SimpleCard 
                key={index} 
                itemName={item.name}
                price={item.price}
                onClick={handleSelect}
              />
      })}
      <p>Total: {total} </p> 
      <p>EcoTax: {totalEcoTax.toFixed(2)} </p> 
      <p>TVA: {totalTVA} </p> 
      <p>TTC: {totalTTC.toFixed(2)} </p> 
      {props.items.map((item, index) => {
        const itemcount = itemCount(item.name).length;
        if (itemcount > 0) {
          return <p key={index}>{item.name} x {itemcount} </p>
        } else {
          return null;
        }
      }).filter(item => item !== null)}
    </div>
  );
};