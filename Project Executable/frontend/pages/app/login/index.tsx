import { Grid, Link, Typography } from "@mui/material";
import { useState } from "react";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import { ROUTES } from "../../../constants/routes";
import TextFieldComponent from "../../../components/TextField";
import { Button } from "../../../components/Button";
import { useLoginUser } from "../../../hooks/auth.hooks";

const LoginForm = () => {
  const [authDetails, setAuthDetails] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();
  const { mutate, isLoading } = useLoginUser();

  const handleLoginClick = () => {
    mutate({
      payload: authDetails,
      callback: () => router.push(ROUTES.home),
    });
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      py={40}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        border="1px solid"
        borderColor="#DCDCDC"
        borderRadius={2}
        boxShadow={3}
        p={3}
      >
        <Typography variant="h6" py={2}>
          Login To Your Account
        </Typography>

        <TextFieldComponent
          field="email"
          handleChange={(value: any) =>
            setAuthDetails({ ...authDetails, ...value })
          }
          label="Email"
          value={authDetails.email}
        />

        <TextFieldComponent
          field="password"
          handleChange={(value: any) =>
            setAuthDetails({ ...authDetails, ...value })
          }
          label="Password"
          value={authDetails.password}
          type="password"
        />

        <Button
          fullWidth
          label="Login"
          onClick={handleLoginClick}
          sx={{ my: 3, width: 300 }}
        />
      </Box>
    </Box>
  );
};

export default LoginForm;
