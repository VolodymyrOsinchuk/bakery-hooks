import { useEffect, useState} from "react";

function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function fetchUrl() {
      const response = await fetch(url, {mode: "no-cors"});
      const blob = await response.blob()
      
      console.log('response ', response);
      console.log('blob ', blob);
      setData(blob);
      setLoading(false);
    }
    console.log('fetchUrl ', fetchUrl);

    fetchUrl();
  }, [data, url]);

  return [data, loading]; 
};

export {useFetch};