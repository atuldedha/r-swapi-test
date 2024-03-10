import React, { useContext, useEffect, useRef } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import axios from "axios";
import { UserContext } from "./context/user";
import { getUrl } from "./utils/urlConfig";

function App() {
  // user context method to update user
  const { updateUser } = useContext(UserContext);

  const effectRan = useRef(null);
  // check if user has an active signed in
  useEffect(() => {
    const persist = JSON.parse?.(localStorage.getItem("presist"));
    if (!effectRan?.current && persist) {
      axios
        .get(getUrl("refresh"), { withCredentials: true })
        .then((res) => {
          console.log(res.data);
          updateUser({ email: res.data.user.email });
        })
        .catch((err) => {
          console.log(err);
        });
    }

    return () => {
      effectRan.current = true;
    };
  }, []);

  return (
    <Routes>
      <Route path="/">
        {/* home page */}
        <Route index element={<Home />} />
        {/* login page */}
        <Route path="login" element={<Login />} />
        {/* any other page */}
        <Route path="*" element={<h4>Page not found</h4>} />
      </Route>
    </Routes>
  );
}

export default App;
