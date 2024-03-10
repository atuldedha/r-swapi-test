import React, { useContext, useEffect, useState } from "react";
import { Box } from "@mui/material";
import Search from "../components/Search";
import CharacterCards from "../components/CharacterCards";
import axios from "axios";
import { getUrl } from "../utils/urlConfig";
import { UserContext } from "../context/user";
import Info from "../components/Info";

const Home = () => {
  // user context
  const {
    state: { userInfo },
  } = useContext(UserContext);

  // loading state
  const [loading, setLoading] = useState(false);
  // charcters information state
  const [charactersDetails, setCharactersDetails] = useState([]);
  // page number state for pagination
  const [page, setPage] = useState(1);
  // state to check if api has more responses available
  const [hasMore, setHasMore] = useState(true);
  // error state
  const [error, setError] = useState({ show: false, message: "" });
  // search term state
  const [searchValue, setSearchValue] = useState("");

  // page increment handler func.
  const handleLoadMore = () => {
    if (!loading) {
      setPage(page + 1);
    }
  };

  // search handler func.
  const handleSearchChange = (value) => {
    setSearchValue(value);
    setError({ show: false, message: "" });
    setPage(1);
    setCharactersDetails([]);
  };

  // fetches characters information based on page number and search value
  useEffect(() => {
    setLoading(true);
    axios
      .get(
        getUrl("get_character_names", {
          endpoint: "people",
          value: searchValue,
          page,
        })
      )
      .then((res) => {
        // saving the data with image property
        const newData = res.data?.results.map((character, index) => ({
          ...character,
          image: `https://picsum.photos/id/${index + 1}/200/300`,
        }));
        // setting the characters state
        setCharactersDetails((prev) => [...prev, ...newData]);
        // setting the has more data available property
        setHasMore(res.data.next !== null);
        // set loading to false
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError({ show: true, message: err?.message });
      });
  }, [page, searchValue]);

  return (
    <Box className="app-container" p={4}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        {/* search component */}
        <Search searchValue={searchValue} handleChange={handleSearchChange} />

        {Object.keys(userInfo)?.length > 0 && <Info />}
      </Box>
      {/* character cards component */}
      <CharacterCards
        data={charactersDetails}
        handleLoadMore={handleLoadMore}
        hasMore={hasMore}
        loading={loading}
        error={error}
      />
    </Box>
  );
};

export default Home;
