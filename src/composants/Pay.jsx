import React, { useState } from "react";
import SimpleCard from "./Card"

export default function Pay (props) {
  const [basket, setBasket] = useState([]);
  const [total, setTotal] = useState(0);
  // const [totalEcoTax, setTotalEcoTax] = useState(0);
  // const [totalTVA, setTotalTVA] = useState(0);
  // const [totalTTC, setTotalTTC] = useState(0);

  console.log('props Pay', props);
  console.log('basket Pay', basket);


  function handleSelect (name, price) {
    console.log('handleselect >>>>>', name, price);

    const itemSelected = {
      name,
      price
    }
    console.log("itemSelected",  itemSelected);

    const newBasket = basket;
    console.log("newBasket", newBasket);

    newBasket.push(itemSelected);
    let sum = 0;
    for (let i = 0; i < newBasket.length; i++) {
      sum += newBasket[i].price;
    };

    console.log("sum", sum);

    setBasket({
      basket: newBasket,
    });

    setTotal(sum);
  }

  return (
    <div>
      <p>
        Total : {total}
        {props.items.map((item, index) => {
          console.log('item', item)
          return <SimpleCard 
                  key={index} 
                  itemName={item.name}
                  price={item.price}
                  onClick={handleSelect}
                />
        })}
      </p> 
    </div>
  );
};