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
import Delete from "@mui/icons-material/PersonRemoveRounded";
import SelectField from "../SelectField";
import { useGetStaff } from "../../hooks/staff.hooks";
import {
  useDeleteClientMeeting,
  useDeleteStaffMeeting,
  useGetClientInMeetings,
  useGetStaffInMeetings,
  usePostClientInMeetings,
  usePostStaffInMeetings,
} from "../../hooks/meeting.hooks";
import { useGetClients } from "../../hooks/clients.hooks";

const MembersTable = (props: any) => {
  const { meetingId, isStaff } = props;

  const { data: meetingStaff } = useGetStaffInMeetings(meetingId);
  const { data: meetingClient } = useGetClientInMeetings(meetingId);

  const { mutate: deleteStaff } = useDeleteStaffMeeting();
  const { mutate: deleteClient } = useDeleteClientMeeting();

  const MAX_MEMBERS = isStaff ? 2 : 0;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 400 }} size="small">
        <TableHead>
          <TableRow sx={{ background: "#5072A7" }}>
            <TableCell sx={{ color: "white" }} align="center">
              {isStaff ? "Staff ID" : "Client ID"}
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
          {((isStaff ? meetingStaff : meetingClient) || []).map((row: any) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">
                {isStaff ? row.staffId : row.clientId}
              </TableCell>
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="center">{row.email}</TableCell>
              <TableCell align="center">
                <div
                  onClick={() =>
                    (isStaff ? meetingStaff : meetingClient).length >
                    MAX_MEMBERS
                      ? isStaff
                        ? deleteStaff({ ...row, meetingId })
                        : deleteClient({ ...row, meetingId })
                      : null
                  }
                >
                  <Delete
                    sx={{ cursor: "pointer" }}
                    fontSize="small"
                    color={
                      (isStaff ? meetingStaff : meetingClient).length >
                      MAX_MEMBERS
                        ? "error"
                        : "disabled"
                    }
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

export default function MeetingMembersModal(props: any) {
  const { isStaff, open, toggle, meetingId } = props;

  const [selected, setSelected] = useState(null);

  const { data: staff } = useGetStaff();
  const { data: clients } = useGetClients();

  const { mutate: addStaff } = usePostStaffInMeetings();
  const { mutate: addClient } = usePostClientInMeetings();

  return (
    <BootstrapDialog onClose={toggle} open={open}>
      <BootstrapDialogTitle
        id="customized-dialog-title"
        onClose={() => toggle()}
      >
        {isStaff ? "Staff" : "Client"}
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <Box
          p={1}
          m={1}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <MembersTable isStaff={isStaff} meetingId={meetingId} />
        </Box>
      </DialogContent>
      <DialogActions>
        <SelectField
          field={isStaff ? "staffId" : "clientId"}
          label="Add Members"
          options={((isStaff ? staff : clients) || []).map(
            ({
              staffId,
              clientId,
              name,
            }: {
              staffId: number;
              clientId: number;
              name: string;
            }) => ({
              key: staffId || clientId,
              value: name,
            }),
          )}
          value={selected}
          handleChange={(obj: any) =>
            setSelected(obj[isStaff ? "staffId" : "clientId"])
          }
        />
        <Button
          variant="contained"
          onClick={() => {
            isStaff
              ? addStaff({ meetingId, ["staffId"]: selected })
              : addClient({ meetingId, ["clientId"]: selected });
            setSelected(null);
          }}
          color="success"
          label="Add"
          disabled={!selected}
        />
      </DialogActions>
    </BootstrapDialog>
  );
}
