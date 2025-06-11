import { Link } from "react-router-dom";
import React from "react";

function CountryCard({ country }) {
  return (
    <Link to={`/country/${country.name.common}`} className="country-card-link">
      <div className="country-card">
        <div className="country-flag">
          <img
            src={country.flags.svg}
            alt={`Flag of ${country.name.common}`}
            // style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
             className="flag-img"
          />

        </div>

        <div className="card-info">
          <h4>{country.name.common}</h4>
          <p><strong>Capital:</strong> {country.capital ? country.capital[0] : "N/A"}</p>
          <p><strong>Region:</strong> {country.region || "N/A"}</p>
          <p><strong>Population:</strong>
            {country.population ? country.population.toLocaleString() : "N/A"}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default CountryCard;
