import React, {useState, useEffect} from "react";
// import imageCr from "./public/images/item.png"

export default function SimpleCard (props) {
  const imageUrl = "./images/item.png";
  const URLimage = `https://raw.githubusercontent.com/konexio/digitous-assest/main/bakery/${props.itemName}.png`;
  // const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(imageUrl);

  console.log('props Card', props);
 
  useEffect(() => {
    try {
      fetch(URLimage)
      .then(res => res.blob())
      .then(res => {
        setImage(URLimage)
      })
    } catch (error) {
      console.error('error is: ', error.message)
    }
  }, [URLimage]);

  return (
    <>
      <img 
        style={{width: '300px', padding: 20}}
        alt="croissant" 
        src={image}
        onClick={() => {
          props.onClick(props.itemName, props.price)
        }}

      />
    </>
  );
};
