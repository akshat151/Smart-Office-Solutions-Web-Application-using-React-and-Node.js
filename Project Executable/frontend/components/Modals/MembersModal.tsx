import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/system";
import { Button } from "../Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  useDeleteTaskMember,
  useGetTaskMembers,
  usePostTaskMember,
} from "../../hooks/taskMembers.hooks";
import Delete from "@mui/icons-material/PersonRemoveRounded";
import SelectField from "../SelectField";
import { useGetStaff } from "../../hooks/staff.hooks";

const MembersTable = (props: any) => {
  const { taskId } = props;

  const { data, isLoading } = useGetTaskMembers(taskId);
  const { mutate: deleteTaskMember } = useDeleteTaskMember();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 400 }} size="small">
        <TableHead>
          <TableRow sx={{ background: "#5072A7" }}>
            <TableCell sx={{ color: "white" }} align="center">
              Staff ID
            </TableCell>
            <TableCell sx={{ color: "white" }} align="center">
              Name
            </TableCell>
            <TableCell sx={{ color: "white" }} align="center">
              Email
            </TableCell>
            <TableCell sx={{ color: "white" }} align="center">
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(data || []).map((row: any) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">{row.staffId}</TableCell>
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="center">{row.email}</TableCell>
              <TableCell align="center">
                <div
                  onClick={() =>
                    data.length > 1
                      ? deleteTaskMember({ ...row, taskId })
                      : null
                  }
                >
                  <Delete
                    sx={{ cursor: "pointer" }}
                    fontSize="small"
                    color={data.length > 1 ? "error" : "disabled"}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

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

export default function MembersModal(props: any) {
  const { open, toggle, taskId } = props;

  const { data: staff } = useGetStaff();

  const [selected, setSelected] = useState(null);

  const { mutate: addMember } = usePostTaskMember();

  return (
    <>
      <BootstrapDialog onClose={toggle} open={open}>
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={() => toggle()}
        >
          {"Assignees"}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Box
            p={1}
            m={1}
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <MembersTable taskId={taskId} />
          </Box>
        </DialogContent>
        <DialogActions>
          <SelectField
            field="staffId"
            label="Add Members"
            options={(staff || []).map(
              ({ staffId, name }: { staffId: number; name: string }) => ({
                key: staffId,
                value: name,
              }),
            )}
            value={selected}
            handleChange={(obj: any) => setSelected(obj["staffId"])}
          />
          <Button
            variant="contained"
            onClick={() => {
              addMember({ taskId, staffId: selected });
              setSelected(null);
            }}
            color="success"
            label="Add"
            disabled={!selected}
          />
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}
