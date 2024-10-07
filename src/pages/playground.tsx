import React, { useEffect } from "react";
import useGetQuery from "../hooks/useGetQuery";

const Playground = () => {
  const { data, isLoading } = useGetQuery({
    url: "https://jsonplaceholder.typicode.com/users",
  });

  {
    return !isLoading && data.map((user) => 
    <li>{user.name}</li>);
  }
};

export default Playground;
