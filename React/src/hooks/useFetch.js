import { useState, useEffect } from "react";
import axios from "axios";
const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${url}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        setError(err);
      });
    setLoading(false);
  }, [url]);

  const reFetch = async () => {
    setLoading(true);
    axios
      .get(`${url}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        setError(err);
      });
    setLoading(false);
  };

  return { data, loading, error, reFetch };
};

export default useFetch;
