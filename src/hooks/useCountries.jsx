import { useEffect, useState } from "react";

const useCountries = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = "https://restcountries.com/v3.1/all?fields=name,flags,region,capital,population";

    const fetchCountries = async () => {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setCountries(data);
      } catch (err) {
        console.error("API Error:", err);
        setError(err.message || "Unexpected error");
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  return { countries, loading, error };
};

export default useCountries;
