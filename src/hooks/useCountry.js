import { useEffect, useState } from "react";

const useCountry = (countryName) => {
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const encodedName = encodeURIComponent(countryName);

    const fetchCountry = async () => {
      try {
        const res = await fetch(`https://restcountries.com/v3.1/name/${encodedName}`);
        if (!res.ok) throw new Error("Country not found");

        const data = await res.json();
        const raw = data[0];

        const sanitized = {
          name: raw.name?.common || "N/A",
          flag: raw.flags?.svg || "",
          region: raw.region || "N/A",
          subregion: raw.subregion || "N/A",
          capital: raw.capital?.join(", ") || "N/A",
          population: raw.population
            ? raw.population.toLocaleString()
            : "N/A",
          languages: raw.languages
            ? Object.values(raw.languages).join(", ")
            : "N/A",
          currencies: raw.currencies
            ? Object.values(raw.currencies)
                .map((c) => c.name)
                .join(", ")
            : "N/A",
          borders: raw.borders || [],
        };

        setCountry(sanitized);
      } catch (err) {
        setError(err.message || "Unexpected error");
      } finally {
        setLoading(false);
      }
    };

    fetchCountry();
  }, [countryName]);

  return { country, loading, error };
};

export default useCountry;
