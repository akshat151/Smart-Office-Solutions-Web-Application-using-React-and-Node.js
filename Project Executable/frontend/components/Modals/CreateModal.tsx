import { useEffect, useState } from "react";
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
import SelectField from "../SelectField";

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

export default function CreateModal(props: any) {
  const { open, toggle, handle, initData, title, fields } = props;
  const [data, setData] = useState(initData);

  return (
    <>
      <BootstrapDialog onClose={toggle} open={open}>
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={() => {
            toggle();
            setData(initData);
          }}
        >
          {title}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Box
            p={1}
            m={1}
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            {fields.map(
              ({
                name,
                label,
                disabled = false,
                type,
                options = [],
              }: {
                name: string;
                label: string;
                disabled?: boolean;
                type?: string;
                options?: { key: string; value: string }[];
              }) =>
                type == "select" ? (
                  <SelectField
                    field={name}
                    label={label}
                    value={data[name]}
                    handleChange={(newData: any) =>
                      setData({ ...data, ...newData })
                    }
                    options={options}
                  />
                ) : (
                  <TextField
                    field={name}
                    label={label}
                    value={data[name]}
                    handleChange={(newData: any) =>
                      setData({ ...data, ...newData })
                    }
                    disabled={disabled}
                    type={type}
                    InputLabelProps={
                      type === "date" ? { shrink: true } : undefined
                    }
                  />
                ),
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => handle(data)}
            color="success"
            label="Create"
          />
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}
