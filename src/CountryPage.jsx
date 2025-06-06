import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import React from "react";

function CountryPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { countryName } = useParams();
  const [country, setCountry] = useState(null);
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

  // Hämta land + grannländer
  useEffect(() => {
    const encodedName = encodeURIComponent(countryName);
    fetch(`https://restcountries.com/v3.1/name/${encodedName}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (!data || data.length === 0) {
          throw new Error("Country not found");
        }

        const countryData = data[0];
        setCountry(countryData);

        if (countryData.borders?.length > 0) {
          const neighborCodes = countryData.borders;
          const neighborPromises = neighborCodes.map((code) =>
            fetch(`https://restcountries.com/v3.1/alpha/${code}`).then((res) => res.json())
          );

          Promise.all(neighborPromises).then((neighbors) => {
            setNeighborCountries(neighbors.map((neighbor) => neighbor[0]));
          });
        } else {
          setNeighborCountries([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching country:", error);
      });
  }, [countryName]);

  if (!country) return <h2 className="loading">Loading ...</h2>;

  return (
    <div className="country-page">
      {/* Back-knapp */}
      <div className="back-button">
        <button onClick={() => navigate(-1)} className="back-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            style={{ marginRight: "10px" }}
          >
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

      {/* Flagga och detaljer */}
      <div className="country-info">
        <div className="flag">
          <img src={country.flags.svg} alt={`Flag of ${country.name.common}`} />
        </div>

        <div className="details-container">
          <h1 className="country-title">{country.name.common}</h1>
          <div className="country-details">
            <div className="detail-column1">
              <p><strong>Region: </strong> {country.region}</p>
              <p><strong>Subregion: </strong> {country.subregion}</p>
              <p><strong>Capital: </strong> {country.capital}</p>
            </div>
            <div className="detail-column2">
              <p><strong>Population: </strong> {country.population.toLocaleString()}</p>
              <p><strong>Languages: </strong> {Object.values(country.languages).join(", ")}</p>
              <p><strong>Currencies: </strong> {Object.values(country.currencies).map(c => c.name).join(", ")}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Grannländer */}
      {neighborCountries.length > 0 && (
        <div className="neighbors">
          <h3>Border countries: </h3>
          <div className="neighbor-links">
            {neighborCountries.map((neighbor) => (
              <div key={neighbor.cca3} className="neighbor-item">
                <Link to={`/country/${neighbor.name.common.toLowerCase()}`}>
                  {neighbor.cca3}
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
