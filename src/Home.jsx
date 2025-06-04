import React from "react";
import useCountries from "./hooks/useCountries";
import CountryCard from "./komponenter/CountryCard";
import { useOutletContext } from "react-router-dom";


const Home = () => {
    const { countries, loading, error} = useCountries();
    const { searchCountry, selectContinent } = useOutletContext();

      

    const filteredCountries = countries.filter((country) => {
        const matchesSearch = country.name.common.toLowerCase().includes(searchCountry.toLowerCase());
        const matchesContinent = selectContinent === "All" || selectContinent === "" || country.region === selectContinent;
        return matchesSearch && matchesContinent;
    });


if (loading) {
    return <div>Loading ...</div>;
}

if (error) {
    return <div>Error: {error}</div>
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
            <h4>No countries found</h4>
        )}
    </div>
);


};




export default Home;