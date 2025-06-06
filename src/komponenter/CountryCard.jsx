import { Link } from "react-router-dom";
import React from "react";

const CountryCard = ({ country }) => {
   return (
    <Link to={`/country/${country.name.common}`} className="country-card-link">
      <div className="country-card">
          <img src={country.flags?.png} alt={`Flag of ${country.name?.common}`} className="country-flag" />
          <div className="card-info">
              <h4>{country.name.common}</h4>
              <p><strong>Capital: </strong>{country.capital ? country.capital[0] : 'N/A'}</p>
              <p><strong>Region: </strong>{country.region}</p>
              <p className="population"><strong>Population: </strong>{country.population.toLocaleString()}</p>
          </div>

      </div>
    </Link>
   );
};

export default CountryCard;


