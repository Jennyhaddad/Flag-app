import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import darkLogo from "../assets/logo-dark.png";
import lightLogo from "../assets/logo-light.png"; 

const RootLayout = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchCountry, setSearchCountry] = useState("");
  const [selectContinent, setSelectContinent] = useState("");
  const location = useLocation(); 
  

  useEffect(() => {
    document.body.classList.toggle("dark-mode", isDarkMode);
  }, [isDarkMode]);

  const isCountryPage = location.pathname.startsWith("/country/");

  return (
    <div className="root-layout">
      <header>
        <nav className="navbar">
          <h2 className="titel">The Flag App</h2>
          <img 
            src={isDarkMode ? lightLogo : darkLogo}  
            alt="App-logo"
            className="logo"
          />
          <button className="color-mode" onClick={() => setIsDarkMode(!isDarkMode)}>
            {isDarkMode ? (
              <>
                DARK MODE
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  viewBox="0 0 29.548 30.563"
                  style={{ marginLeft: '8px', verticalAlign: 'middle' }}
                >
                  <g transform="matrix(0.978, -0.208, 0.208, 0.978, 0, 5.132)" fill="#fff">
                    <path d="M 13.1487283706665 25.5 C 11.44019794464111 25.5 9.783098220825195 25.16930961608887 8.223467826843262 24.51712989807129 C 6.717148303985596 23.88723945617676 5.3643479347229 22.9854793548584 4.202638149261475 21.83690071105957 C 3.041308164596558 20.688720703125 2.129648208618164 19.35190963745117 1.492968201637268 17.86362075805664 C 0.8340781331062317 16.32341003417969 0.499998152256012 14.68706035614014 0.499998152256012 13 C 0.499998152256012 11.31293964385986 0.8340781331062317 9.676589965820312 1.492968201637268 8.13638973236084 C 2.129648208618164 6.648079872131348 3.04131817817688 5.311270236968994 4.202638149261475 4.163099765777588 C 5.3643479347229 3.014519929885864 6.717148303985596 2.112760066986084 8.223467826843262 1.482869982719421 C 9.783098220825195 0.8306900262832642 11.44019794464111 0.5 13.1487283706665 0.5 C 13.36637401580811 0.5 13.58392715454102 0.5054885149002075 13.80100536346436 0.5164262652397156 C 9.882394790649414 2.296556949615479 7.291938304901123 6.185417652130127 7.291938304901123 10.59239959716797 C 7.291938304901123 16.70900917053223 12.32233810424805 21.68523025512695 18.50552749633789 21.68523025512695 C 20.10935211181641 21.68523025512695 21.66780662536621 21.35343933105469 23.10197257995605 20.71462440490723 C 22.1580696105957 21.90229415893555 21.00032234191895 22.91800880432129 19.68442726135254 23.70439910888672 C 17.71874809265137 24.87908935546875 15.45873832702637 25.5 13.1487283706665 25.5 Z" />

                  </g>
                </svg>
              </>
            ) : (
              "LIGHT MODE"
            )}
          </button>
        </nav>
      </header>

      {!isCountryPage && (
        <div className="input-select">
          <input
            type="text"
            placeholder="Search for a country"
            value={searchCountry}
            onChange={(e) => setSearchCountry(e.target.value)}
            className="search-input"
          />

          <div className="select-wrapper">
            <select
              value={selectContinent}
              onChange={(e) => setSelectContinent(e.target.value)}
              className="continent-select"
            >
              <option value="">Region</option>
              <option value="All">All</option>
              <option value="Africa">Africa</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="Americas">America</option>
              <option value="Oceania">Oceania</option>
            </select>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10.662"
              height="6.038"
              viewBox="0 0 10.662 6.038"
              className="dropdown-arrow"
            >
              <path
                d="M18053.879,155.452l4.977,4.978,4.979-4.978"
                transform="translate(-18053.525 -155.098)"
                fill="none"
                stroke={isDarkMode ? "#fff" : "#111517"}
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>
      )}

      <main>
        <Outlet context={{ searchCountry, selectContinent }} />
      </main>
    </div>
  );
};

export default RootLayout;
