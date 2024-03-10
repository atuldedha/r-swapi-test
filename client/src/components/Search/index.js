import React, { useState } from "react";
import { SearchOutlined } from "@mui/icons-material";
import { Box, InputAdornment, TextField } from "@mui/material";
import { debounce } from "../../utils/utilities";

const Search = ({ handleChange }) => {
  // input state
  const [value, setValue] = useState("");

  // handle search with debouce
  const handleChangeDebouce = debounce((e) => {
    handleChange(e.target.value);
  }, 200);

  return (
    <Box
      display="flex"
      justifyContent="center"
      mb={4}
      sx={{ maxWidth: "50%", margin: "0 auto 20px", flexGrow: 1 }}
    >
      {/* input field */}
      <TextField
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          handleChangeDebouce(e);
        }}
        placeholder="Search Characters"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchOutlined />
            </InputAdornment>
          ),
        }}
        sx={{
          width: "100%",
          borderRadius: "25px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          "& .MuiInputBase-root": {
            borderRadius: "25px",
          },
        }}
      />
    </Box>
  );
};

export default Search;
