import React from "react";
import useCountries from "./hooks/useCountries";
import CountryCard from "./komponenter/CountryCard";
import { useOutletContext } from "react-router-dom";

const Home = () => {
  const { countries, loading, error } = useCountries();
  const { searchCountry, selectContinent } = useOutletContext();

  // Filtrera länder efter söktext och vald kontinent
  const filteredCountries = countries.filter((country) => {
    const name = country.name?.common?.toLowerCase() || "";
    const region = country.region || "";

    const matchesSearch =
      !searchCountry || name.includes(searchCountry.toLowerCase());
    const matchesContinent =
      selectContinent === "All" ||
      selectContinent === "" ||
      region === selectContinent;

    return matchesSearch && matchesContinent;
  });

  // Laddar data
  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  // Felhantering
  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="countries-list">
      {filteredCountries.length > 0 ? (
        [...filteredCountries]
          .sort((a, b) => a.name.common.localeCompare(b.name.common))
          .map((country) => (
            <CountryCard key={country.cca3} country={country} />
          ))
      ) : (
        <h4>No countries found.</h4>
      )}
    </div>
  );
};

export default Home;
