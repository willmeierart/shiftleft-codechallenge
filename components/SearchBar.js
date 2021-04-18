// PACKAGES
import React, { useContext } from "react";
// UI
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
// UTILS
import { Context } from "../lib/context";

/**
 * @Component
 * The Searchbar for dispatching queries
 * The actual search functionality is debounced in the `useData` hook
 *
 */
const SearchBar = () => {
  const { searchPhrase, updateSearchPhrase } = useContext(Context);

  return (
    <TextField
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      aria-label="searchbar"
      id="searchbar"
      onChange={({ target: { value } }) => {
        updateSearchPhrase(value);
      }}
      value={searchPhrase}
      variant="outlined"
    />
  );
};

export default SearchBar;
