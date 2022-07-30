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
  const [error, setError] = React.useState(null);

  const countriesQuery = useQuery(["countries"], () => {
    return fetch(`https://restcountries.com/v3.1/all`).then((res) => {
      if (res.ok) {
        res.json().then((json) => setCountries(json));
        setError(null);
      } else if (res.status === 404) {
        countriesQuery.refetch();
      }
    });
  });

  const fetchRegions = async (region) => {
    const res = await fetch(`https://restcountries.com/v3.1/region/${region}`);
    const json = await res.json();
    setCountries(json);
    setError(null);
  };

  const fetchCountry = async (country) => {
    const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
    if (res.ok) {
      res.json().then((json) => setCountries(json));
      setError(null);
    } else if (res.status === 404) {
      setError(`${country} not found`);
    }
  };

  const handleSearch = debounce((e) => {
    if (
      e.target.value === "" ||
      e.target.value === null ||
      e.target.value === undefined
    ) {
      countriesQuery.refetch();
    } else if (e.target.value.length > 0) {
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

  if (countriesQuery.isLoading) {
    return <div className='loading'>Loading Countries...</div>;
  }

  return (
    // homepage component
    <div className='homepage'>
      <div className='filter-section'>
        <SearchComponent handleSearch={handleSearch} />
        <SelectComponent handleSelect={handleSelect} />
      </div>
      <div className='countries-section'>
        {/* check if countries is empty */}
        {error ? (
          <div className='error'>{error}</div>
        ) : (
          //display countries
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
