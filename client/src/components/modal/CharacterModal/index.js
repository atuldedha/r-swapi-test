import { useContext, useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import axios from "axios";
import { PlanetsDataContext } from "../../../context/planetInfo";

const CharacterModal = ({ character, modalRef }) => {
  const {
    state: { planetsInfo },
    updatePlanetInfo,
  } = useContext(PlanetsDataContext);
  const [homeworldInfo, setHomeworldInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const planetNumber = character.homeworld?.split("/")?.slice(-2, -1)[0];
    // Fetch information about the character's homeworld if not present in context
    if (!planetsInfo?.[planetNumber]) {
      if (loading) return;
      setLoading(true);
      axios
        .get(character.homeworld)
        .then((response) => {
          updatePlanetInfo({ ...planetsInfo, [planetNumber]: response.data });
          setHomeworldInfo(response.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching homeworld information: ", err);
          setLoading(false);
        });
    } else {
      setHomeworldInfo(planetsInfo[planetNumber]);
    }
  }, [character]);

  if (!character) return null;

  // Convert date format
  const formattedDate = new Date(character.created).toLocaleDateString("en-GB");

  return (
    <Box
      sx={{
        position: "absolute",
        top: "20%",
        left: "20%",
        // transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,
        zIndex: "100",
      }}
      onMouseEnter={() => {
        modalRef.current = true;
      }}
      onMouseLeave={() => {
        modalRef.current = false;
      }}
    >
      <Typography variant="h5" gutterBottom>
        {character.name}
      </Typography>
      <Typography gutterBottom>Height: {character.height} meters</Typography>
      <Typography gutterBottom>Mass: {character.mass} kg</Typography>
      <Typography gutterBottom>Date Added: {formattedDate}</Typography>
      <Typography gutterBottom>Films: {character.films.length}</Typography>
      <Typography gutterBottom>Birth Year: {character.birth_year}</Typography>

      <Typography variant="h6" gutterBottom>
        Homeworld Information:
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        homeworldInfo && (
          <Box>
            <Typography gutterBottom>Name: {homeworldInfo.name}</Typography>
            <Typography gutterBottom>
              Terrain: {homeworldInfo.terrain}
            </Typography>
            <Typography gutterBottom>
              Climate: {homeworldInfo.climate}
            </Typography>
            <Typography gutterBottom>
              Residents: {homeworldInfo.residents.length}
            </Typography>
          </Box>
        )
      )}
    </Box>
  );
};

export default CharacterModal;
