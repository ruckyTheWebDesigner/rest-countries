import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

export default function CountryCard({
  img,
  population,
  region,
  capital,
  name,
}) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component='img' height='140' image={img} alt='country flag' />
      <CardContent>
        <h4>{name}</h4>
        <h5>
          Population: <span>{population}</span>{" "}
        </h5>
        <h5>
          Region: <span>{region}</span>{" "}
        </h5>
        <h5>
          Capital: <span>{capital}</span>
        </h5>
      </CardContent>
    </Card>
  );
}
