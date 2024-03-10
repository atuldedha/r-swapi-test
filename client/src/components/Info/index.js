import React, { useContext } from "react";
import { Typography, Button, Box } from "@mui/material";
import { UserContext } from "../../context/user";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getUrl } from "../../utils/urlConfig";

const Info = () => {
  // user context
  const {
    state: { userInfo },
    logoutUser,
  } = useContext(UserContext);

  const navigate = useNavigate();
  // logout handler func.
  const handleLogout = () => {
    axios
      .post(getUrl("logout"), {}, { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("persist", false);
          logoutUser();
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box display="flex" alignItems="center">
      {/* user'd information */}
      <Typography variant="h5" fontSize={"14px"}>
        {userInfo.email}
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleLogout}
        sx={{ ml: 2 }}
      >
        Logout
      </Button>
    </Box>
  );
};

export default Info;
