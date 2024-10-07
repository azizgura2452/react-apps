import React, { useEffect, useState } from 'react'

const useGetQuery = (props: { url: any; }) => {
  const [data, setData]= useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
        try {
          const response = await fetch(props.url);
          const json = await response.json();
          setData(json);
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
  }, [])

  return {data, isLoading}
}

export default useGetQuery