import React, {useState, useEffect} from "react";
// import imageCr from "./public/images/item.png"

export default function SimpleCard (props) {
  const imageUrl = "./images/item.png";
  // const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(imageUrl);

  console.log('image Card', image);

  const URLimage = `https://github.com/konexio/digitous-assest/blob/main/bakery/${props.itemName}.png`;

  console.log('URLimage Card', URLimage);


  useEffect(() => {
    const loadImage = async () => {
      const response = await fetch(URLimage, {mode: "no-cors"});
      const data = await response.blob();
      setImage(
        image
      );
      console.log("response", response);
      console.log("data",data);
    }
    loadImage();
  }, [])

 
  return (
    <div>
      <img 
        style={{width: '300px'}}
        alt="croissant" 
        src={image}
        onClick={() => {
          props.onClick(props.itemName, props.price)
        }}
      />
      {/* <h1>Photos</h1>
      {loading ? (
        "Loading ..."
      ) : (
        <ul>
      <img src={imageUrl} alt="croissant"/>
        </ul>
      )} */}
    </div>
  );
};