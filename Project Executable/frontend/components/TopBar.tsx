import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Button } from "./Button";
import { useRouter } from "next/router";
import { ROUTES } from "../constants/routes";
import { Typography } from "@mui/material";

export const TopBar = (props: any) => {
  const router = useRouter();
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="relative" sx={{ background: "black" }}>
        <Toolbar>
          {/* <Box sx={{ flexGrow: 1 }} /> */}
          <Box
            width="100%"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography>{localStorage.getItem("email")}</Typography>
            <Button
              label="Exit"
              onClick={() => {
                localStorage.setItem("access_token", "");
                localStorage.setItem("email", "");
                localStorage.setItem("role", "");
                router.push(ROUTES.login);
              }}
              color="error"
              variant="contained"
              sx={{ p: 0, fontSize: "15px" }}
            />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
