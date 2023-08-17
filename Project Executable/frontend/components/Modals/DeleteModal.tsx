import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/system";
import TextField from "../TextField";
import { Button } from "../Button";
import SelectField from "../SelectField";
import { Typography } from "@mui/material";

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

export default function DeleteModal(props: any) {
  const { data: initData, open, toggle, handle, title, fields } = props;
  const [data, setData] = useState(initData);

  useEffect(() => {
    setData(initData);
  }, [initData]);

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
                    disabled={true}
                  />
                ) : (
                  <TextField
                    field={name}
                    label={label}
                    value={
                      type == "date"
                        ? new Date(data[name]).toISOString().slice(0, 10)
                        : data[name]
                    }
                    handleChange={(newData: any) =>
                      setData({ ...data, ...newData })
                    }
                    disabled
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
          <Box
            width="40%"
            display="flex"
            alignItems="center"
            justifyContent="space-evenly"
          >
            <Typography fontSize={16}>Are you sure?</Typography>
            <Button
              variant="contained"
              onClick={() => {
                toggle();
                handle(data);
              }}
              color="error"
              label="Delete"
            />
          </Box>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}
