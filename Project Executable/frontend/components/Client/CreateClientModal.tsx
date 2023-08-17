import * as React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import TextField from "../TextField";
import { Button } from "../Button";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle width={600} sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export default function CreateClientModal(props: any) {
  const { open, toggle, handleCreate } = props;
  const [clientDetails, setClientDetails] = React.useState({
    name: "",
    mobile: "",
    email: "",
    address: "",
  });

  const handleChange = (data: any) => {
    setClientDetails({ ...clientDetails, ...data });
  };

  return (
    <>
      <BootstrapDialog onClose={toggle} open={open}>
        <BootstrapDialogTitle id="customized-dialog-title" onClose={toggle}>
          Add New Client Details
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Box
            p={1}
            m={1}
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <TextField
              field="name"
              label="Client Name"
              value={clientDetails.name}
              handleChange={handleChange}
            />
            <TextField
              field="mobile"
              label="Mobile"
              value={clientDetails.mobile}
              handleChange={handleChange}
            />
            <TextField
              field="email"
              label="Email"
              value={clientDetails.email}
              handleChange={handleChange}
            />
            <TextField
              field="address"
              label="Address"
              value={clientDetails.address}
              handleChange={handleChange}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => handleCreate(clientDetails)}
            color="success"
            label="Create"
          />
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}
