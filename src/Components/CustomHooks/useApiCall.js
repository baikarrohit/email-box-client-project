import { useEffect, useState } from "react";

const useApiCall = (url, method, body = null) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: method,
          body: body ? JSON.stringify(body) : null,
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const result = await response.json();
          setData(result);
        } else {
          throw new Error("Network response failed!");
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url, method, body]);

  return { data, error, loading };
};

export default useApiCall;
