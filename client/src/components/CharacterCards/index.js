import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import CharacterCard from "./CharacterCard/CharacterCard";
import { Grid, Typography } from "@mui/material";
import Loading from "../Loading";

// character cards component
const CharacterCards = ({ data, handleLoadMore, hasMore, error }) => {
  return (
    // infinite scrolling with pagination
    <InfiniteScroll
      dataLength={data.length}
      next={handleLoadMore}
      hasMore={hasMore}
      loader={<Loading />}
      scrollThreshold={0.9}
    >
      {/* checks for data avaialability */}
      {data.length === 0 ? (
        <Typography variant="body1" align="center">
          No data available.
        </Typography>
      ) : error.show ? (
        // show error message
        <Typography variant="body1" align="center">
          {error.message}
        </Typography>
      ) : (
        // render cards
        <Grid container spacing={4}>
          {data.map((character, index) => (
            <CharacterCard character={character} key={index} />
          ))}
        </Grid>
      )}
    </InfiniteScroll>
  );
};

export default CharacterCards;
