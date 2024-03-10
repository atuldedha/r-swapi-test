import React, { useRef, useState } from "react";
import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { motion } from "framer-motion";
import CharacterModal from "../../modal/CharacterModal";
import { getSpeciesColor } from "../../../utils/utilities";

// character card component
const CharacterCard = ({ character }) => {
  // open character description modal state
  const [openModal, setModalOpen] = useState(false);
  // selected character state
  const [selectedCharacter, setSelectedCharacter] = useState({});
  // modal ref
  const modalRef = useRef(null);

  // open modal handler func.
  const handleModalOpen = () => {
    setSelectedCharacter(character);
    setModalOpen(true);
  };

  // close modal handler func.
  const handleCloseModal = () => {
    // only close the modal when we are out of hover from card as well as modal
    if (!modalRef?.current) {
      setSelectedCharacter({});
      setModalOpen(false);
    }
  };

  // Get color based on species number
  const cardColor = getSpeciesColor(
    character.species[0]?.split("/")?.slice(-2, -1)[0]
  );

  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      lg={3}
      sx={{
        ":hover": {
          cursor: "pointer",
        },
      }}
    >
      {/* character card */}
      <motion.div
        whileHover={{ scale: 1.05, translateZ: "" }}
        onMouseEnter={handleModalOpen}
        onMouseLeave={handleCloseModal}
        style={{
          position: "relative",
        }}
      >
        <Card
          sx={{
            position: "relative",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            bgcolor: cardColor,
            transition: "transform 0.2s ease",
            "&:hover": {
              transform: "scale(1.1)",
            },
          }}
        >
          <CardMedia
            component="img"
            height="200"
            image={character.image}
            alt={character.name}
            sx={{
              transition: "transform 0.2s ease",
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
          />
          <CardContent>
            <Typography variant="h5" component="div">
              {character.name}
            </Typography>
          </CardContent>
        </Card>
        {/* modal */}
        {openModal && (
          <CharacterModal
            open={openModal}
            handleClose={handleCloseModal}
            character={selectedCharacter}
            modalRef={modalRef}
          />
        )}
      </motion.div>
    </Grid>
  );
};

export default CharacterCard;
