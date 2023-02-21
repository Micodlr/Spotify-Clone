import React from "react";

import { Search } from "@material-ui/icons";
import { IconButton, InputAdornment, TextField } from "@mui/material";

const SearchBar = () => {
  return (
    <TextField
      variant="outlined"
      placeholder="Search"
      sx={{ bgcolor: "whitesmoke", borderRadius: "200px" }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton>
              <Search sx={{ bgcolor: "whitesmoke", color: "whitesmoke" }} />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};
export default SearchBar;
