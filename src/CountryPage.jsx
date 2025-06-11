import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import useCountry from "./hooks/useCountry";
import React from "react";

function CountryPage() {
  const { countryName } = useParams();
  const { country, loading, error } = useCountry(countryName);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [neighborCountries, setNeighborCountries] = useState([]);
  const navigate = useNavigate();

  // Dark mode kontroll
  useEffect(() => {
    const checkDarkMode = () => {
      const isDark = document.body.classList.contains("dark-mode");
      setIsDarkMode(isDark);
    };

    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  // Hämta grannländer baserat på borders
  useEffect(() => {
    if (!country || !country.borders || country.borders.length === 0) {
      setNeighborCountries([]);
      return;
    }

    const fetchNeighbors = async () => {
      try {
        const promises = country.borders.map((code) =>
          fetch(`https://restcountries.com/v3.1/alpha/${code}`).then((res) => res.json())
        );
        const data = await Promise.all(promises);
        setNeighborCountries(data.map((d) => d[0]));
      } catch (err) {
        console.error("Error fetching neighbor countries:", err);
      }
    };

    fetchNeighbors();
  }, [country]);

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!country) return <p>No data found.</p>;

  return (
    <div className="country-page">
      <div className="back-button">
        <button onClick={() => navigate(-1)} className="back-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" style={{ marginRight: "10px" }}>
            <g transform="translate(-202.723 -137.717)">
              <path
                d="M16475.775,1222.011l-8.639,8.639,8.639,8.639"
                transform="translate(-16263 -1083.587)"
                fill="none"
                stroke={isDarkMode ? "#fff" : "#111517"}
                strokeWidth="1"
              />
              <line
                x1="30.57"
                transform="translate(204.395 147.155)"
                stroke={isDarkMode ? "#fff" : "#111517"}
                strokeWidth="1"
              />
            </g>
          </svg>
          BACK
        </button>
      </div>

      <div className="country-info">
        <div className="flag">
          <img src={country.flag} alt={`Flag of ${country.name}`} />
        </div>

        <div className="details-container">
          <h1 className="country-title">{country.name}</h1>
          <div className="country-details">
            <div className="detail-column1">
              <p><strong>Region: </strong> {country.region}</p>
              <p><strong>Subregion: </strong> {country.subregion}</p>
              <p><strong>Capital: </strong> {country.capital}</p>
            </div>
            <div className="detail-column2">
              <p><strong>Population: </strong> {country.population.toLocaleString()}</p>
              <p><strong>Languages: </strong> {country.languages}</p>
              <p><strong>Currencies: </strong> {country.currencies}</p>
            </div>
          </div>
        </div>
      </div>

      {neighborCountries.length > 0 && (
        <div className="neighbors">
          <h3>Border countries: </h3>
          <div className="neighbor-links">
            {neighborCountries.map((neighbor) => (
              <div key={neighbor.cca3} className="neighbor-item">
                <Link to={`/country/${neighbor.name.common.toLowerCase()}`}>
                  {neighbor.name.common}
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CountryPage;
