import { Link, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { useState } from "react";
import { Button, Card } from "@mui/material";
import { BiArrowBack } from "react-icons/bi";

function Country() {
  const params = useParams();

  const country = params.countryname;

  const [result, setResult] = useState([]);

  // use query to search for country

  const countriesQuery = useQuery(["countries", params.country], () =>
    fetch(`https://restcountries.com/v3.1/name/${country}?fullText=true`).then(
      (res) => res.json().then((json) => setResult(json))
    )
  );

  return (
    <div>
      {countriesQuery.isLoading ? (
        <div className='loading'>Loading Country...</div>
      ) : (
        <div className='country-section'>
          <Button className='backtohome_btn' color='inherit' variant='outlined'>
            <BiArrowBack className='back-btn' />
            <Link to='/'>Back</Link>
          </Button>
          {result.map((country) => {
            return (
              <div key={country.name.common} className='country_section'>
                <img src={country.flags.svg} alt='' className='country_img' />
                <div className='country_wrapper'>
                  <div className='country__wrapper'>
                    <div className='content_left'>
                      <h1>{country.name.common}</h1>
                      <h5>
                        Native name: <span>{country.name.official}</span>
                      </h5>
                      <h5>
                        Population: <span>{country.population}</span>
                      </h5>
                      <h5>
                        Region: <span>{country.region}</span>
                      </h5>
                      <h5>
                        Sub Region: <span>{country.subregion}</span>
                      </h5>
                      <h5>
                        Capital: <span>{country.capital}</span>
                      </h5>
                    </div>
                    <div className='content_right'>
                      <h5>
                        Top Level Domain: <span>{country.tld}</span>
                      </h5>
                      <h5>
                        UN Member:{" "}
                        <span>{country.unMember === true ? "Yes" : "No"}</span>
                      </h5>
                      <h5>
                        {" "}
                        Independent:{" "}
                        <span>
                          {country.independent === true ? "Yes" : "No"}
                        </span>
                      </h5>
                      <h5>
                        Area Size: <span>{country.area}</span>
                      </h5>
                      <h5>
                        TimeZones: <span>{country.timezones}</span>
                      </h5>
                      <h5>
                        Start of Week: <span>{country.startOfWeek}</span>
                      </h5>
                    </div>
                  </div>
                  <div className='border_wrapper'>
                    <h5>Border Countries</h5>
                    <div className='border_section'>
                      {country.borders ? (
                        country.borders.map((border) => {
                          return (
                            <Card className='border_card' key={border}>
                              <span>{border}</span>
                            </Card>
                          );
                        })
                      ) : (
                        <span>No Border Countries found</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Country;
