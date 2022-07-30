import React from "react";
import {
  SearchComponent,
  SelectComponent,
} from "../components/FilterComponent";
import { debounce } from "@mui/material";
import CountryCard from "../components/CountryCard";

import { useQuery } from "react-query";
import { Link } from "react-router-dom";

function Homepage() {
  const [countries, setCountries] = React.useState([]);

  const countriesQuery = useQuery(["countries"], () =>
    fetch(`https://restcountries.com/v3.1/all`).then((res) =>
      res.json().then((json) => setCountries(json))
    )
  );

  const fetchRegions = async (region) => {
    const res = await fetch(`https://restcountries.com/v3.1/region/${region}`);
    const json = await res.json();
    setCountries(json);
  };

  const fetchCountry = async (country) => {
    const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
    const json = await res.json();
    setCountries(json);
  };

  const handleSearch = debounce((e) => {
    if (
      e.target.value === "" ||
      e.target.value === null ||
      e.target.value === undefined
    ) {
      countriesQuery.refetch();
    } else if (e.target.value.length > 2) {
      fetchCountry(e.target.value);
    }
  }, 500);

  const handleSelect = (e) => {
    e.preventDefault();
    if (e.target.value === "" || e.target.value === undefined) {
      countriesQuery.refetch();
    }
    fetchRegions(e.target.value);
  };

  return (
    // homepage component
    <div className='homepage'>
      <div className='filter-section'>
        <SearchComponent handleSearch={handleSearch} />
        <SelectComponent handleSelect={handleSelect} />
      </div>
      <div className='countries-section'>
        {/* loading component */}
        {countriesQuery.isLoading ? (
          <div className='loading'>Loading Countries...</div>
        ) : (
          countries.map((country, index) => {
            return (
              <Link key={index} to={`/country/${country.name.official}`}>
                <CountryCard
                  name={country.name.official}
                  capital={country.capital}
                  img={country.flags.svg}
                  population={country.population}
                  region={country.region}
                />
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Homepage;
