import React from "react";
import { Card } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";

import SearchIcon from "@mui/icons-material/Search";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

// custom search input

export function SearchComponent({ handleSearch }) {
  return (
    <Search onChange={handleSearch}>
      <Card className='search_card'>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder='Search for a country…'
          inputProps={{ "aria-label": "search" }}
        />
      </Card>
    </Search>
  );
}

// custom select component for country

export function SelectComponent({ handleSelect }) {
  return (
    <Card className='select'>
      <FormControl variant='standard' sx={{ m: 1, minWidth: 300 }}>
        <select onChange={handleSelect}>
          <option value=''>Filter by Region</option>
          <option value='Africa'>Africa</option>
          <option value='Americas'>Americas</option>
          <option value='Asia'>Asia</option>
          <option value='Europe'>Europe</option>
          <option value='Oceania'>Oceania</option>
        </select>
      </FormControl>
    </Card>
  );
}
