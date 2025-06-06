import { useEffect, useState } from "react";
import React from "react";

const useCountries = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = "/.netlify/functions/getCountries";

    const fetchCountries = async () => {
      try {
        const response = await fetch(url);

        console.log("Response object:", response);

        if (!response.ok) {
          throw new Error(`HTTP-fel! Status: ${response.status}`);
        }

        const data = await response.json();

        console.log("Fetching countries from:", url);

        setCountries(data);
      } catch (err) {
        console.error("API Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  return { countries, loading, error };
};

export default useCountries;
