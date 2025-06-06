import { useEffect, useState } from "react";
import React from "react";

const useCountries = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = "https://restcountries.com/v3.1/all?fields=name,flags,region";
    console.log("API URL som faktiskt används:", url); // ✅ LOGGA DIREKT EFTER URL-DECLARATIONEN

    const fetchCountries = async () => {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP-fel! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Countries fetched:", data.length); // ✅ LOGGA NÄR DATA KOMMIT IN

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
